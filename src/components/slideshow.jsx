import React, { useEffect, useRef, useState } from 'react'
import {Commonbutton} from './index'
import { Link } from 'react-router-dom'
function Slideshow() {
   
    const [index,setindex] = useState(0);
    let timeoutid = useRef(null)
    
    function resettimeout(){
        if(timeoutid.current){
            clearTimeout(timeoutid.current)
        }
    } 
    // useEffect(()=>{
    //     resettimeout();
    //    timeoutid.current = setTimeout(()=>
    //         setindex((prev)=>
    //             prev === 2?0:prev+1
    //         )
    //      ,4000   
    // )
    // return ()=>{
    //     resettimeout();
    // }
    // },[index])




    return (
        <>
       
        
        <div className={'overflow-hidden  flex justify-center '} >
            <div className=' mx-5 mt-3 overflow-hidden shadow-lg sm:mx-7 sm:mt-5  lg:mx-10  rounded-2xl'>
        <div className={` flex ease-in-out w-full duration-1000 `} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}> {/*this is the parent slideshow div which controls the moves to the left and right*/}

            {/*This is the first Slide */}
            <div className=" text-wrap  pt-8 px-4 inline-block w-full  bg-[url('https://images.pexels.com/photos/316466/pexels-photo-316466.jpeg')]  bg-cover bg-no-repeat  shadow-lg  bg-center bg-opacity-30 flex-shrink-0 sm:px-20 sm:pt-16">
                <div className='w-full'>

                    <div className='mb-8 flex'>
                        <p className='text-3xl   text-orange-500  border-2 border-x-indigo-800 border-y-yellow-400  rounded-lg p-2 sm:p-3 sm:text-4xl'>Wanna track expenses ?</p>
                    </div>
                    <div className='mb-8 flex sm:mb-16'>
                        <p className='text-3xl  text-orange-500  border-2 rounded-lg p-2 border-x-red-600 border-y-cyan-600 sm:text-4xl sm:p-3'>Got tired of remembering lendings?</p>
                    </div>
                    <div className='mb-8 flex sm:mb-16'>
                        <p className='text-5xl  text-indigo-500  font-semibold rounded-lg p-3  sm:text-6xl'>Lenden <i className='text-slate-500 font-normal'>is here for you</i></p>
                    </div>
                </div>
            </div>
             {/*This is the second Slide */}
            <div className="text-wrap  sm:px-20 pt-8 px-4 sm:pt-16 inline-block w-full  bg-[url('https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-no-repeat  shadow-md  bg-center bg-opacity-30 flex-shrink-0">
                <div className='w-full'>
                    <div className='mb-8 flex'>
                        <p className='text-3xl backdrop-blur-sm border-b-purple-900 bg-opacity-30  text-white   bg-black border-b-4 border-opacity-80  rounded-lg p-2 sm:p-4 sm:text-4xl'>Trying out Free things don't hurt</p>
                    </div>
                    <div className='mb-16 flex'>
                        <p className='text-3xl    border-b-4 rounded-lg p-2 text-white bg-black border-b-orange-600 mb-8 bg-opacity-40 border-opacity-80 sm:text-4xl sm:p-4'>Give yourself a helping hand</p>
                    </div>
                    <div className='mb-8 flex sm:mb-16'>
                    <Link to={'/expenses'} className='p-2 bg-white rounded-lg text-3xl hover:bg-gradient-to-r from-green-500   font-semibold to-blue-500 hover:text-white duration-300 text-center sm:p-6'>Manage my Expenses</Link>
                    </div>
                </div>
            </div>
             {/*This is the third Slide */}
            <div className="text-wrap sm:px-20 pt-8 px-4 sm:pt-16 inline-block w-full bg-[url('https://images.pexels.com/photos/207456/pexels-photo-207456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-no-repeat  shadow-md  bg-center bg-opacity-30  flex-shrink-0">
                <div className='w-full'>

                    <div className='mb-8 flex'>
                        <p className='text-3xl  text-blue-600   bg-black bg-opacity-70 rounded-lg p-2 sm:p-4 sm:text-4xl'>Got something for us </p>
                    </div>
                    <div className='mb-24 flex '>
                        <p className='text-3xl  text-blue-600 bg-black bg-opacity-70  rounded-lg p-2  sm:p-4 sm:text-4xl'>Let us know</p>
                    </div>
                    <div className='mb-8 flex sm:mb-16'>
                    <Link to={'/contact'} className='px-2 py-3 bg-black bg-opacity-70 rounded-lg text-3xl hover:bg-gradient-to-r from-green-500  font-semibold to-blue-500 text-orange-700 hover:text-white duration-300 sm:py-6 sm:px-3 sm:text-5xl text-center'>Go to Contact Page</Link>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        <div className='text-center mb-20 mt-5'>
            <div className={`inline-block  w-10 mx-1 rounded-md duration-700  transition  cursor-pointer ${index == 0?"bg-slate-600 h-4":"bg-slate-300 h-3"}`} onClick={()=>setindex(0)}></div>
            <div className={`inline-block  w-10 mx-1 rounded-md duration-700 ease-in-out transition  cursor-pointer ${index == 1?"bg-slate-600 h-4":"bg-slate-300 h-3"}`} onClick={()=>setindex(1)}></div>
            <div className={`inline-block  w-10 mx-1 rounded-md duration-700 ease-in-out transition  cursor-pointer ${index == 2?"bg-slate-600 h-4":"bg-slate-300 h-3"}`} onClick={()=>setindex(2)}></div>

        </div>
        </>
        
    )
}

export default Slideshow