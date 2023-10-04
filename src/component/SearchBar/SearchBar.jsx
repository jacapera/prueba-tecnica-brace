import React, { useEffect, useState } from 'react'
import style from './SearchBar.module.css'
import buscar from '../../assets/busqueda.png'
import ordenar from '../../assets/ordenar-alt.png'
import filtrar from '../../assets/filtrar.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  filterByName,
  selectCopyMovies,
  selectMovies,
  selectYears,
  setFilteredMovieByYear,
  setYears
} from '../../redux/appSlice'

const SearchBar = () => {

  const [name, setName] = useState("");

  const movies = useSelector(selectMovies);
  const copyMovies = useSelector(selectCopyMovies);
  const years = useSelector(selectYears);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value)
    const year = parseInt(value)
    dispatch(setFilteredMovieByYear({year, movies}))
  }
  
  const handleName = (event) => {
    const { value } = event.target;
    setName(value);
  }

  const handleFindByName = (event) => {
    if(copyMovies.length < movies.length){
      dispatch(filterByName({name, movies:copyMovies}))
    } else {
      dispatch(filterByName({name, movies}))
    }
  }

  useEffect(() => {
    if(years?.length === 0){
      dispatch(setYears({movies}))
    }
  },[movies])

  return (
    <div className={`${style.containerSearchBar} `}>

      <div className={`${style.buscar} `}>
        <input
          className={`${style.inputName}`}
          type='text'
          placeholder='What do you want to watch?'
          name='name'
          value={name}
          onChange={handleName}
        />
        <div
          className={`${style.logoBuscar}`}
          onClick={handleFindByName}
        >
          <img src={buscar} />
        </div>
      </div>

      <div className={`
        flex flex-col gap-[5px]
        items-center
        md:flex-row md:w-[40rem]
        md:justify-between
      `}>
          <select
            className={`${style.selectYear} font-bold`}
            value={"default"}
            onChange={handleChange}
          >
            <option value={"default"} hidden >AÑO</option>
            {
              years?.map((year) => (
                <option key={year}>{year}</option>
              ))
            }
          </select>
          <div >
            <div className={`
              flex w-[140px] h-[45px]
              justify-between
              rounded-[7px] border-[1px] py-[10px] px-[13px]
              border-black
            `}>
              <span className={`font-bold`}>ORDENAR</span>
              <img
                src={ordenar} alt="icon buscar"
                className={`flex w-[20px] h-[20px] cursor-pointer `}
              />
            </div>
          </div>
          <div>
            <div className={`
              flex w-[140px] h-[45px]
              justify-between
              rounded-[7px] border-[1px] py-[10px] px-[13px]
              border-black
            `}>
              <span className={`font-bold`}>PELICULAS</span>
              <img
                src={filtrar} alt="icon buscar"
                className={`flex w-[20px] h-[20px] cursor-pointer `}
              />
            </div>
          </div>
          <button
            className={`
              flex w-[100px] h-[45px]
              justify-center items-center
              p-[7px] rounded-[7px]
              border-[1px] bg-red-500
              text-white font-bold
              cursor-pointer
            `}
          >LIMPIAR</button>
      </div>

    </div>
  )
}

export default SearchBar