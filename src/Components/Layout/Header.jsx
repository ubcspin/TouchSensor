import React, { Component } from 'react';
import Button from './Button.jsx';

class Header extends Component {
    constructor(props) {
        super(props)
    };
    render() {
        return (
            <div>
                <h1>Touch Sensor Visualization</h1>
                <Button onClick={this.props.onClick} title="HTML/CSS Demo" />
                    
                <Button onClick={this.props.onClick} title="D3 Demo" />
                
                <Button onClick={this.props.onClick} title="Mouse Demo" />
                <a href="https://github.com/ubcspin/TouchSensor">
                    <button>
                     View on Github
                    </button>
                </a>
            </div>
        )
    }
};

export default Header;