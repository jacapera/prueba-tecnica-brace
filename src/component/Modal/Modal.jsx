import React from 'react'
import { useDispatch } from 'react-redux';
import { setError, setIsModalOpen } from '../../redux/appSlice';

const Modal = ({ message }) => {

  const dispatch = useDispatch()
  const closeModal = () => {
    dispatch(setError(""))
    dispatch(setIsModalOpen(false))
  };

  return (
    <div className='flex h-full w-full fixed border-2 bg-zinc-900/90 inset-y-0 inset-x-0 items-center justify-center'>
      <div className='bg-white flex flex-col border-2 justify-center items-center p-20 w-auto h-28 rounded-lg'>
        <h1 className='text-blue-950 my-2 text-1xl'>{message}</h1>
      <button onClick={closeModal} className='rounded-lg my-2 p-3 text-white text-xl bg-red-600 w-min ' >Cerrar</button>
      </div>
  </div>
  )
}

export default Modal