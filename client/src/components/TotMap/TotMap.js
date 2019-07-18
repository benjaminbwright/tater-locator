import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

// Make google object available
/*global google*/

export class TotMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Are the tots currently loaded?
      totsLoaded: this.props.totsLoaded,
      // Is the map loading?
      loading: true
    };
  }

  getCurrentPosition = callback => {
    navigator.geolocation.getCurrentPosition(position => {
      // get the longitude and latitude from the positions coordinates
      const { latitude, longitude } = position.coords;
      // Set the location to the nearest user location
      this.setState({
        // Set the current user location
        userLocation: { lat: latitude, lng: longitude },
        // set loading to false once the location is loaded
        loading: false
      });
      callback();
    });
  };

  componentDidMount() {
    // Load tot locations after getting user location on first load
    this.getCurrentPosition(() => {
      console.log(this.state.userLocation);
      this.props.loadTotLocations(this.state.userLocation);
      // console.log(this.props.totsLoaded);
    });
  }

  render() {
    const { loading, userLocation } = this.state;
    
    // Marker Icon Styles 
    const markerIcon = {
      url: "../../images/category-tatertots-desktop.png",
      scaledSize: new google.maps.Size(75, 50)
    };

    // Populate array of tot markers
    const totMarkers = this.props.totLocations.map(location => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          name={"Current location"}
          icon={markerIcon}
          position={{
            lat: location.coordinates.latitude,
            lng: location.coordinates.longitude
          }}
        />
      );
    });

    // Don't return map until it is loaded
    // Loading image element styles may be controlled here.
    if (loading) {
      return null;
    }

    return (
      <Map
        id="TotMap"
        style={{ width: "100%", height: "100%", position: "relative" }}
        google={this.props.google}
        initialCenter={userLocation}
        zoom={14}
        disableDefaultUI={true}
        onDragend={this.props.windowMoved}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />
        {totMarkers}
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>A Place</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

// Connect Google API Key for the maps to work
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(TotMap);
