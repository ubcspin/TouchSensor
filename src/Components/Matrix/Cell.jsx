import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

	getColor = () => {
		let colorName = false;
		if (this.props.pressed === true) {
			colorName = "Cell1";
		}
		else {
			colorName = "Cell0";
		}
		return colorName;
	}

	render() {
		//console.log('props', this.props);
		return(

			<div className={this.getColor()}>

			</div>
			)
	}
}

export default Cell;



