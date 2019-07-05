import React, {Component} from 'react';
import { Header } from '../Header/Header';

class App extends Component {

  constructor() {
    // Get info from the parent &
    // Use "this" statement
    super();
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App page bg-white">
        <Header />
      </div>
    );
  }
}

export default App;
