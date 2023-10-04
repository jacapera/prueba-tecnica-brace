import React from 'react'

const CardActor = ({id, image, name, birthYear, deathYear}) => {
  return (
    <div >
      <div className={`
        flex
        w-[200px] h-[250px]
        border-[1px]
        border-black rounded-md
      `}>
        <img src={image} alt={`img ${name}`}/>
      </div>
      <h1 className={`font-bold`}>{birthYear} - {deathYear}</h1>
      <h1 className={`font-bold`}>{name}</h1>
    </div>
  )
}

export default CardActor