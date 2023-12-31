import React, { useEffect, useState } from 'react'
import style from './Banner.module.css'
import { Link } from 'react-router-dom'
import icons from '../../utils/icons'

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

  // para cambiar slide automaticamente
  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return (
    <div
    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url('${slides[currentIndex].url}')` }}
    className={`${style.containerBanner} `}
    // 
    >
      <div className={`${style.slice} `}>
        <img
          className={`${style.iconAngIzq}`}
          src={icons.anguloIzq} alt={"icon"}
          onClick={goToPrevious}
        />
        <img
          className={`${style.iconAngDer}`}
          src={icons.anguloDer} alt={"icon"}
          onClick={goToNext}
        />
      </div>
        <div className={`${style.infoBanner}`}>
          <h1 className={`${style.titleBanner}`}>{slides[currentIndex].title}</h1>
          <p className={`${style.descriptionBanner}`}>{slides[currentIndex].description}</p>
          <Link to={`/trailer/${currentIndex}`}>
            <div className={`${style.playTrailer} `} >
              <div className={`${style.logoPlay}`}>
                <img className={`text-red-500 `} src={icons.play} alt="play" />
              </div>
              <span className={`${style.span}`}>WATCH TRAILER</span>
            </div>
          </Link>

        </div>
        <div className={`${style.containerbuttonSlide}`}>
          {
            slides.map((slide, index) => (
              <div key={index} >
                <button className={`${style.buttonSlide} ${currentIndex === index && 'bg-red-600'}`} onClick={() => goToSlide(index)} ></button>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Banner