import React, { Component } from "react";
import { Header } from "../Header/Header";
import TotMap from "../TotMap/TotMap";
import { FooterUI } from "../FooterUI/FooterUI";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tots: {
        loaded: false
      },
      totLocations: []
    };
  }

  loadTotLocations = location => {
    axios.get(`/api/v1/tots/${location.lat}/${location.lng}`).then(response => {
      console.log(response);
      this.setState({totLocations: response.data.businesses });
      console.log(this.state.totsLoaded);
    });
  };

  componenteDidMount() {}

  render() {
    return (
      <div className="App page bg-white">
        <Header />
        <TotMap
          id="TotMap"
          totsLoaded={this.state.tots.loaded}
          loadTotLocations={this.loadTotLocations}
          totLocations={this.state.totLocations}
        />
        <FooterUI />
      </div>
    );
  }
}

export default App;
