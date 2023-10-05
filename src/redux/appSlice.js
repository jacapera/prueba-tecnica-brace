import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import movies2 from '../utils/movies'
import axios from 'axios'

const urlApi = import.meta.env.VITE_URL_API_MOVIES
const urlApiActors = import.meta.env.VITE_URL_API_ACTORS

const initialState = {
  movies:[],
  copyMovies:[],
  years:[],
  titleType:[],
  actors:[],
  error:"",
  index:0,
  isModalOpen:false,
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

export const getMovieById = createAsyncThunk("app/getMovieById", async({id}) => {
  try {
    const { data } = await axios.get(`${urlApi}/${id}`, {
      headers: {
        'X-RapidAPI-Key': '094ef17c14msh3c9f12c24492db1p193f63jsne263e5d9fadb',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    });
    //console.log("data movie id: ", data.results)
    return data
  } catch (error) {
    console.log("ERROR REDUX getMovieById: ", error);
  }
});

export const getActors = createAsyncThunk("app/getActors", async() => {
  try {
    const { data } = await axios.get(`${urlApiActors}?limit=50`, {
      headers: {
        'X-RapidAPI-Key': '094ef17c14msh3c9f12c24492db1p193f63jsne263e5d9fadb',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    });
    return data;
  } catch (error) {
    console.log("ERROR REDUX getActors: ", error);
  }
});


const appSlice = createSlice({
  name:"app",
  initialState,
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCopyMovies: (state, action) => {
      state.copyMovies = action.payload;
    },
    setYears: (state, action) => {
      const { movies } = action.payload;
      const yearsF = new Set();
      const filteredYears = movies?.map((movie) => {
        const year = movie.releaseYear?.year;
        //console.log(typeof(year))
        if(!yearsF.has(year)){
          yearsF.add(year);
          return year;
        }
      return null;
    })
    const auxArray =  Array.from(yearsF);
    const arrayYears = auxArray.sort((a, b) => b - a)
    state.years = arrayYears;
    },
    setTitleType: (state, action) => {
      const { movies } = action.payload;
      const titlesSet = new Set();
      const filteredTitlesType = movies?.map((movie) => {
        const title = movie.titleType?.text.toUpperCase();
        //console.log(typeof(title))
        if(!titlesSet.has(title)){
          titlesSet.add(title);
          return title;
        }
      return null;
    })
    const auxArray =  Array.from(titlesSet);
    const arrayTitlesType = auxArray.sort((a, b) => b - a)
    state.titleType= arrayTitlesType;
    },
    setFilteredMovieByYear: (state, action) => {
      const { year, movies } = action.payload;
      const filteredMovies = movies.filter(item => item.releaseYear?.year === year);
      //console.log("filteredMovies: ", filteredMovies)
      state.copyMovies = filteredMovies;
    },
    filterByName: (state, action) => {
      const { name, movies } = action.payload;
      const filteredMovies = movies.filter(
        movie => movie.originalTitleText.text.toLowerCase().includes(name.toLowerCase())
      )
      //console.log(filteredMovies)
      if(filteredMovies.length === 0){
        state.error ="No se encontro ningun resultado con este nombre";
        state.isModalOpen = true;
        return
      }
      state.copyMovies = filteredMovies
    },
    filterByTypeTitle:(state, action) => {
      const { type, movies } = action.payload;
      //console.log("type", type)
      const filtered = movies.filter(item => item.titleType.text.toUpperCase() === type)
      //console.log("mirando: ", filtered)
      state.copyMovies = filtered;
    },
    orderByNameAsc:(state, action) => {
      const { movies } = action.payload;
      const orderMovie = [...movies].sort((a, b) => {
        return a.originalTitleText.text.toLowerCase() < b.originalTitleText.text.toLowerCase() ? -1
          : a.originalTitleText.text.toLowerCase() > b.originalTitleText.text.toLowerCase() ? 1 : 0
      })
      state.copyMovies = orderMovie
    },
    orderByNameDes:(state, action) => {
      const { movies } = action.payload;
      const orderMovie = [...movies].sort((a, b) => {
        return b.originalTitleText.text.toLowerCase() < a.originalTitleText.text.toLowerCase() ? -1
          : b.originalTitleText.text.toLowerCase() > a.originalTitleText.text.toLowerCase() ? 1 : 0
      })
      state.copyMovies = orderMovie
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getMovies.fulfilled, (state, action) => {
      //console.log("ACTION FULFILLED: ", action)
      if(action.payload === "Network Error"){
        state.error = action.payload;
        return
      }
      state.movies = [...movies2, ...action.payload.results];
      state.copyMovies = [...movies2, ...action.payload.results];
      state.error = ""
    })
    .addCase(getMovies.rejected, (state, action) => {
      console.log("ACTION REJECTED: ", action)
    })
    .addCase(getActors.fulfilled, (state, action) => {
      const auxActors = action.payload.results?.map(item => {
        return{
          ...item,
          knownForTitles: item.knownForTitles.split(",")
        }
      })
      state.actors = auxActors;
    })
  }
})


export default appSlice.reducer;
export const {
  setIndex,
  setYears,
  setError,
  setIsModalOpen,
  setTitleType,
  setFilteredMovieByYear,
  filterByTypeTitle,
  filterByName,
  orderByNameAsc,
  orderByNameDes,
  setCopyMovies,
} = appSlice.actions;
export const selectMovies = (state) => state.app.movies;
export const selectYears = (state) => state.app.years;
export const selectCopyMovies = (state) => state.app.copyMovies;
export const selectError = (state) => state.app.error;
export const selectActors = (state) => state.app.actors;
export const selectTitleType = (state) => state.app.titleType;
export const selectIndex = (state) => state.app.index;
export const selectIsOpenModal = (state) => state.app.isModalOpen;





