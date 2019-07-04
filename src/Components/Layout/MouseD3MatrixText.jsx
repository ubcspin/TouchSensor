import React, { Component } from 'react';


class MouseD3MatrixText extends Component {
    constructor(props) {
        super(props)
    };
    render() {
        return (
            <div className="demo-text">
                <h3>Place your mouse over the visualization</h3>
                <p class="topic">This simulates how the visualization would behave if a user interacts with a physical Touch Sensor</p>
                
            </div>
        )
    }
};

export default MouseD3MatrixText;