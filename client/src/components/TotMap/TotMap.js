import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import axios from 'axios';

export class TotMap extends Component {
    
    componentDidMount() {
    }

    render() {
        return(
            <Map google={this.props.google} centerAroundCurrentLocation={true} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

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
    apiKey: ("AIzaSyDTjxYc7NEsWuzFgUMq1u_iqZcpFUTLGK0")
})(TotMap)