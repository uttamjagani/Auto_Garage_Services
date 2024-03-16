import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
//import hero_image from'../Assets/hero_image.png'
import bike_mode_1 from '../Assets/bike_mode_1.png'
//import banner_bike from '../Assets/banner_bike.jpg'


const Hero = () => {
  return (
        
    <div className='hero'>
      <div className="hero-left">
        <h2>New Bike Launch</h2>
        <div>
          <div className="hero-hand-icon">
            <p>New</p>
            <img src={hand_icon} alt="" />
        </div>
        <p>Collection</p>
        <p>Of Bike  </p>
          
        </div>
        <div className="hero-button">
          <div onClick={()=>{}}>Lettest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={bike_mode_1} alt="" />
      </div>
        
    </div>
  )
}

export default Hero