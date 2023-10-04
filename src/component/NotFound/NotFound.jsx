import React from 'react'
import { useSelector } from 'react-redux'
import { selectError } from '../../redux/appSlice'

const NotFound = () => {

  const error = useSelector(selectError)

  return (
    <div className={`
      flex flex-col
      w-full h-[50vh]
      md:h-[50vh]
      justify-center items-center
      gap-[30px]
      bg-slate-800
    `}>
      <h1 className={`
        text-4xl
        text-white
        font-bold
        md:text-6xl
      `}>404 | Not Found</h1>
      <div>
        {
          error !== "" &&
            <h1 className={`
            text-4xl
            text-white
            font-bold
            md:text-6xl
            `}>{error}</h1>
        }
      </div>
    </div>
  )
}

export default NotFound