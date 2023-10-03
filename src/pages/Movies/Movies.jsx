import React, { useEffect } from 'react'
import CardMovie from '../../component/CardMovie/CardMovie'
import style from './Movies.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies, selectCopyMovies, selectMovies, setYears, } from '../../redux/appSlice'

const Movies = () => {

  const movies = useSelector(selectMovies);
  const copyMovies = useSelector(selectCopyMovies);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if(movies?.length === 0){
      dispatch(getMovies())
    }
    console.log(movies)
  }, [movies])

  return (
    <div className={`${style.containerMovie}`}>
      {
        copyMovies?.map(movie => (
          <CardMovie
            key={movie.id}
            image={movie.primaryImage?.url}
            title={movie.originalTitleText?.text}
            releaseYear={movie.releaseYear?.year}
          />
        ))
      }
    </div>
  )
}

export default Movies