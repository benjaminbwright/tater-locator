import React, { Component } from "react";
import { Header } from "../Header/Header";
import TotMap from "../TotMap/TotMap";
import { FooterUI } from "../FooterUI/FooterUI";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // are the tots nearest to the center of the map loaded
      totsLoaded: false,
      // array of tot locations
      totLocations: []
    };

    // Bind functions for events
    this.loadTotLocations = this.loadTotLocations.bind(this);

  }

  // Load all of the tot location from the api into an array of objects
  loadTotLocations = location => {
    // check if the tots are currently loaded
    if (!this.state.totsLoaded) {
      // check if the user has dragged the map from their current location
      if (this.state.windowCenter) {
        location = this.state.windowCenter;
      }
      // API Call
      axios
        .get(`/api/v1/tots/${location.lat}/${location.lng}`)
        .then(response => {
          console.log(response);
          this.setState({
            totLocations: response.data.businesses,
            totsLoaded: true
          });
          console.log(this.state.totsLoaded);
        });
    }
  };

  // Add the window center to the state
  windowMoved = (mapProps, map) => {
    const windowCenter = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
    };
    // prevent unnecessary setState
    if (this.state.totsLoaded) {
      this.setState({
        totsLoaded: false,
        windowCenter: windowCenter
      });
    }
  };

  render() {
    return (
      <div className="App page bg-white">
        <Header />
        <TotMap
          id="TotMap"
          totsLoaded={this.state.totsLoaded}
          loadTotLocations={this.loadTotLocations}
          totLocations={this.state.totLocations}
          windowMoved={this.windowMoved}
        />
        <FooterUI loadTotLocations={this.loadTotLocations} />
      </div>
    );
  }
}

export default App;
