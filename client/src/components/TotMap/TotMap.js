import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


/*global google*/ 

export class TotMap extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            totsLoaded: this.props.totsLoaded,
            loading: true,
            totLocations: [],
            windowCenter: {}
        };

    }

    // windowMoved = (mapProps, map) => {
    //     const windowCenter = {
    //         lat: map.getCenter().lat(),
    //         lng: map.getCenter().lng()
    //     }
    //     //this.props.loadTotLocations(windowCenter);
    // }

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
    
    componentDidMount() {
        this.getCurrentPosition(() => {
            console.log(this.state.userLocation)
            this.props.loadTotLocations(this.state.userLocation);
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

        const totMarkers = this.props.totLocations.map((location) => {
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
                onDragend={this.props.windowMoved}
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