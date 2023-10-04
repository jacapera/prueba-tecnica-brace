import './App.css'
import Banner from './component/Banner/Banner'
import NavBar from './component/Navbar/NavBar'
import Movies from './pages/Movies/Movies'
import IndianaJones from './assets/harrison-ford-indiana-jones-5-646756436712b.jpg'
import MarioBros from './assets/chris-pratt-anya-taylor-joy-the-super-mario-bros-movie-mario-princess-peach-princess-peach-6426d72c3bd17.jpg'
import Elemental from './assets/elemental-1662973129.jpg'
import johnWick4 from './assets/keanu-reeves-john-wick-4-1668099111-641dd349d68f7.jpeg'
import SearchBar from './component/SearchBar/SearchBar'
import Footer from './component/Footer/Footer'

function App() {

  const slides = [
    {url:IndianaJones, title:"Indiana Jones y el dial del destino",description:"Harrison Ford se despide de su icónico personaje Indiana Jones, el protagonista de varias de las mejores películas de aventuras de la historia, en una quinta entrega que, por primera vez en la saga, no está dirigida por Steven Spielberg. James Mangold ('Logan') es quien toma el relevo.",},
    {url:Elemental, title: "Elemental", description: "Pixar regresa con su mayor reto técnico hasta la fecha: Dar vida a los elementos del fuego y el agua en una comedia romántica que se cuela entre lo más tierno del año."},
    {url:MarioBros, title: "Super Mario Bros: La película", description: "La película basada en un videojuego más taquillera de todos los tiempos. Bombazo que nos ha pillado un poco por sorpresa, teniendo en cuenta la película precedente de hace 30 años..."},
    {url:johnWick4, title: "John Wick 4", description: "John Wick llega a su cuarta entrega más fuerte que nunca. Se ha convertido en la película más taquillera de una franquicia que ya prepara diversas series y spin-offs como 'Ballerina', con Ana de Armas."}
  ]

  return (
    <div className='
      flex flex-col
      content-center
      xl:max-w-[1440px]
    '>
      <header className='flex justify-center'>
        <NavBar />
        <Banner slides={slides}/>
      </header>
      <main className={`
        flex flex-col justify-center items-center
      `} >
        <header className={`
          flex
          w-[320px]
          md:w-[90%]
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

export default App
