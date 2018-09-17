import React from 'react';

import Matrix from './Matrix/Matrix.jsx';

const matrixes = (props) => props.matrixes.map((matrix, index) => {
             return <Matrix 
             click={() => props.clicked(index)}
             sensor={matrix.sensor}
             key={matrix.id}
             changed={(event) => props.changed(event, matrix.id)} />
            });

export default matrixes;