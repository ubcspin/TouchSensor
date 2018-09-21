import React from 'react';

import Cell from './Cell.jsx';

/*class Matrix extends React.Component {
	render () {
		<div></div>
	}
}

export default Matrix;*/

// const matrix = (props) => {
// 	<div></div>
// }

// export default matrix;



const matrix = (props) => props.matrix.map((cell, index) => {
             return ( 
             	<Cell 
             		click={() => props.clicked(index)}
             		sensor={cell.sensor}
             		key={cell.id}
             		changed={(event) => props.changed(event, cell.id)} />
             	)
            });

export default matrix;