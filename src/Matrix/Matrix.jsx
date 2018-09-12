import React from 'react';

const matrix = (props) => {
	return (
		<div>
			<p onClick={props.click}>I'm a {props.size} square matrix</p>
			<input type="text" onChange={props.changed} value={props.size} />
		</div>
	)	
};

export default matrix;