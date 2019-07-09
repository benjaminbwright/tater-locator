import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

/*global google*/ 

export class TotMap extends Component {

    constructor() {
        super();
        this.state = { 
            userLocation: { 
                lat: 32, lng: 32 
            }, 
            loading: true,
            totLocations: []
        };
    }
    
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                this.setState({
                    userLocation: { lat: latitude, lng: longitude },
                    loading: false
                });
                axios.get(`/api/v1/tots/${this.state.userLocation.lat}/${this.state.userLocation.lng}`)
                    .then((response) => {
                        console.log(response);
                        this.setState({ totLocations: response.data.businesses})
                    });
            },
            () => {
                this.setState({ loading: false });
            }
        );
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