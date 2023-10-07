import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import slides from '../../utils/slides'
import back from '../../assets/angulo-izquierdo.png'
import YouTube from 'react-youtube'

const Trailer = () => {
  const [trailer, setTrailer] = useState("");
  //console.log("trailer", trailer)
  
  const { id } = useParams();
  //console.log(slides[id].trailer)
  //console.log("ID", id, slides)
  const navigate = useNavigate();

  const opts = {
    minWidth:'320px',
    maxWidth:'768px',
    playerVars: {
      // Opciones de reproducción de YouTube (opcional)
      autoplay: 1, // Reproducción automática
    },
  };

  useEffect(() => {
    setTrailer(slides[id].trailer?.split("/").pop())
  }, [id]);

  return (
    <div className={`flex flex-col w-[100%] h-[100vh] justify-center items-center`}>
      <img onClick={() => navigate("/")} src={back} alt="icon angulo izquierdo" className={`w-[50px] absolute top-1 left-2`} />
      <div className={`flex w-[100%] items-center justify-center `}>
        <YouTube  videoId={trailer} opts={opts} />
      </div>
      <div className={`flex w-[100%] items-center justify-start py-[5px]  ` }>
        <h1 className={`text-2xl font-bold`}>{slides[id].title} - Trailer</h1>
      </div>
    </div>
  )
}

export default Trailer