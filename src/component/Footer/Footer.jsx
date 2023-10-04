import React from 'react'
import icons from '../../utils/icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className={`flex flex-col p-[30px] gap-[10px] justify-between items-center w-full h-[250px]`}>
      <div className={`flex w-[250px] sm:w-[50%] justify-between `}>
        <Link to={'https://www.facebook.com'} target='_blank' rel="noopener noreferrer" >
          <img
            className={`w-[35px] h-[35px] cursor-pointer hover:scale-125 transform transition-transform duration-300  `}
            src={icons.facebook} alt="icons facebook" />
        </Link>
        <Link to={'https://www.instagram.com'} target='_blank' rel="noopener noreferrer">
          <img
            className={`w-[35px] h-[35px] cursor-pointer hover:scale-125 transform transition-transform duration-300`}
            src={icons.instagram} alt="icons instagram" />
        </Link>
        <Link to={'https://twitter.com'} target='_blank' rel="noopener noreferrer">
          <img
            className={`w-[35px] h-[35px] cursor-pointer hover:scale-125 transform transition-transform duration-300`}
            src={icons.tweeter} alt="icons tweeter" />
        </Link>
        <Link to={'https://www.youtube.com'} target='_blank' rel="noopener noreferrer">
          <img
            className={`w-[35px] h-[35px] cursor-pointer hover:scale-125 transform transition-transform duration-300`}
            src={icons.youtube} alt="icons youtube" />
        </Link>
      </div>
      <div className={`flex flex-col justify-center gap-[10px] items-center w-full sm:flex-row sm:gap-[30px]  `}>
        <h1 className={`text-sm sm:text-xl md:text-2xl font-bold `}>Conditions of Use</h1>
        <h1 className={`text-sm sm:text-xl md:text-2xl font-bold `}>Privacy & Policy</h1>
        <h1 className={`text-sm sm:text-xl md:text-2xl font-bold `}>Press Room</h1>
      </div>
      <div className={`flex justify-center w-full`}>
        <h1 className={`text-xs sm:text-xl md:text-2xl font-bold text-slate-500 `}>© 2021 MovieBox by Adriana Eka Prayudha</h1>
      </div>

    </div>
  )
}

export default Footer