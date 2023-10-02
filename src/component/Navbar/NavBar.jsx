import React from 'react'
import style from './NavBar.module.css'
import logo from '../../assets/Logo-removebg-preview.png'

const NavBar = () => {
  return (
    <div className={`${style.containerNavbar} `}>
      <div className={`${style.containerLogo}`}>
        <img src={logo} alt='logo' className={`${style.logo}`} />
        <span className={`${style.spanLogo}`}>Movie Box</span>
      </div>
      <ul>
        <li>
        </li>
      </ul>
    </div>
  )
}

export default NavBar