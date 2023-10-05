import React, { useEffect } from 'react'
import NavBar from '../../component/Navbar/NavBar'
import Banner from '../../component/Banner/Banner'
import SearchBar from '../../component/SearchBar/SearchBar'
import Movies from '../Movies/Movies'
import Footer from '../../component/Footer/Footer'
import slides from '../../utils/slides'
import { getActors, selectActors } from '../../redux/appSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

  const actors = useSelector(selectActors);

  const dispatch = useDispatch();
  useEffect(() => {
    if(actors?.length === 0 || !actors){
      dispatch(getActors())
    }
  }, [actors])

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