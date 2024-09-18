import React,{useEffect, useRef, useState} from 'react'

let timeoutid1;
let timeoutid2;
let querysubmissionref; // variable for holding the reference
// function to show the diaglog box 
export let submission = ()=>{
  clearTimeout(timeoutid1)
  clearTimeout(timeoutid2)
  querysubmissionref.current.style.display = 'initial';
  querysubmissionref.current.style.display = 'initial';
  timeoutid1 = setTimeout(()=>{
   querysubmissionref.current.style.right = '-50px';
},100)
timeoutid2 =  setTimeout(()=>{
     querysubmissionref.current.style.display = 'none';
      querysubmissionref.current.style.right = '-470px';
},3000)

}
function Updatebox({text = ''}) {
    querysubmissionref = useRef()
    useEffect(()=>{
      return ()=>{
        clearTimeout(timeoutid1)
        clearTimeout(timeoutid2)
      }
    },[])
  return (
    <div className='fixed w-full duration-1000 shadow-md max-w-md min-w-96  bg-gray-800 text-white mx-20  text-2xl ' style={{right:'-470px', top:'100px'}} ref={querysubmissionref}><div className='flex '>
    <div className='flex items-center px-5  py-3 bg-green-800 text-white cursor-pointer font-bold'
  onClick={()=>{
    querysubmissionref.current.style.display = 'none';
  }}>X</div><p className='px-4 flex items-center py-1' >{text}</p></div>
  </div>  
  )
}
  
export default Updatebox