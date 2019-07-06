import React, {Component} from 'react';
import { Header } from '../Header/Header';
import TotMap from '../TotMap/TotMap';

class App extends Component {

  render() {
    return (
      <div className="App page bg-white">
        <Header />
        <TotMap />
      </div>
    );
  }
}

export default App;
