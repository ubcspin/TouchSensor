import React, { Component } from 'react';
import './Header.css';


class Header extends Component {
    constructor(props) {
        super(props)
    };
    render() {
        return (
            <div className="title-header">
                <h1 id="project-title" onClick={this.props.onClick}>Touch Sensor Visualization</h1>
                <a href="https://github.com/ubcspin/TouchSensor">
                    <button id="github-button">
                        View on Github
                    </button>
                </a>
            </div>
        )
    }
};

export default Header;