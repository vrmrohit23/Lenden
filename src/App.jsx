
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header and footer/Header';
import Footer from './components/Header and footer/footer';
import authobject from './appwrite/authenticate';
import { login, logout} from './contexts/authslice';

function App() {
  const [loading, setloading] = useState(true)
  const userstatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  // function for checking logged in user
  const checklogin = () => {
    authobject.getacc().then((response) => {
      if (response) {
        dispatch(login(response))
      }
      else {
        // this function will logout locally because on intial load we are having a dummy login using local storage if on the server there is no user logged in from this device.
        if (userstatus) {
          localStorage.removeItem('token');
          dispatch(logout())
        }
      }
    })
      .catch((err) =>
        console.log('Error occur : ', err)
      )
      .finally(() => {
        setloading(false)
      })
  }

  // useeffect for checking currently logged in user
  useEffect(() => {
    try {
      let token = localStorage.getItem('token')
      if (token != null) {
        setloading(false)
        dispatch(login(token));
        checklogin();
      }
      else {
        checklogin();
      }
    }
    catch (err) {
      console.log('Error Occured : ', err)
      setloading(false)
    }






  }, [])
  return loading ? (
    <div className='flex justify-center items-center h-screen flex-col'>

      <div className='rounded-full border-8 border-t-8 border-gray-500 border-t-blue-700 w-32 h-32 animate-spin'>
      </div>
      <div className='text-3xl animate-pulse mt-10'>Getting There</div>
    </div>
  ) // ':' is diffentiating between two return outputs
    : // :--> OR
    (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    )
};

export default App;
