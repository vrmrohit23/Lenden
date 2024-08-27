import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setadminstatus } from '../contexts/authslice';
import { Commonbutton } from './index';
import Adminexpensesfilter from './essentials/adminexpensesfilter';

function Admin() {
  const [error, setError] = useState('');
  const loginStatus = useSelector((state) => state.auth.adminstatus);
  const navigate = useNavigate();
  let adminPass = useSelector((state) => state.auth.users);
  adminPass = adminPass[0].password;
  
  const passwordField = useRef(null);
  const dispatch = useDispatch();
  
  const adminLogin = () => {
    if (passwordField.current?.value === adminPass) {
      dispatch(setadminstatus());
      setError('');
    } else {
      setError('Password does not match');
    }
  };

  return (
    <div className='container mx-auto p-5'>
      {loginStatus ? (
        <>
          <div className='flex mb-10'>
            <div className='w-2/3 bg-white rounded-lg shadow-md p-5'>
              <p className='text-3xl mb-5 text-center'>Recent Expenses (Today's)</p>
              <div className='overflow-scroll h-40 border border-gray-300 rounded-lg p-3'>
                <CurrentDMY_Exp/>
              </div>
            </div>
            <div className='w-1/3'>
              <div className='border border-gray-300 rounded-lg p-5 mt-10'>
                <p className='text-3xl mb-5'>Create a New User Here</p>
                <Commonbutton
                  classname='bg-blue-600 text-white w-full text-xl hover:bg-blue-700'
                  text='Signup'
                  onClick={() => navigate('/signup')}
                />
              </div>
            </div>
          </div>
          <div>
            <p className='text-center text-3xl'>All Expenses</p>
          </div>
          <Adminexpensesfilter/>
        </>
       ) : (
        <div className='flex items-center justify-center h-screen'>
          <div className='border border-gray-300 rounded-lg p-10 bg-gray-100 shadow-md'>
            <p className='text-xl mb-5 text-orange-500 font-semibold'>Authenticate to continue</p>
            <div className='mb-5'>
              <span className='block mb-1'>Password:</span>
              <input type="password" ref={passwordField} className='outline-none border border-gray-300 rounded-md py-2 px-3 w-full' placeholder='Enter Password' />
            </div>
            {error && <p className='text-red-600 mb-5'>{error}</p>}
            <Commonbutton
              children='Sign In'
              onClick={adminLogin}
              classname='bg-blue-600 text-white w-full text-xl hover:bg-blue-700 py-2'
            />
          </div>
        </div>
      )} 
    </div>
  );
}

export default Admin;
