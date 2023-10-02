import React from 'react'
import style from './CardMovie.module.css'

const CardMovie = ({image, title, releaseYear}) => {

  return (
    <div className={`${style.containerCardMovie}`}>
      <div>
        <img className={`${style.imageCard}`} src={image} />
      </div>
      <span className={`${style.titleYearMovie}`}>{releaseYear}</span>
      <span className={`${style.titleMovie}`}>{title}</span>
    </div>
  )
}

export default CardMovie