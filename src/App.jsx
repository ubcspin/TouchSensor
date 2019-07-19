import React, { Component } from 'react';
import Header from './components/Layout/Header.jsx';
import Matrix from './components/Matrix/Matrix.jsx';
import D3Matrix from './components/D3Matrix/D3Matrix.jsx';
import MouseD3Matrix from './components/MouseD3Matrix/MouseD3Matrix.jsx';
import IntroText from './components/Layout/IntroText.jsx';
import Button from './components/Layout/Button.jsx';
import IntroImages from './components/Layout/IntroImages.jsx';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8080', {
  "reconnect": false
});

class App extends Component {
 
    state = {
      disableButton: false,
      showHome: true,
      showMatrix: false,
      showD3Matrix: false,
      showMouseD3Matrix: false
    }
  
    componentDidMount() {
      socket.on("noArduino", function(error) {
        console.log("Error in frontend " + error);
        this.setState({ disableButton: true })
      }.bind(this));
      console.log("The socket.io server is connected? :" + socket.connected);
      if(!socket.connected) {
        this.setState({ disableButton: true });
      }
      socket.on("connect", function() {
        this.setState({ disableButton: false });
      }.bind(this));
    }

  handleButtonClick(event) {
    
    const id = event.target.id;
    console.log(id);
    if(id == "htmlcss") {
      this.setState({ showMatrix: true });
      this.setState({ showD3Matrix: false });
      this.setState({ showMouseD3Matrix: false });
      this.setState({ showHome: false });
    } else if (id == "d3demo") {
      this.setState({ showD3Matrix: true });
      this.setState({ showMatrix: false });
      this.setState({ showMouseD3Matrix: false });
      this.setState({ showHome: false });
    } else if (id == "mouse") {
      this.setState({ showMouseD3Matrix: true });
      this.setState({ showMatrix: false });
      this.setState({ showD3Matrix: false });
      this.setState({ showHome: false });
    } else if (id == "project-title") {
      this.setState({ showHome: true });
      this.setState({ showMatrix: false });
      this.setState({ showD3Matrix: false });
      this.setState({ showMouseD3Matrix: false });
    } 
  }
  
  
  	render() {
        const showMatrix = this.state.showMatrix;
        const showD3Matrix = this.state.showD3Matrix;
        const showMouseD3Matrix = this.state.showMouseD3Matrix;
        const showHome = this.state.showHome;
        let display;
        
        if (showMatrix) {
          display = <Matrix />;
          
        } else if (showD3Matrix) {
          display = <D3Matrix />;
          
        } else if (showMouseD3Matrix) {
          display = <MouseD3Matrix />
          
        }
        else if (showHome) {
          display = <IntroText />;
         
        }
      	return (
          
      		<div className="App">
           <Header onClick={event => this.handleButtonClick(event)} />
           <div id="buttons">
            <Button id="htmlcss" disabled={this.state.disableButton} onClick={event => this.handleButtonClick(event)} title="With Values" />
                    
            <Button id="d3demo" disabled={this.state.disableButton} onClick={event => this.handleButtonClick(event)} title="Without Values" />
                
            <Button id="mouse" onClick={event => this.handleButtonClick(event)} title="Mouse Simulation" />
           </div>
           
           {display}
          
      		</div>
    	)
  	};
}

export default App;