import './App.css'
import { Route, Routes } from 'react-router-dom'
import DetailMovie from './component/DetailMovie/DetailMovie'
import Home from './pages/Home/Home'
import Trailer from './component/Trailer/Trailer'

function App() {

  return (
    <div className='
      flex flex-col
      w-full h-full
      justify-content
      items-center
      content-center
    '>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path={'/detail/:id'} element={<DetailMovie />} />
        <Route path='/trailer/:id' element={<Trailer />} />
      </Routes>
    </div>
  )
}

export default App
