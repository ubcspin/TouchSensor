import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  constructor(props) {
		super(props);
		this.setState({});
		this.state = {
			num: 5,
		}
  }

  myFunFn() {
    return ("all of the returns");
  }

  render() {
      return (
      	<div>
      		<h1>Hi everyone now</h1>
          <p>{this.myFunFn()}</p>
          <p>{this.state.num}</p>
      	</div>
    )
  };
}



ReactDOM.render(<Hello/>, document.getElementById('hello'));