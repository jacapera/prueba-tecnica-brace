import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './appSlice'

const store = configureStore({
  reducer:{
    app: movieReducer,
  },

  devTools: true
})

export default store;
