import React from 'react'
import { Link } from 'react-router-dom'
import {Slideshow} from '../components/index'
function Home() {
  
  return (
    <div>
      {/*The main banner section here */}   
      <Slideshow/>
      {/*The quotes starts here section here */}
      <div className='flex-wrap  mx-5 py-10 border-2 border-lime-600 rounded-lg flex  justify-center mb-20  sm:mx-10 sm:px-10  lg:justify-between lg:px-20 lg:py-20 lg:mx-20 '>
        <div className=' px-2 py-3 font-medium font-serif text-xl bg-sky-100 rounded-md  mb-4 mx-5 sm:mx-4 transition-shadow duration-300 hover:shadow-lg  hover:shadow-gray-400 sm:text-2xl sm:px-8 sm:py-8 lg:mx-2  lg:mb-4'><p className='mb-3 text-center'>"Money is a tool. <br />Used propely it makes something beautiful;<br />
          Used wrong,<br /> it makes a mess!"</p> 
          <p className='text-center font-semibold'>--  Bradley Vinson</p>
        </div>
        <div className=' px-2  py-3 font-medium font-serif text-xl bg-sky-100 rounded-md  mb-4 mx-5 sm:mx-4     transition-shadow duration-300 hover:shadow-lg  hover:shadow-gray-400 sm:text-2xl sm:px-8 sm:py-8 lg:mx-2 lg:mb-4'><p className='mb-3 text-center'>"You can make money <br /> two ways, <br />make more or <br />spend less."
        </p>
          <p className='text-center font-semibold'>--  John Hope Bryant</p>
        </div>
        <div className=' px-2 py-3 font-medium font-serif text-xl bg-sky-100 rounded-md   mx-5 sm:mx-4 sm:text-2xl transition-shadow duration-300 hover:shadow-lg  hover:shadow-gray-400 sm:px-8 sm:py-8 lg:mx-2 lg:mb-4'><p className='mb-3 text-center'>"Money moves from <br /> those who do not<br />manage it to those <br />who do."
        </p>
          <p className='text-center font-semibold'>--  Dave Ramsey</p>
        </div>
      </div>
      {/*The 2nd small banner section starts here */}
      <div className='bg-gradient-to-br from-orange-500 to-slate-400  flex flex-col items-center p-4 mb-20 sm:p-10 '>
      <div className='mb-8'>
          <p className='text-3xl  text-gray-800  border-2  px-4 py-3 border-s-8  border-sky-100  font-serif sm:text-4xl tracking-wide sm:px-10 sm:tracking-widest'>Money is important why not  manage it professionally?</p>
        </div>
        <div className=' '>
          <p className='text-3xl  text-yellow-900 bg-white   rounded-lg p-3  drop-shadow-2xl tracking-widest sm:text-4xl sm:wide'>Right</p>
        </div>
      </div>
      {/*The  expenses banner starts here */}
        {/* 1. banner is this */}
      <div className="bg-[url('https://images.pexels.com/photos/3943729/pexels-photo-3943729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]  mx-5 p-5  bg-center bg-cover  flex flex-col items-center mb-10 lg:p-20 lg:mx-20  sm:mx-10 sm:p-10">
        <div className='mb-12 py-4 backdrop-blur-sm text-center '>
          <span className='text-4xl text-rose-600  sm:p-3 sm:text-5xl'>Manage and Review expenses here</span>
        </div>
        <Link to={'/expenses'} className='p-3 bg-white rounded-lg text-2xl hover:bg-emerald-500 hover:text-white duration-500 text-center'>Go to My Expenses</Link>
      </div>
      <hr />
        {/* 2. banner is this */}
      <div className="bg-[url('https://images.pexels.com/photos/251287/pexels-photo-251287.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]  mx-5 p-5  bg-center bg-cover  flex flex-col items-center mb-10 lg:p-20 lg:mx-20 sm:mx-10 sm:p-10">
      <div className='mb-12 py-4 backdrop-blur-sm text-center rounded-lg'>
          <span className='text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-cyan-500   sm:p-3 sm:text-5xl'>Manage and Review the Lendings here</span>
        </div>
        <Link to={'/lendings'} className='p-3 bg-white rounded-lg text-2xl hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white duration-300 text-center'>Go to My Lendings</Link>
      </div>
    </div>
  )
}

export default Home