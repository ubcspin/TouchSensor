import React, { Component } from 'react';
import './Header.css';


class Header extends Component {
    constructor(props) {
        super(props)
    };
    render() {
        return (
            <div className="title-header">
                <div className="title-container">
                    <h1 id="project-title" onClick={this.props.onClick}>Touch Sensor Visualization</h1>
                    <a href="https://github.com/ubcspin/TouchSensor" id="github-button">
                        View on Github
                    </a>
                </div>
            </div>
        )
    }
};

export default Header;