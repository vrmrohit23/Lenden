import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Commonbutton, Input_Pass_field } from './index'
import  authobject from '../appwrite/authenticate'
import { login as locallogin } from '../contexts/authslice'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [error, seterror] = useState(null)
  const Guestlogin = async () => {
    seterror(null)
    try {
      dispatch(locallogin({ $id: 'Guest' }))
      navigate('/')
    }
    catch (error) {

    }
  }
  const loginhandle = async (data) => {
    seterror(null)
    try {
      const response = await authobject.login(data)
      if (response) {
        console.log(response)
        const userdata = await authobject.getacc()
        if (userdata) {

          dispatch(locallogin(userdata))

        }
        navigate('/')
      }
      else {
        // console.log('not logged in')
        seterror("Invalid Email or Password")
      }
    } catch (error) {
      seterror(error.message)
    }
  }
  return (
    <div className='flex items-center justify-center w-full my-20 '>
      <div className=' bg-gray-100 rounded-xl p-3 border border-black/10 sm:p-10 mx-2'>
      
        <h2 className='text-bold text-2xl text-center mr-2'>Sign in to your account</h2>

        {error && <p className='text-red-600 text-center mt-3'>{error}</p>}
        <form onSubmit={handleSubmit(loginhandle)} className='mt-8 mb-5'>

          <div className=''>
            <Input
              label='Email: '
              placeholder='Enter you email'
              type='email'
              classname='inline-block w-full '
              {...register('email', {
                required: true,
                validate: {
                  pattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input_Pass_field
              classname=' w-full '
              {...register('password', {
                required: 'field cannot be empty',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
                }
              })}
            />

            {errors.password && <p className='text-red-700 font-semibold '>{errors.password.message}</p>}
          </div>
          <Commonbutton
            text='Login'
            children='Sign In'
            type='submit'
            classname='bg-blue-600 text-white w-full hover:bg-blue-700 mt-8'
          />
        </form>
        <div className='text-center'>
          <Link to={'/signup'} className='font-semibold text-blue-500 underline'>Create a account &nbsp;/ &nbsp; Sign Up</Link>
        </div>
        <div>
          <Commonbutton text={<div>
            <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /> Guest
          </div>}
            classname='!px-4 !py-2 bg-gray-800 font-bold text-emerald-400 w-full hover:bg-blue-700 mt-8 '
            onClick={() => Guestlogin()}
          />

        </div>
      </div>
    </div>
  )
}

export default Login