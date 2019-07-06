import React, {Component} from 'react';
import { Navbar } from 'react-materialize';
import { Brand } from '../Brand/Brand.js';


export class Header extends Component {

    render() {
        return (
            <Navbar brand={<Brand />} centerLogo alignLinks="left">
            </Navbar>
        )
    }
}
