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
                       <h3>Visualizing Touch Gestures on Fabric Sensors</h3>
                       <p className="topic">
                        Sensing touch input on a variety of objects, from robots to tables, requires sensors that can come in all shapes and sizes. To enable this, fabric sensors were made with the ability to read the pressure and location of touch inputs.
                       </p>
                       <p>
                       In order to process the touch input and size of the fabric sensors, an Arduino is connected from the sensor to the visualization tool.
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
                        <h3>How do I use this tool?</h3>
                        <p className="instruction">I am viewing online</p>
                        <p>Select the Mouse Simulation to view a pointer-based simulation of the demo</p>
                        <p className="instruction">I have an Arduino Touch Sensor connected</p>
                        <p>The demo will detect that an Arduino is connected.<br /> 
                           All options of the Touch Sensor Visualition will become selectable.</p>
                    </div>
                    <img src={HardwareImage} alt="Demo Hardware" className="intro-image" />
                </div>
                <div className="introduction-top">
                    <div className="introduction-text">
                <h3>Arduino Functionality to Support Touch Sensors</h3>
                <p>The visualization receives frames of information from an Arduino output.
                   These frames include a header for synchronization, the values of touch input, and a checksum to confirm correct values.</p>
                <p>The header includes: </p>
                <ul>
                    <li><p>A string of values to synchronize the beginning of the frame.</p></li>
                    <li><p>The size of the Touch Sensor.</p></li>
                    <li><p>A timestamp that counts the time since the Touch Sensor began to sense input.</p></li>
                </ul>
<div className="code-text">
<pre>{
`pressureBuffer[0] = 0xff;
pressureBuffer[1] = 0xff;
pressureBuffer[2] = 0xff;
pressureBuffer[3] = 0xff;
`}</pre>
<pre>{
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
                    <h3>React and D3</h3>
                    <p>Reponsive rendering of touch input is achieved by using React and D3.
                                         React ensures a responsive web-based visualization interface.
                                         Real-time rendering of touch input is rendered with D3.</p>
                </div>
                <img src={Demo} alt="Visualization Demo" className="intro-image" />
            </div>
        </div>
        )
    }
};

export default IntroText;