import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout as locallogout } from '../../contexts/authslice'
import authobject from '../../appwrite/authenticate'
import { reset_lendings } from "../../contexts/lendingsSlice";
import { reset_expenses } from "../../contexts/expenseslice";
import { Commonbutton } from '../index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Header() {
  const authstatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userdata)
  
  let ulref = useRef();
  const dispatch = useDispatch()
  const togglenavbar = () => {
    if (window.innerWidth < 770) {
      console.log("running");
      if (ulref.current.style.left === "-100vw") { ulref.current.style.left = "0vw"; }
      else { ulref.current.style.left = "-100vw"; ; }
    }
  }
  const headerlinks = [
    {
      value: 'Home',
      path: '/',
      status: true
    },

    {
      value: 'My Expenses',
      path: '/expenses',
      status: authstatus
    },
    {
      value: 'My Lendings',
      path: '/lendings',
      status: authstatus
    },



    {
      value: 'Login',
      path: '/login',
      status: !authstatus
    },

    {
      value: 'Contact',
      path: '/contact',
      status: true
    },
   

  ]

  const acclogout = async () => {
    if(userData?.$id == 'Guest'){
      dispatch(locallogout())
      dispatch(reset_lendings())
      dispatch(reset_expenses());
    }
    else{
    try {
      authobject.logout().then((response) => {
        if (response) {
          localStorage.removeItem('token'); 
          dispatch(locallogout())
          dispatch(reset_lendings())
          dispatch(reset_expenses());
        }
      })
    } catch (error) {
      console.log('error in Header logout ' + error)
    }

  }
}
  return (
    <header className='sticky top-0 z-30'>

      <nav className="bg-gray-800 p-4 shadow-lg md:flex  justify-between ">
     
        <button className='text-white md:hidden text-2xl' onClick={togglenavbar} > 
        <FontAwesomeIcon icon="fa-solid fa-bars-staggered" />
        </button>
        {/* <div className=' ' > */}

          <ul className=" space-x-0 pt-4 pr-6 md:flex md:space-x-4 md:items-center md:w-auto md:pr-0 md:pt-0 bg-gray-800 md:static  md:h-auto   absolute w-screen h-screen  duration-500 " style={{ left: '-100vw' }} ref={ulref}>
            {headerlinks.map((option) => option.status ? (
              <li key={option.value} className='hover:bg-gray-700 mb-2 duration-200 sm:mb-0' onClick={togglenavbar}>
                <NavLink to={option.path} className={({ isActive }) => (isActive ? 'text-orange-600 font-bold  ' : 'text-white outline-none') + " text-lg  "}>
                  <div className=' py-1 px-2'>{option.value}</div>
                </NavLink>
               
              </li>
              
            ) : null)}
            {authstatus && 
            <Commonbutton text='Logout' classname={'!py-1  !px-2 text-lg !text-red-600 font-bold  hover:bg- !rounded-none duration-200 md:hidden' } onClick={()=>{acclogout(); togglenavbar()}} />}
          </ul>
        {/* </div> */}


        {authstatus &&
          <Commonbutton text='Logout' classname='!py-1 md:block hidden !px-2 text-lg !text-white  hover:bg-red-500 !rounded-none duration-200' onClick={acclogout} />}
      </nav>
    </header>
  )
}

export default Header