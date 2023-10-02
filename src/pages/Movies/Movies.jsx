import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardMovie from '../../component/CardMovie/CardMovie'
import style from './Movies.module.css'

const urlApi = import.meta.env.VITE_URL_API_MOVIES



const Movies = () => {

  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const { data } = await axios.get(urlApi, {
      headers: {
        'X-RapidAPI-Key': '094ef17c14msh3c9f12c24492db1p193f63jsne263e5d9fadb',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    })
    setMovies(data.results)
  }
  
  useEffect(() => {
    if(movies.length === 0){
      getMovies()
    }
    console.log(movies)
  }, [movies])

  return (
    <div className={`${style.containerMovie}`}>
      {
        movies?.map(movie => (
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