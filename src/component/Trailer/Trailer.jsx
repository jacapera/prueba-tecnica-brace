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
    playerVars: {
      // Opciones de reproducción de YouTube (opcional)
      autoplay: 1, // Reproducción automática
    },
  };

  useEffect(() => {
    setTrailer(slides[id].trailer?.split("/").pop())
  }, [id]);

  return (
    <div className={`flex flex-col w-full h-[100vh] justify-center items-center`}>
      <img onClick={() => navigate("/")} src={back} alt="icon angulo izquierdo" className={`w-[50px] absolute top-1 left-2`} />
      <div className={`flex items-center justify-center max-w-[600px]`}>
        <YouTube videoId={trailer} opts={opts} />
      </div>
      <div className={`flex w-full items-center justify-center`}>
        <h1 className={`w-[640px] text-left text-2xl font-bold`}>{slides[id].title} - Trailer</h1>
      </div>
    </div>
  )
}

export default Trailer