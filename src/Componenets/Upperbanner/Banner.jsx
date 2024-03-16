import React from 'react'
import Banner_1 from '../Assets/Banner_book.jpg';
import './Banner.css';

const Banner = () => {
  return (
    <div className='banner-1'>
        <img src={Banner_1} alt="" width={1400} height={450}/>
    </div>
  )
}

export default Banner