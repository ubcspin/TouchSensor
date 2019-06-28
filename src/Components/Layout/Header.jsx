import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props)
    };
    render() {
        return (
            <div>
                <h1>Touch Sensor Visualization</h1>
                <button onClick={this.props.onClick}>
                    HTML/CSS Demo
                </button>
                <button onClick={this.props.onClick}>
                    D3 Demo
                 </button>
                <button onClick={this.props.onClick}>
                    Mouse Demo
                </button>
            </div>
        )
    }
};

export default Header;