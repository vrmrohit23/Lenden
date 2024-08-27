import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout as locallogout } from '../../contexts/authslice'
import authobject from '../../appwrite/authenticate'
import { Commonbutton } from '../index'
function Header() {
  const authstatus = useSelector((state) => state.auth.status)
  const [theme, settheme] = useState('dark')
  let ulref = useRef();
  const dispatch = useDispatch()
  const togglenavbar = () => {
    if (window.innerWidth < 640) {
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
    try {
      authobject.logout().then((response) => {
        if (response) {
          localStorage.removeItem('token'); 
          dispatch(locallogout())
        }
      })
    } catch (error) {
      console.log('error in Header logout ' + error)
    }

  }
  return (
    <header className='sticky top-0 z-30'>

      <nav className="bg-gray-800 p-4 shadow-lg sm:flex  justify-between ">
     
        <button className='text-white sm:hidden ' onClick={togglenavbar} > <i class="fa-solid fa-bars-staggered " style={{color:'white', fontSize:'28px'}}></i></button>
        {/* <div className=' ' > */}

          <ul className=" space-x-0 pt-4 pr-6 sm:flex sm:space-x-4 sm:items-center sm:w-auto sm:pr-0 sm:pt-0 bg-gray-800 sm:static  sm:h-auto   absolute w-screen h-screen  duration-500 " style={{ left: '-100vw' }} ref={ulref}>
            {headerlinks.map((option) => option.status ? (
              <li key={option.value} className='hover:bg-gray-700 mb-2 duration-200 sm:mb-0' onClick={togglenavbar}>
                <NavLink to={option.path} className={({ isActive }) => (isActive ? 'text-orange-600 font-bold  ' : 'text-white outline-none') + " text-lg  "}>
                  <div className=' py-1 px-2'>{option.value}</div>
                </NavLink>
               
              </li>
              
            ) : null)}

          </ul>
        {/* </div> */}


        {authstatus &&
          <Commonbutton text='Logout' classname='!py-1 sm:block hidden !px-2 text-lg !text-white  hover:bg-red-500 !rounded-none duration-200' onClick={acclogout} />}
      </nav>
    </header>
  )
}

export default Header