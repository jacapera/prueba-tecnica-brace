import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getActors, getMovieById, selectActors, selectIsLoading, selectStatus, setError } from '../../redux/appSlice';
import CardActor from '../CardActor/CardActor';
import fondo from '../../assets/fondo.jpg'
import defaultImage from '../../assets/pngwing.com.png'
import icons from '../../utils/icons'
import NotFound from '../NotFound/NotFound';
import Loading from '../Loading/Loading';

const DetailMovie = () => {

  const [movie, setMovie] = useState({});
  const [actorsFilter, setActorsFilter] = useState([]);

  const actors = useSelector(selectActors);
  const isLoading = useSelector(selectIsLoading);
  const status = useSelector(selectStatus);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log("actorsFilter: ", actorsFilter)
  console.log("isLoading DetailMovie:",isLoading)

  const filteredActors = () => {
    const aux = actors?.filter(actor => actor.knownForTitles?.includes(id));
    //console.log("aux:", aux)
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
    if(actors.length < 1){
      dispatch(getActors());
    }
  },[actors]);

  useEffect(() => {
    filteredActors()
  }, [])

  return (
    <div className={`flex flex-col gap-[10px] w-[100%] p-[10px] h-[100vh]  items-center justify-center md:max-w-[1440px] border-[1px]`}
    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url('${fondo}')` }}>
      <img onClick={() => navigate("/")} src={icons.anguloIzq} alt="icon angulo izquierdo" className={`w-[50px] absolute top-[10%] left-2 p-[8px] rounded-md bg-slate-400`} />
      <div className={`flex bg-slate-400/40 gap-[10px] w-[100%] h-[60%] p-[20px] ml-[50px] rounded-[9px] items-center justify-center md:max-w-[700px] `}>
        <div className={`flex w-[50%] rounded-md`}>
          <img src={!movie?.primaryImage?.url ? defaultImage : movie?.primaryImage?.url  } alt={movie?.caption?.plainText}
            className={`flex h-[100%] rounded-md`}
          />
        </div>
        <div className={`flex flex-col rounded-md  w-[50%] `}>
          <div className={`grid grid-cols-5 gap-[10px] w-[100%] justify-center bg-slate-100`}>
            <h1 className={`col-span-2 flex items-start justify-end font-bold text-sm md:text-lg`}>TITULO: </h1>
            <h1 className={`col-span-3  text-start text-sm md:text-xl`}>{movie?.originalTitleText?.text}</h1>
          </div>
          <div className={`grid grid-cols-5 gap-[10px] w-[100%] justify-center bg-slate-100`}>
            <h1 className={`col-span-2 flex justify-end items-center text-end font-bold text-sm md:text-lg `}>AÑO: </h1>
            <h1 className={`col-span-3 flex items-center text-start text-sm md:text-xl`}>{movie?.releaseYear?.year}</h1>
          </div>
          <div className={`grid grid-cols-5 gap-[10px] w-[100%] justify-center bg-slate-100`}>
            <h1 className={`col-span-2 flex items-start justify-end font-bold text-sm md:text-lg`}>ACTORES: </h1>
            <div className={`col-span-3 w-full`}>
              {
                actorsFilter?.map((actor, index) => (
                  <h1 key={index} className={`w-[60%] text-start`}>{actor.primaryName}</h1>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      {
        (status === 429) ?
          (<NotFound />)
          : (actors?.length < 1 || isLoading) ?
          <Loading />
          : (
            <div className={`flex items-center justify-center w-full h-[50%] p-[20px] rounded-md bg-slate-400/40 gap-6`}>
              <div className={`flex flex-wrap gap-[30px] justify-center items-center bg-slate-100 p-[10px] rounded-md`}>
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
    </div>
  )
}

export default DetailMovie