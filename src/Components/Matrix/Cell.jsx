import React from 'react';
import './Matrix.css';

const cell = (props) => {
	return (
		<div className={props.sensor}>
			<p onClick={props.click}></p>
			<input type="button" onChange={props.changed} value={props.sensor} />
		</div>
	)	
};

export default cell;

/*
return 
div style={getColour()}

fn getColour() {
	return "background-color: red"
}

*/

