import React, {Component} from 'react';


export class FooterUI extends Component {



    render() {
        return (
            <div id="FooterUI">
                <nav id="footer-nav">
                <i className="material-icons" onClick={this.props.loadTotLocations}>autorenew</i>
                </nav>
            </div>
        )
    }
}
