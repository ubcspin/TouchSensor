import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

	//In the future, change the state of the pressed here
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
	/*
	createDivision = () => {
		console.log(this.props.element);
		let dividingElement = this.props.element;
		console.log("divingElement is " + dividingElement);
		if (dividingElement % 10 === 0) {
			return "hi";
		}
	}*/

	render() {
		//console.log('props', this.props);
		//this.props.sensorValue > 100 ? "gray": "red"}}>
		return(

			<div className={this.getColor()} style={{backgroundColor: "rgb("+this.props.sensorValue+",0,0)"}}>
			
			</div>
			)
	}
}

export default Cell;



