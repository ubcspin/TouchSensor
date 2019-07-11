import React, { Component } from 'react';
import './IntroText.css'
import ArduinoImage from '../../images/ArduinoImage.jpg';
import TouchSensorVideo from '../../videos/TouchSensorVideo.mp4';

class IntroText extends Component {
    constructor(props) {
        super(props)
    };
    render() {
        return (
            <div id="entire-introduction">
                <div className="introduction-top">
                    <div className="introduction-text">
                        <h2>The Touch Sensor Visualization is a tool made with React and D3 to create 
                            a 2D represenation of various sensors.
                        </h2>
                        <h3>How do I use this tool?</h3>
                        <p className="topic">I am viewing online</p>
                        <ul>
                         <li>
                             <p>Select the <em>Mouse Demo</em> to view a pointer-based simulation
                                of the demo.
                            </p>
                         </li>
                        </ul>
                        <p className="topic">I have an Arduino-based Touch Sensor connected</p>
                        <ul>
                            <li>
                                <p>The demo will detect that an Arduino is connected.</p>
                            </li>
                            <li>
                                <p>The <em>HTML/CSS</em> and <em>D3 Demo</em> will become selectable,
                                   and a real-time visualization of the Touch Sensor will display.
                                </p>
                            </li>
                        </ul>
                    </div>{/*close div for introduction-text*/}
                    <video id="intro-video" autoPlay muted loop>
                     <source src={TouchSensorVideo} type="video/mp4" />
                    </video>
                </div>{/*close div for introduction-top*/}
                <div className="introduction-top">
                    <div className="introduction-text">
                <h3>More about this demo</h3>
                <p className="topic">Using a different Arduino-based Touch Sensor</p>
                <ul>
                    <li>
                        <p>Changing the number of <code>ground</code> and <code>power</code> pins and their placements allow for variously sized sensors to be used
                        with the Aruino code.</p>
                    </li>
                </ul>
                <p className="topic">Aruino code functionality</p>
                <ul>
                    <li>
                        <p>The information sent from the Arduino includes: </p>
                        <ol>
                            <li>
                                <p>The size of the Touch Sensor.</p>
                            </li>
                            <li>
                                <p>The touch input on the sensor.</p>
                            </li>
                        </ol>
                    </li>
                </ul>
                </div> {/*close div for introduction-text*/}
                <img src={ArduinoImage} alt="Aruino" className="intro-image" />
            </div> {/*close div for introduction-top*/}
        </div>
        )
    }
};

export default IntroText;