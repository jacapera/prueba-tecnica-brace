import React, { useState } from 'react'
import style from './Banner.module.css'
import anguloIzq from '../../assets/angulo-izquierdo.png'
import anguloDer from '../../assets/angulo-derecho.png'
import play from '../../assets/klipartz.com.png'

const Banner = ({ slides }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirsSlide = currentIndex === 0;
    const newIndex = isFirsSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  const goToSlide = (index) => {
    setCurrentIndex(index);
  }

  return (
    <div
    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url('${slides[currentIndex].url}')` }}
    className={`${style.containerBanner} `}

    >
      <div className={`${style.slice} `}>
        <img
          className={`${style.iconAngIzq}`}
          src={anguloIzq} alt={"icon"}
          onClick={goToPrevious}
        />
        <img
          className={`${style.iconAngDer}`}
          src={anguloDer} alt={"icon"}
          onClick={goToNext}
        />
      </div>
        <div className={`${style.infoBanner}`}>
          <h1 className={`${style.titleBanner}`}>{slides[currentIndex].title}</h1>
          <p className={`${style.descriptionBanner}`}>{slides[currentIndex].description}</p>

          <div className={`${style.playTrailer} `}>
            <div className={`${style.logoPlay}`}>
              <img className='text-red-500' src={play} alt="play" />
            </div>
            <span className={`${style.span}`}>WATCH TRAILER</span>
          </div>

        </div>
        <div className={`${style.containerbuttonSlide}`}>
          {
            slides.map((slide, index) => (
              <div key={index} >
                <button className={`${style.buttonSlide}`} onClick={() => goToSlide(index)} ></button>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Banner