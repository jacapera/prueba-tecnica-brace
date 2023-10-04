import React from 'react'
import style from './CardMovie.module.css'
import defaultImage from '../../assets/pngwing.com.png'
import { Link } from 'react-router-dom'

const CardMovie = ({id, image, title, releaseYear}) => {

  return (
    <div className={`${style.containerCardMovie}`}>
      <Link to={`/detail/${id}`}>
        <div
          className={`
            flex flex-col justify-center items-center
            bg-slate-100 rounded-[20px]
            w-[250px] min-h-[433px]
            ${!image && "border-[1px] border-blue-500"}
          `}>
          <h1 className={`bg-gray-200/70`}>MOVIES</h1>
          <img className={`${style.imageCard} ${!image && " h-[250px]"}`} src={image ? image : defaultImage} />
        </div>
      </Link>
      <span className={`${style.titleYearMovie}`}>{releaseYear}</span>
      <span className={`${style.titleMovie}`}>{title}</span>
    </div>
  )
}

export default CardMovie