import React, { useRef,useState } from 'react'
import {  NavLink,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout as locallogout } from '../../contexts/authslice'
import authobject from '../../appwrite/authenticate'
import { reset_lendings } from "../../contexts/lendingsSlice";
import { reset_expenses } from "../../contexts/expenseslice";
import { Commonbutton } from '../index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@nextui-org/react'
function Header() {
  const authstatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userdata)
  const [showProfileBox,setshowProfileBox] = useState(false);
  
  let ulref = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const togglenavbar = () => {
    if (window.innerWidth < 770) {
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
      navigate('/') 
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
      <nav className="bg-gray-800 p-4 shadow-lg flex  justify-between ">
        <button className='text-white md:hidden text-2xl  z-10' onClick={togglenavbar} > 
        <FontAwesomeIcon icon="fa-solid fa-bars-staggered" />
        </button>
        

          <ul className=" space-x-0 pt-4 pr-6 top-10 md:flex md:space-x-4 md:items-center md:w-auto md:pr-0 md:pt-0 bg-gray-800 md:static  md:h-auto   absolute w-screen h-screen  duration-500 " style={{ left: '-100vw' }} ref={ulref}>
            {headerlinks.map((option) => option.status ? (
              <li key={option.value} className='hover:bg-gray-700 mb-2 duration-200 sm:mb-0' onClick={togglenavbar}>
                <NavLink to={option.path} className={({ isActive }) => (isActive ? 'text-orange-600 font-bold  ' : 'text-white outline-none') + " text-lg  "}>
                  <div className=' py-1 px-2'>{option.value}</div>
                </NavLink>
               
              </li>
              
            ) : null)}
           
          </ul>
        {authstatus &&
        <>
          <div className=''>
          <Avatar className='text-3xl hover:cursor-pointer' onClick={()=>setshowProfileBox((prev)=>!prev)} name={userData.name?.charAt(0)}/>
          <div className={'absolute  right-3 p-4 rounded-lg bg-gray-800 '+ (showProfileBox?'':'hidden')}>
          

          <p className='text-white font-bold mb-2'>{userData.name}</p>
          <Commonbutton text='Logout'  classname='!py-0 !rounded-none   !px-2 text-lg pb-2 !text-white  bg-red-500 duration-200' onClick={acclogout} />
            </div>
          </div>
          
            </>
            }
      </nav>
    </header>
  )
}

export default Header