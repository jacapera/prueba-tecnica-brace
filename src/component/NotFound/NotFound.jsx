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
        text-2xl
        text-white
        font-bold
        sm:text-4xl
      `}>{`${status} | Not Found`}</h1>
      <div>
        {
          (error !== "" || status ) &&
            <h1 className={`
            text-2xl
            text-white
            font-bold
            md:text-4xl
            `}>{error}</h1>
        }
      </div>
    </div>
  )
}

export default NotFound