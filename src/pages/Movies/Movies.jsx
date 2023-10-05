import React, { useEffect, useState } from 'react'
import CardMovie from '../../component/CardMovie/CardMovie'
import style from './Movies.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies, selectCopyMovies, selectError, selectMovies } from '../../redux/appSlice'
import NotFound from '../../component/NotFound/NotFound'
import anguloIzq from '../../assets/angulo-izquierdo.png'
import anguloDer from '../../assets/angulo-derecho.png'
import arriba from '../../assets/angulo-hacia-arriba.png'

const Movies = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const [buttonPrevDisable, setButtonPrevDisable] = useState(false);
  const [buttonNextDisable, setButtonNextDisable] = useState(false);
  const [pagesNumbers, setPagesNumbers] = useState([]);
  const [scrollOnPageChange, setScrollOnPageChange] = useState(false);

  const movies = useSelector(selectMovies);
  const copyMovies = useSelector(selectCopyMovies);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const filteredMovies = copyMovies?.slice(currentPage, currentPage + 12)

  const nextPage = () => {
    copyMovies.length > currentPage + 12 && setCurrentPage(currentPage + 12);
  }

  const prevPage = () => {
    currentPage > 0 && setCurrentPage(currentPage - 12);
  }

  const pageSelected = (event) => {
    const { value } = event.target;
    const pageNumberIndex = parseInt(value) - 1;
    (pageNumberIndex >= 0 && pageNumberIndex < pagesNumbers.length)
      && setCurrentPage(pageNumberIndex * 12);
    setScrollOnPageChange(true);
  }

  const splitPages = (copyMovies, size) => {
    const pageNumber = [];
    const length = copyMovies.length;
    for( let i = 0; i < length; i += size ){
      pageNumber.push(i / size + 1);
    }
    setPagesNumbers(pageNumber);
  }

  const irHaciaArriba = () => {
    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    });
  }

  //const shortening = ()

  useEffect(() => {
    //setCurrentPage(0);
    splitPages(copyMovies, 12);
  }, [copyMovies])

  useEffect(() => {
    if(movies?.length === 0){
      dispatch(getMovies())
    }
    //console.log(movies)
  }, [movies])

  useEffect(() => {
    currentPage === 0
      ? setButtonPrevDisable(true)
      : currentPage >= 12 && setButtonPrevDisable(false);
    ((currentPage/12) + 1) === pagesNumbers.length
      ? setButtonNextDisable(true)
      : ((currentPage/12) + 1) < pagesNumbers.length
      && setButtonNextDisable(false);
  },[currentPage])

  useEffect(() => {
    if (scrollOnPageChange) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });

      setScrollOnPageChange(false);
    }
  }, [currentPage, scrollOnPageChange, copyMovies]);

  return (
    <>
      { error === "Network Error" ?
        (<NotFound />):(
          <div className='flex flex-col justify-center items-center' >
            <div className={`${style.containerMovie}`}>
              {
                filteredMovies?.length > 0 && filteredMovies?.map((movie, index) => (
                  <CardMovie
                    key={movie.id}
                    id={movie.id}
                    image={movie.primaryImage?.url}
                    title={movie.originalTitleText?.text}
                    releaseYear={movie.releaseYear?.year}
                    type={movie.titleType?.text.toUpperCase()}
                  />
                ))
              }
            </div>
            <div className={`flex gap-[3px] w-[350px] justify-center items-center`}>
              <button onClick={prevPage} disabled={buttonPrevDisable} className={`${style.buttonAng}`}>
                <img className={`border-[1px] w-[35px] sm:w-[45px]`} src={anguloIzq} alt="icon angulo izquierdo" />
              </button>
              <div className={`flex h-[40px]  sm:max-w-[300] sm:h-[50px] md:max-w-[400px] lg:max-w-[500px] overflow-x-auto ${style.customScrollbarHorizontal}`}>
                {
                  pagesNumbers?.map((num, index) => (
                    <button
                      className={`${style.buttonPage} ${currentPage === index * 12 && style.currentPageButton}`}
                      key={index} value={num}
                      onClick={pageSelected}
                    >{num}</button>
                  ))
                }
              </div>
              <button onClick={nextPage} disabled={buttonNextDisable} className={`${style.buttonAng}`}>
                <img className={`border-[1px] w-[35px] sm:w-[45px]`} src={anguloDer} alt="icon angulo derecho" />
              </button>
            </div>
              <div className={`relative top-[3vh] left-[30%] w-[30px] sm:w-[40px] border-[1px] `} onClick={irHaciaArriba}>
                <img src={arriba} alt="icon agular hacia arriba" className={`w-[70px]`}/>
              </div>
          </div>
        )
      }
    </>
  )
}

export default Movies