import React from 'react'
import './Footer.css'
import Garage_icon from '../Assets/Garage_icon.png'
import wp1_logo from '../Assets/wp1_logo.png'
import insta_logo from '../Assets/insta_logo.png'
import fb_logo from '../Assets/fb_logo.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo" >
            <img src={Garage_icon} alt="" height={50} width={50} />
            <p>A G S</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
            <li>Help</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={wp1_logo} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={fb_logo} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={insta_logo} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>copyright @ 2024 -All Right Reserved By UTTAM JAGANI.</p>
        </div>
    </div>
  )
}

export default Footer