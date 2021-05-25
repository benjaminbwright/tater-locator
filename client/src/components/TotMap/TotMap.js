import React, { useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { useGlobal } from "../../context/globalContext";

// Make google object available
/*global google*/

const TotMap = ({ loadTotLocations, totLocations, windowMoved }) => {
  const [state, dispatch] = useGlobal();

  useEffect(() => {
    getCurrentPosition(() => {
      loadTotLocations(state.userLocation);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentPosition = (callback) => {
    dispatch({ type: "LOADING" });
    navigator.geolocation.getCurrentPosition((position) => {
      // get the longitude and latitude from the positions coordinates
      const { latitude, longitude } = position.coords;
      // Set the location to the nearest user location
      dispatch({
        type: "GET_CURRENT_POSITION",
        userLocation: { lat: latitude, lng: longitude },
      });
      callback();
    });
  };

  const onMarkerClick = (props, marker, event) => {
    console.log("Props", props);
    console.log("Marker", marker);
    dispatch({
      type: "SHOW_MARKER",
      activeMarker: marker,
      selectedPlace: props,
    });
  };

  const { loading, userLocation } = state;

  // Marker Icon Styles
  const markerIcon = {
    url: "../../images/category-tatertots-desktop.png",
    scaledSize: new google.maps.Size(75, 50),
  };

  // Populate array of tot markers
  const totMarkers = totLocations.map((location, i) => {
    return (
      <Marker
        key={i}
        onClick={onMarkerClick}
        name={location.location.name}
        icon={markerIcon}
        position={{
          lat: location.coordinates.latitude,
          lng: location.coordinates.longitude,
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
      google={google}
      initialCenter={userLocation}
      zoom={14}
      disableDefaultUI={true}
      onDragend={windowMoved}
    >
      <Marker onClick={onMarkerClick} name={"Current location"} />
      {totMarkers}
      <InfoWindow
        visible={state.infoWindowVisible}
        activeMarker={state.activeMarker}
      >
        <div>
          <h1>{state.selectedPlace.name}</h1>
        </div>
      </InfoWindow>
    </Map>
  );
};

// Connect Google API Key for the maps to work
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(TotMap);
