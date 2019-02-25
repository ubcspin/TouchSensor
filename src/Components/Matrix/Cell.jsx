import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

	//In the future, change the state of the pressed here
	// getColor = () => {
	// 	let colorName = false;
	// 	if (this.props.pressed === true) {
	// 		colorName = "Cell1";
	// 	}
	// 	else {
	// 		colorName = "Cell0";
	// 	}
	// 	return colorName;
	// }
	render() {
		return(

			<div className={"Cell0"} style={{backgroundColor: "rgb("+this.props.pressed+",255,255)"}}>
				<p>{this.props.pressed}</p>
			</div>
			)
	}
}

export default Cell;



