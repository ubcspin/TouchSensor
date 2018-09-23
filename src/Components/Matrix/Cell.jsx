import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

	getColor = () => {
		return "Cell0";
	}

	render() {

		return(

			<div className={this.getColor()}>

			</div>
			)
	}
}

export default Cell;



