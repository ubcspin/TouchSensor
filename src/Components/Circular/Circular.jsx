import React, { Component } from 'react';
import './Circular.css';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

class Circular extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    socket.on('Sensor', function(msg) {
      console.log("Connection circle sucessful");
    }.bind(this));
  }

  handleRender() {
    return (
      <div className={"circle"}></div>
    )
  }

  render() {
      return(
          <div>
            <h2>Displaying Circle Demo</h2>
            {this.handleRender()}
          </div>
      )
  };
}

export default Circular;