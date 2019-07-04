import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

	render() {
		return(

			<div className={"Cell0"} style={{backgroundColor: "rgb("+ (128+ (255 - this.props.pressed)) +"," + (128 - (255 - this.props.pressed)) +", "+ (128 - (255 - this.props.pressed)) + ")"}}>
				<p>{this.props.pressed}</p>
			</div>
			)
	}
}

export default Cell;



