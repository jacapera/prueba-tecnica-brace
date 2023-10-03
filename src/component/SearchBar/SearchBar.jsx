import React, { useEffect, useState } from 'react'
import style from './SearchBar.module.css'
import buscar from '../../assets/busqueda.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectMovies,
  selectYears,
  setFilteredMovieByYear,
  setYears
} from '../../redux/appSlice'

const SearchBar = () => {

  //const [year, setYear] = useState("");

  const movies = useSelector(selectMovies);
  const years = useSelector(selectYears);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value)
    const year = parseInt(value)
    dispatch(setFilteredMovieByYear({year, movies}))


  }

  useEffect(() => {
    if(years?.length === 0){
      dispatch(setYears({movies}))
    }
  },[movies])

  return (
    <div className={`${style.containerSearchBar}`}>

      <div className={`${style.buscar}`}>
        <input
          className={`${style.inputName}`}
          type='text'
          placeholder='What do you want to watch?'
        />
        <div className={`${style.logoBuscar}`}>
          <img src={buscar} />
        </div>
      </div>

      <div className='flex'>
        <select
          className={`${style.selectYear}`}
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
      </div>

      <div>
        <input type="text" />
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  )
}

export default SearchBar