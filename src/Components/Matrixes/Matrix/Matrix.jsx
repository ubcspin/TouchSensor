import React from 'react';
import './Matrix.css';

const matrix = (props) => {
	return (
		<div className={props.sensor}>
			<p onClick={props.click}>{props.sensor}</p>
			<input type="button" onChange={props.changed} value={props.sensor} />
		</div>
	)	
};

export default matrix;