import React from 'react';
import './Matrix.css';

const matrix = (props) => {
	return (
		<div className="Matrix">
			<p onClick={props.click}>I'm a {props.size} square matrix</p>
			<input type="text" onChange={props.changed} value={props.size} />
		</div>
	)	
};

export default matrix;