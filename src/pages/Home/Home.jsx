import React, { useEffect } from 'react'
import NavBar from '../../component/Navbar/NavBar'
import Banner from '../../component/Banner/Banner'
import SearchBar from '../../component/SearchBar/SearchBar'
import Movies from '../Movies/Movies'
import Footer from '../../component/Footer/Footer'
import slides from '../../utils/slides'
import { getActors } from '../../redux/appSlice'
import { useDispatch } from 'react-redux'

const Home = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActors())
  }, [dispatch])

  return (
    <div className='
      flex flex-col
      content-center
      '>
      <header className='flex justify-center'>
        <NavBar />
        <Banner slides={slides}/>
      </header>
      <main className={`
        flex flex-col justify-center items-center
      `}>
        <header className={`
          flex
          w-[420px]
          sm:w-[90%]
        `}>
          <SearchBar />
        </header>
        <Movies />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home