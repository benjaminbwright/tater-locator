import React, {Component} from 'react';
import { Navbar } from 'react-materialize';
import { Brand } from '../Brand/Brand.js';


export class Header extends Component {

    render() {
        return (
            <Navbar className="navbar-fixed" brand={<Brand />} centerLogo alignLinks="left">
            </Navbar>
        )
    }
}
