import React, { useEffect, useState } from 'react'
import style from './SearchBar.module.css'
import buscar from '../../assets/busqueda.png'
import ordenar from '../../assets/ordenar-alt.png'
import filtrar from '../../assets/filtrar.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  filterByName,
  filterByTypeTitle,
  orderByNameAsc,
  orderByNameDes,
  selectCopyMovies,
  selectError,
  selectIndex,
  selectIsOpenModal,
  selectMovies,
  selectStatus,
  selectTitleType,
  selectYears,
  setCopyMovies,
  setError,
  setFilteredMovieByYear,
  setIndex,
  setIsModalOpen,
  setMovies,
  setStatus,
  setTitleType,
  setYears
} from '../../redux/appSlice'
import Modal from '../Modal/Modal'
import moviesLocal from '../../utils/movies'

const SearchBar = () => {

  const [name, setName] = useState("");
  const [order, setOrder] = useState(true);

  const movies = useSelector(selectMovies);
  const copyMovies = useSelector(selectCopyMovies);
  const years = useSelector(selectYears);
  const titleType = useSelector(selectTitleType);
  const index = useSelector(selectIndex);
  const error = useSelector(selectError);
  const isModalOpen = useSelector(selectIsOpenModal);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    //console.log(value)
    const year = parseInt(value)
    dispatch(setFilteredMovieByYear({year, movies}))
  }

  const handleName = (event) => {
    const { value } = event.target;
    setName(value);
  }

  const handleFindByName = (event) => {
    dispatch(filterByName({name, movies}))
    // if(copyMovies.length < movies.length){
    //   dispatch(filterByName({name, movies:copyMovies}))
    // } else {
    //   dispatch(filterByName({name, movies}))
    // }
  }

  const orderMovie = () => {
    //console.log(order)
    if(order){
      setOrder(!order)
      return dispatch(orderByNameAsc({movies: copyMovies}))
    }
    setOrder(!order)
    dispatch(orderByNameDes({movies: copyMovies}))
  }

  const clear = () => {
    setName("")
    dispatch(setCopyMovies(movies))
    dispatch(setIndex(0))
  }

  const filteredTitleType = () => {
    if(index < titleType.length){
      dispatch(setIndex(index + 1))
      //console.log("index +:  ",currentIndex )
      dispatch(filterByTypeTitle({type: titleType[index], movies}))
    }
    if(titleType.length - index === 1){
      dispatch(setIndex(0));
      dispatch(filterByTypeTitle({type: titleType[index], movies}))
      //console.log("son iguales", index)
    }
  };

  const viewMoviesLocal = () => {
    dispatch(setMovies(moviesLocal));
    dispatch(setCopyMovies(moviesLocal))
    dispatch(setError(""))
    dispatch(setStatus(null))
    console.log(moviesLocal)
  }

  useEffect(() => {
    if(years?.length === 0){
      dispatch(setYears({movies}))
    }
    if(titleType?.length === 0){
      dispatch(setTitleType({movies}))
    }
  },[movies])

  // useEffect(() => {
  //   if(status === 429){
  //     return
  //   }
  //   if(error !== ""){
  //     dispatch(setIsModalOpen(true))
  //   }
  // }, [dispatch])

  return (
    <div className={`${style.containerSearchBar}`}>

      <div className='flex items-center border-[1px] w-full  relative '>
        <div className={`flex items-center justify-center w-[100%] lg:max-w-[1440px]`}>
          <input
            className={`flex w-[100%]  h-[40px] border-[1px] border-black rounded-md p-[8px]`}
            type='text'
            placeholder='What do you want to watch?'
            name='name'
            value={name}
            onChange={handleName}
          />
        </div>
        <div
          className={`right-[2vh] w-[25px] ${style.logoBuscar}`}
          onClick={handleFindByName}
        >
          <img src={buscar} />
        </div>
      </div>

      <div className={`
        flex flex-col gap-[5px]
        items-center w-[100%]
        sm:flex-row sm:justify-between
      `}>
          <select
            className={`font-bold border-[1px]  border-black rounded-md ${style.selectYear} `}
            value={"default"}
            onChange={handleChange}
          >
            <option value={"default"} hidden >AÑO</option>
            {
              years?.map((year, index) => (
                <option key={index}>{year}</option>
              ))
            }
          </select>
          <div >
            <div className={`
              flex w-[140px] h-[37px]
              items-center
              sm:h-[45px]
              justify-between
              rounded-[7px] border-[1px] py-[10px] px-[13px]
              border-black
            `}>
              <span className={`font-bold`}>ORDENAR</span>
              <img
                onClick={orderMovie}
                src={ordenar} alt="icon buscar"
                className={`flex w-[20px] h-[20px] cursor-pointer `}
              />
            </div>
          </div>
          <div>
            <div className={`
              flex w-[140px] h-[37px]
              items-center
              sm:h-[45px]
              justify-between
              rounded-[7px] border-[1px] py-[10px] px-[13px]
              border-black
            `}>
              <span className={`font-bold`}>PELICULAS</span>
              <img
                onClick={filteredTitleType}
                src={filtrar} alt="icon buscar"
                className={`flex w-[20px] h-[20px] cursor-pointer `}
              />
            </div>
          </div>
          <button
            onClick={clear}
            className={`
              flex w-[100px] h-[37px]
              sm:h-[45px]
              justify-center items-center
              p-[7px] rounded-[7px]
              border-[1px] bg-red-500
              text-white font-bold
              cursor-pointer
            `}
          >LIMPIAR</button>
      </div>
      <div className='flex flex-col justify-center items-center gap-[5px] '>
        <h1 className='text-2xl'>Ver movies en local</h1>
        <button
          onClick={viewMoviesLocal}
          className={`
            flex w-[100px] h-[37px]
            sm:h-[45px]
            justify-center items-center
            p-[7px] rounded-[7px]
            border-[1px] bg-green-500
            text-white font-bold
            cursor-pointer
            hover:scale-110
          `}
        >MOVIES</button>
      </div>
      {
        isModalOpen && <Modal message={error} />
      }

    </div>
  )
}

export default SearchBar