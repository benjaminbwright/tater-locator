import React, {Component} from 'react';
import { Header } from '../Header/Header';
import TotMap from '../TotMap/TotMap';
import { FooterUI } from '../FooterUI/FooterUI';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tots: {
        loaded: false
      }
    }

  }

  render() {
    return (
      <div className="App page bg-white">
        <Header />
        <TotMap id="TotMap" totsLoaded={this.state.tots.loaded} />
        <FooterUI />
      </div>
    );
  }
}

export default App;
