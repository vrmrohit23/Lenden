
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header and footer/Header';
import Footer from './components/Header and footer/footer';
import authobject from './appwrite/authenticate';
import { login, logout, setusers } from './contexts/authslice';
import { setexpenses } from './contexts/expenseslice';
import documentobject from './appwrite/getdata';

const App = () => {
  const [loading, setloading] = useState(true)
  const userstatus = useSelector((state)=>state.auth.status)
  const dispatch = useDispatch()
  const checklogin = ()=>{
    authobject.getacc().then((response) => {
      if (response) {
        dispatch(login(response))
        console.log(response)
        documentobject.listdocuments(response.$id)
          .then((resolve) => {
            if (resolve) {
              dispatch(setexpenses(resolve.documents))
              }})
            }
            else{
              if(userstatus){
              localStorage.removeItem('token');
              dispatch(logout())
              }
            }
          })
          .catch((err) =>
            console.log('Error occur : ', err)
        )
        .finally(()=>{
            setloading(false)
          })
     
  }
  useEffect(() => {
    try{
    if(localStorage.getItem('token') != null){
      setloading(false)
      let token = localStorage.getItem('token')
      console.log(token)
      dispatch(login(token));
      checklogin();
    }
    else{
      checklogin();
    }
  }
    catch(err){
      console.log('Error Occured : ',err)
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
