import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

/*global google*/ 

export class TotMap extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            // userLocation: { 
            //     lat: 32, lng: 32 
            // },
            totsLoaded: this.props.totsLoaded,
            loading: true,
            totLocations: [],
            // locationUpdated: this.props.locationUpdated,
            windowCenter: {}
        };

        this.loadTotLocations = this.loadTotLocations.bind(this);

    }

    windowMoved = (mapProps, map) => {
        const windowCenter = {
            lat: map.getCenter().lat(),
            lng: map.getCenter().lng()
        }
        console.log(this.state.windowCenter);
        this.loadTotLocations(windowCenter);
    }

    getCurrentPosition = (callback) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                // get the longitude and latitude from the positions coordinates
                const { latitude, longitude } = position.coords;

                this.setState({
                    userLocation: { lat: latitude, lng: longitude },
                    loading: false
                });
                callback();
            }
        );
        
    }

    loadTotLocations = (location) => {
        axios.get(`/api/v1/tots/${location.lat}/${location.lng}`)
            .then((response) => {
                console.log(response);
                this.setState(() => (
                        {totLocations: response.data.businesses}
                    )                    
                );
                console.log(this.state.totsLoaded)
            });
    }
    
    componentDidMount() {
        this.getCurrentPosition(() => {
            console.log(this.state.userLocation)
            this.loadTotLocations(this.state.userLocation);
            // console.log(this.props.totsLoaded);
        });     
    }

    componentDidUpdate() {
    }
    
    render() {
        const { loading, userLocation, totLocations} = this.state;
 
        const markerIcon = {
            url: '../../images/category-tatertots-desktop.png', 
            scaledSize: new google.maps.Size(75, 50) 
        }

        const totMarkers = totLocations.map((location) => {
            return (
                <Marker 
                    onClick={this.onMarkerClick}
                    name={'Current location'}
                    icon={markerIcon}
                    position={{lat: location.coordinates.latitude, lng: location.coordinates.longitude}}
                />
            )
        });
        
        if (loading) {
          return null;
        }

        return(
            <Map id="TotMap"
                style={{width: '100%', height: '100%', position: 'relative'}}
                google={this.props.google}
                initialCenter={userLocation} 
                zoom={14}
                disableDefaultUI={true}
                onDragend={this.windowMoved}
            >
                <Marker 
                    onClick={this.onMarkerClick}
                    name={'Current location'}
                />
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

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(TotMap)