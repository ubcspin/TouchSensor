import React, { Component } from 'react';
import './IntroText.css'
import ArduinoImage from '../../images/ArduinoImage.jpg';
import HardwareImage from '../../images/HardwareImage.jpg';
import TouchSensorVideo from '../../videos/TouchSensorVideo.mp4';

class IntroText extends Component {
    constructor(props) {
        super(props)
    };
    render() {
        return (
            <div id="entire-introduction">
                <div className="video-top">
                    <div className="video-text">
                       <p className="intro-text">Variously sized sensors are needed to fit the sizes and shapes of different robots. 
                       </p>
                       <p className="intro-text">
                          To adapt to different surface areas of touch sensors, our custom Arduino functionality 
                          passes the necessary data to visualize touch inputs.
                       </p>
                       <p className="intro-text">
                          A web-based visualization was created to render real-time touch inputs. 
                          The position and depth of a user’s touch is sensed, and displayed in a two-dimensional layout.
                       </p>
                    </div>{/*close div for introduction-text*/}
                    <video id="intro-video" autoPlay muted loop>
                     <source src={TouchSensorVideo} type="video/mp4" />
                    </video>
                </div>{/*close div for introduction-top*/}
                <div className="introduction-top">
                    <div className="introduction-text">
                <h3>Sensors made with Arduino</h3>
                <p>The visualization supports variously sized sensors connected with Arduino. 
                                     The size and input of the sensors are sent to the visualization to be rendered.</p>
                
                
                </div> {/*close div for introduction-text*/}
                <img src={ArduinoImage} alt="Aruino" className="intro-image" />
            </div> {/*close div for introduction-top*/}
            <div className="introduction-top">
                <div className="introduction-text">
                    <h3>React and D3</h3>
                    <p>Reponsive rendering of touch input is achieved by using React and D3.
                                         React ensures a responsive web-based visualization interface.
                                         Real-time rendering of touch input is rendered with D3.</p>
                </div>
                <img src={HardwareImage} alt="Demo Hardware" className="intro-image" />
            </div>
        </div>
        )
    }
};

export default IntroText;