import React, { Component } from "react";
import { Header } from "../Header/Header";
import TotMap from "../TotMap/TotMap";
import { FooterUI } from "../FooterUI/FooterUI";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totsLoaded: false,
      totLocations: []
    };
  }

  loadTotLocations = location => {
    if (!this.state.totsLoaded) {
      if (this.state.windowCenter) {
        location = this.state.windowCenter;
      }
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
    //this.props.loadTotLocations(windowCenter);
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
