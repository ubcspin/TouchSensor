import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props)
    };
    render() {
        return (
            <button onClick={this.props.onClick}>
                {this.props.title}
            </button>
        )
    }
};

export default Button;