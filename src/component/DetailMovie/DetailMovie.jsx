import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getActors, getMovieById, selectActors, setError } from '../../redux/appSlice';
import CardActor from '../CardActor/CardActor';
import back from '../../assets/angulo-izquierdo.png'

const DetailMovie = () => {

  const [movie, setMovie] = useState({});
  const [actorsFilter, setActorsFilter] = useState([]);
  const actors = useSelector(selectActors);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("actorsFilter: ", actorsFilter)

  const filteredActors = () => {
    const aux = actors.filter(actor => actor.knownForTitles.includes(id));
    console.log("aux:", aux)
    setActorsFilter(aux);
  }

  useEffect(() => {
    dispatch(getMovieById({id})).then(res => {
      setMovie(res.payload.results)
    }).catch(error => {
      dispatch(setError(error.message))
    })
  }, [id])

  useEffect(() => {
    filteredActors()
  }, [])

  return (
    <div className={`flex flex-col gap-[10px] w-[100%] p-[10px] h-[100%] items-center justify-center md:max-w-[1440px] border-[1px] border-blue-600`}>
      <img onClick={() => navigate("/")} src={back} alt="icon angulo izquierdo" className={`w-[50px] absolute top-1 left-2`} />
      <div className={`flex  gap-[10px] w-[100%] h-[50%] p-[10px] items-center justify-center md:max-w-[700px] border-[1px] border-green-600`}>
        <div className={`flex w-[30%]`}>
          <img src={movie.primaryImage?.url} alt={movie.caption?.plainText}
            className={`flex h-[100%]`}
          />
        </div>
        <div className={`flex flex-col w-[70%] `}>
          <div className={`flex gap-[20px] w-[100%] justify-center bg-slate-200`}>
            <h1 className={`w-[40%] text-end font-bold text-lg bg-green-300`}>TITULO: </h1>
            <h1 className={`w-[60%] text-start`}>{movie.originalTitleText?.text}</h1>
          </div>
          <div className={`flex gap-[20px] w-[100%] justify-center bg-slate-200`}>
            <h1 className={`w-[40%] text-end font-bold text-lg bg-green-300`}>AÑO LANZAMIENTO: </h1>
            <h1 className={`w-[60%] text-start`}>{movie.releaseYear?.year}</h1>
          </div>
          <div className={`flex gap-[20px] w-[100%] justify-center bg-slate-200`}>
            <h1 className={`w-[40%] text-end font-bold text-lg bg-green-300`}>ACTORES: </h1>
            <div className={`flex flex-col w-full`}>
              {
                actorsFilter?.map((actor, index) => (
                  <h1 key={index} className={`w-[60%] text-start`}>{actor.primaryName}</h1>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={`flex gap-6`}>
        {
          actorsFilter?.map(actor => (
            <CardActor
              key={actor._id}
              id={actor.id}
              image={""}
              name={actor.primaryName}
              birthYear={actor.birthYear}
              deathYear={actor.deathYear}
            />
          ))
        }
      </div>
    </div>
  )
}

export default DetailMovie