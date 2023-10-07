import React, { useEffect } from 'react'
import NavBar from '../../component/Navbar/NavBar'
import Banner from '../../component/Banner/Banner'
import SearchBar from '../../component/SearchBar/SearchBar'
import Movies from '../Movies/Movies'
import Footer from '../../component/Footer/Footer'
import slides from '../../utils/slides'
import { getActors, selectActors, selectError, selectIsOpenModal, selectStatus, setIsModalOpen } from '../../redux/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../component/Modal/Modal'

const Home = () => {

  const actors = useSelector(selectActors);
  const error = useSelector(selectError);
  const isModalOpen = useSelector(selectIsOpenModal);
  const status = useSelector(selectStatus);
  console.log("actors: ", actors)

  const dispatch = useDispatch();
  useEffect(() => {
    if(status === 429){
      return
    }
    if(actors?.length === 0 || !actors){
      dispatch(getActors())
    }
  }, [actors])

  // useEffect(() => {
  //   if(status === 429){
  //     return
  //   }
  //   if(error !== ""){
  //     dispatch(setIsModalOpen(true))
  //   }
  // }, [error])

  return (
    <div>
      {
        isModalOpen ? <Modal message={error} /> :
          <div className='
          flex flex-col
          justify-center items-center
          w-[100%]
          '>
            <header className='flex w-[100%] '>
              <NavBar />
              <Banner slides={slides}/>
            </header>
            <main className={`
              flex flex-col w-[100%] justify-center items-center
            `}>
              <header className={`
                flex
                items-center justify-center
                w-[100%]
              `}>
                <SearchBar />
              </header>
              <Movies />
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
      }
    </div>
  )
}

export default Home