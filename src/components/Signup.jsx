import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Commonbutton, Logo,Input_Pass_field } from './index'
import authobject from '../appwrite/authenticate'
import { login as locallogin } from '../contexts/authslice'
import { useForm } from 'react-hook-form'

function Signup() {
  const [error, seterror] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  let confirmingpassword = watch('password')
  const createacc = async (data) => {
    seterror("")
    try {
      const response = await authobject.createacc(data)
      if (response) {
        const userdata = await authobject.getacc()
        if (userdata) {
          dispatch(locallogin(userdata))
        }
        navigate('/')
      }
      else {
      }
    }
    catch (error) {
      seterror(error.message)
    }
  }
  return (
    <div className='mx-2 flex items-center justify-center  my-20 sm:mx-20'>
      <div className='  bg-gray-100 rounded-xl p-3 border border-black/10 sm:p-10'>
        {/* <div className='flex justify-center mb-4'>

          <Link to='/admin' className='text-xl font-serif hover:underline text-center text-blue-600 underline'>
            back to admin page
          </Link>
        </div> */}
        {/* <div className='mb-2 flex justify-center'>
          <span className='inline-block'>
            <Logo />
          </span>
        </div> */}
        <h2 className='text-bold text-2xl text-center mr-2'>Sign Up / Create Account</h2>



        {error && <p className='text-red-600 text-center mt-8'>{error}</p>}
        <form onSubmit={handleSubmit(createacc)}>
          <div className='  '>
            <Input
              labelclassname='mt-5'
              label='Name: '
              placeholder='Enter your full name'
              classname=" inline-block !mb-0 w-full"
              {...register('Name', {
                required: true
              })}
            />
            <Input
              labelclassname='mt-5'
              label='Email: '
              placeholder='Enter you email'
              type='email'
              name='password'
              classname='inline-block !mb-0 w-full'
              {...register('email', {
                required: true,
                validate: {
                  pattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            {errors.email && <p className='text-red-700 font-bold mt-2'>{errors.email.message}</p>}
            <Input_Pass_field
              labelclassname='mt-5'
              classname ='!mb-0 w-full'
              placeholder='Enter Password'
              
              
              {...register('password', {
                required: 'Password field cannot be empty',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
                }
              })}
            />
            {errors.password && <p className='text-red-700 font-bold mt-2'>{errors.password.message}</p>}
            <Input_Pass_field
              labelclassname='mt-5'
              label='Confirm Password: '
              
              
              classname=''
              {...register('confirmpassword', {
                required: 'confirm password cannot be empty',
                validate: (value) => value === confirmingpassword || 'required same password'
              })}
            />
            {errors.confirmpassword && <p className='text-red-700 font-bold mt-2'>{errors.confirmpassword.message}</p>}
            <Commonbutton
              children='Sign Up'
              type='submit'
              classname={'bg-blue-600 text-white w-full mt-6 hover:bg-blue-700'}

            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup