import React, { Component } from 'react';
import './IntroText.css'
import SensorSizes from '../../images/sensorScales.jpg';
import HardwareImage from '../../images/HardwareImage.jpg';
import TouchSensorVideo from '../../videos/TouchSensorVideo.mp4';
import Demo from '../../images/Demo.jpg';

class IntroText extends Component {
    constructor(props) {
        super(props)
    };
    render() {
        return (
            <div id="entire-introduction">
                <div className="video-top">
                    <div className="video-text">
                       <h3>VISUALIZING TOUCH GESTURES ON FABRIC SENSORS</h3>
                       <p className="topic">
                        Sensing touch input on a variety of objects, from robots to tables, requires sensors that can come in all shapes and sizes. To enable this, <a href="https://www.cs.ubc.ca/labs/spin/frontpage">UBC's SPIN Lab</a> made fabric sensors with the ability to read the pressure and location of touch inputs.
                       </p>
                       <p>
                       In order to interpret the touch input and size of the fabric sensors, an Arduino is connected from the sensor to the visualization tool.
                       </p>
                       <p>
                       A two-dimensional web-based visualization displays the position and pressure of a user’s touch in real-time.  
                       </p>
                    </div>{/*close div for introduction-text*/}
                    <video id="intro-video" autoPlay muted loop>
                     <source src={TouchSensorVideo} type="video/mp4" />
                    </video>
                </div>{/*close div for introduction-top*/}
                <div className="introduction-top">
                    <div className="introduction-text">
                        <h3>PLACEHOLDER HERE FOR THE FLOW CHART OF THE PROJECT</h3>
                    </div>
                </div>
                <div className="introduction-top">
                    <div className="introduction-text">
                <h3>ARDUINO FUNCTIONALITY TO SUPPORT TOUCH SENSORS</h3>
                <p>The visualization receives frames of information from an Arduino output.
                   These frames include a header for synchronization, the values of touch input, and a checksum to confirm correct values.</p>
                <p>The header includes: </p>
                <ul>
                    <li><p>A string of values to synchronize the beginning of the frame.</p></li>
                    <li><p>The size of the Touch Sensor that is currently connected.</p></li>
                    <li><p>A timestamp to enable recording and playback of user input.</p></li>
                </ul>
<div className="code-text">
<pre className="small-code">{
`pressureBuffer[0] = 0xff;
pressureBuffer[1] = 0xff;
pressureBuffer[2] = 0xff;
pressureBuffer[3] = 0xff;
`}</pre>
<pre className="small-code">{
`widthUB = (byte)(width >> 8);
widthLB = (byte)(width);
pressureBuffer[4] = widthLB; 
pressureBuffer[5] = widthUB;
`}</pre>
</div>               
                </div> {/*close div for introduction-text*/}
                <img src={SensorSizes} alt="Sensor Sizes" className="intro-image" />
            </div> {/*close div for introduction-top*/}
            <div className="introduction-top">
                <div className="introduction-text">
                    <h3>BACK-END USING NODE.JS AND SOCKET.IO</h3>
                    <p>User input from the Touch Sensor is received from the Arduino to a custom back-end which interprets the Arduino data. After the data is interpreted, the back-end sends this information to the front-end to be rendered.</p>
                    <p>Every byte of Arduino data received is bit shifted in order to be read properly.</p>
                    <p>The unique string of values which indicate the start of each frame of data, the bytes that represent the size of the Touch Sensor, the entire length of values from every point of the Touch Sensor, and the timestamp are all interpreted here.</p>
                    <p>That information is packaged into a JavaScript Object which is sent to the front-end.</p>
                </div>
                <div className="intro-code">
<pre className="large-code">{
`// Sends the array of values (msg) to React
function sendObject(msg) {
	io.emit('Sensor', msg);
}
`}</pre>
<pre className="large-code">{
`function bitShift(numberByte1, numberByte2) {
    var byte1 = numberByte1;
    var byte2 = numberByte 2;
	return = (byte2 << 8) + byte1;
}
`}</pre>
</div>
            </div>
            <div className="introduction-top">
                <div className="introduction-text">
                    <h3>REACT AND D3 FRONT-END</h3>
                    <p>Responsive rendering of touch input is achieved by using React and D3. React ensures a responsive web-based visualization interface by only updating the DOM elements that have changed.</p>
                    <p>Webpack is used to bundle all the node modules in our project. This allows us to hot module swap our application, which refreshes our application when changes are made, for quicker development. Babel allows the visualization to use ES5 and ES6 JavaScript features, and compiles our JavaScript for browsers to understand.</p>
                    <p>The real-time visualization of touch sensor input is displayed on screen using D3. D3 uses SVG, HTML and CSS technologies to render two-dimensional visualizations.</p>
                </div>
                <img src={Demo} alt="Visualization Demo" className="intro-image" />
            </div>
        </div>
        )
    }
};

export default IntroText;