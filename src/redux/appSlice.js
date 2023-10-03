import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const urlApi = import.meta.env.VITE_URL_API_MOVIES

const initialState = {
  movies:[],
  copyMovies:[],
  years:[],
}

export const getMovies = createAsyncThunk("app/getMovies", async() => {
  try {
    const {data} = await axios.get(`${urlApi}?limit=50`, {
      headers: {
        'X-RapidAPI-Key': '094ef17c14msh3c9f12c24492db1p193f63jsne263e5d9fadb',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    });
    //console.log("redux", data.results)
    return data.results;
  } catch (error) {
    console.log("ERROR REDUX getMovies: ", error);
  }
});


const appSlice = createSlice({
  name:"app",
  initialState,
  reducers: {
    setYears: (state, action) => {
      const { movies } = action.payload;
      const yearsF = new Set();
      const filteredYears = movies.map((movie) => {
        const year = movie.releaseYear.year;
        if(!yearsF.has(year)){
          yearsF.add(year);
          return year;
        }
      return null;
    })
    const arrayYears =  Array.from(yearsF);
    state.years = arrayYears;
    },
    setFilteredMovieByYear: (state, action) => {
      const { year, movies } = action.payload;
      const filteredMovies = movies.filter(item => item.releaseYear.year === year);
      console.log("filteredMovies: ", filteredMovies)
      state.copyMovies = filteredMovies;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.copyMovies = action.payload;
    })
  }
})


export default appSlice.reducer;
export const {
  setYears, setFilteredMovieByYear,
} = appSlice.actions;
export const selectMovies = (state) => state.app.movies;
export const selectYears = (state) => state.app.years;
export const selectCopyMovies = (state) => state.app.copyMovies;
