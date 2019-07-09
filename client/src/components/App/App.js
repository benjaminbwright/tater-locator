import React, {Component} from 'react';
import { Header } from '../Header/Header';
import TotMap from '../TotMap/TotMap';
import { FooterUI } from '../FooterUI/FooterUI';

class App extends Component {

  render() {
    return (
      <div className="App page bg-white">
        <Header />
        <TotMap id="TotMap" />
        <FooterUI />
      </div>
    );
  }
}

export default App;
