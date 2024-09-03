import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Modalbox({show = false,setshow,details}) {
  return (
    <div className={'fixed flex inset-0 justify-center w-full h-full items-center bg-black bg-opacity-60 z-50 ' + (show?'':'hidden')}>
      <div className=' relative overflow-auto bg-slate-950  w-11/12 max-w-xl rounded-xl shadow-lg border-2 border-gray-800'>

        <div className='flex items-center justify-between'>

        <p className='text-white my-5 mx-5 py-1 px-3 text-xl font-bold italic tracking-wide'>Note </p>
        <button className=' bg-gray-800 text-white  rounded-lg my-5 mx-5 py-1 px-3' onClick={()=>setshow(false)}><FontAwesomeIcon icon={"fa-solid fa-x"}/></button>
        </div>
      <hr />
      <div className='px-4 py-4 sm:px-10 sm:py-10'>

      <textarea name="" id="" className=' h-44  rounded-xl border-2 border-gray-700 w-full p-3 bg-transparent focus:outline-none   text-slate-300 sm:h-96' value={details} readOnly></textarea>
      </div>
  
      </div>

      </div>
  )
}

export default Modalbox