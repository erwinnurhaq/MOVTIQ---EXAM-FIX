import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-left-container">
                    <ul>
                        <li><Link to="#">About Us</Link>|</li>
                        <li><Link to="#">Legal Terms</Link>|</li>
                        <li><Link to="#">Careers</Link>|</li>
                        <li><Link to="#">Feedback</Link>|</li>
                        <li><Link to="#">Contact Us</Link></li>
                    </ul>
                    <div>
                        Copyrights &copy; 2019 - <b>MOVTIQ.INC ALL RIGHTS RESERVED.</b>
                    </div>
                </div>
                <div className="footer-right-container">
                    <img src={require('../img/footer-sprite/s1.png')} alt="sprite1" />
                    <img src={require('../img/footer-sprite/s2.png')} alt="sprite2" />
                    <img src={require('../img/footer-sprite/s3.png')} alt="sprite3" />
                    <img src={require('../img/footer-sprite/s4.png')} alt="sprite4" />
                    <img src={require('../img/footer-sprite/s5.png')} alt="sprite5" />
                    <img src={require('../img/footer-sprite/googleplay.png')} alt="gplay" />
                    <img src={require('../img/footer-sprite/applestore.png')} alt="appstore" />
                </div>
            </div>
            <div className="white-bg-footer"></div>
        </div>
    )
}

export default Footer;