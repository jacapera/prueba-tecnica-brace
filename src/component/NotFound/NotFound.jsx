import React from 'react'
import { useSelector } from 'react-redux'
import { selectError, selectStatus } from '../../redux/appSlice'

const NotFound = () => {

  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

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
          (error !== "" || status === 429) &&
            <h1 className={`
            text-2xl
            text-white
            font-bold
            md:text-2xl
            `}>{error}</h1>
        }
      </div>
    </div>
  )
}

export default NotFound