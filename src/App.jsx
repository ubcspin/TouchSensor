import React, { Component } from 'react';
import Page from './components/Layout/Page.jsx';
import Matrix from './components/Matrix/Matrix.jsx';
import './App.css';

class App extends Component {
  state = {
    showMatrix: false
  }


  handleShow() {
    console.log("Test Show Matrix");
  }
  	render() {
      const style = {
        backgroundColor: 'blue',
        color: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer'
      };

      	return (
      		<div className="App">

            <Matrix />



      		</div>
    	)
  	};
}

export default App;