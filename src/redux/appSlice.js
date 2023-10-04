import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const urlApi = import.meta.env.VITE_URL_API_MOVIES

const initialState = {
  movies:[],
  copyMovies:[],
  years:[],
  error:"",
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
    return data;
  } catch (error) {
    console.log("ERROR REDUX getMovies: ", error);
    return error.message;
  }
});


const appSlice = createSlice({
  name:"app",
  initialState,
  reducers: {
    setYears: (state, action) => {
      const { movies } = action.payload;
      const yearsF = new Set();
      const filteredYears = movies?.map((movie) => {
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
    },
    filterByName: (state, action) => {
      const { name, movies } = action.payload;
      const filteredMovies = movies.filter(
        movie => movie.originalTitleText.text.toLowerCase().includes(name.toLowerCase())
      )
      state.copyMovies = filteredMovies
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getMovies.fulfilled, (state, action) => {
      //console.log("ACTION FULFILLED: ", action)
      if(action.payload === "Network Error"){
        state.error = action.payload;
        return
      }
      state.movies = action.payload.results;
      state.copyMovies = action.payload.results;
      state.error = ""
    })
    .addCase(getMovies.rejected, (state, action) => {
      console.log("ACTION REJECTED: ", action)
    })
  }
})


export default appSlice.reducer;
export const {
  setYears,
  setFilteredMovieByYear,
  filterByName,
} = appSlice.actions;
export const selectMovies = (state) => state.app.movies;
export const selectYears = (state) => state.app.years;
export const selectCopyMovies = (state) => state.app.copyMovies;
export const selectError = (state) => state.app.error;