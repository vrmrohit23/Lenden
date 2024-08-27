import React, { useEffect, useRef, useState } from 'react'
import { Input, Commonbutton, Selectfield } from './index'
import { useForm } from 'react-hook-form'
import queryobject from '../appwrite/Contact_pagequeries'
import Updatebox, { submission } from './dialogbox/Dialogbox/updatebox'
function Contact() {
  const [emailbutton, setemailbutton] = useState("copy")
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [updateboxmessage,setupdateboxmessage] = useState('update boxi')
  const emailclicked = async () => {
    setupdateboxmessage('copied to clipboard')
    
    try {
      const permissions = await navigator.permissions.query({ name: "clipboard-write" })
      if (permissions.state === "granted" || permissions.state === "prompt") {
        await navigator.clipboard.writeText('Lendenofficial01@gmail.com');
        setemailbutton('copied')
        submission()
      } else {
        throw new Error("Can't access the clipboard. Check your browser permissions.")
      }
    } catch (error) {
      alert('Error copying to clipboard:', error);
    }
  }

  // method for registering the query/help
  const querysubmit = (data) => {
    
    try {
      console.log({...data})
      queryobject.sendquery({ ...data })
        .then((response) => {
          if (response) {
            setupdateboxmessage('Query has been submitted')
            submission()
            setValue('name', '')
            setValue('email', '')
            // setValue('purpose','')
            setValue('message', '')
          }
        })

    } catch (error) {
      console.log('error in the contact page' + error)
    }
  }
  useEffect(() => {
    let state = true;
    setTimeout(() => {
      if (state) {
        setemailbutton('copy')
      }
    }, 2000);

    return () => {
      state = false;
    };
  }, [emailclicked])
  return (
    <>
      <section id='bannersection text-wrap'>
        <div className="bg-[url('https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] py-20 bg-cover flex items-center flex-col bg-center mb-20 px-4">

          <p className='text-4xl font-semibold tracking-widest text-center bg-slate-50 bg-opacity-20 sm:text-5xl sm:bg-opacity-10'>

            Feel free to <span className='text-purple-600  '>Contact us</span>

          </p>
        </div>
      </section>
      <Updatebox text={updateboxmessage}/>
      <section id='emailandform' >
        <div className='px-3 flex  flex-col lg:flex-row lg:justify-between sm:px-20'>
          <div className='flex  items-start mb-20 flex-col'>

            <h1 className='text-2xl sm:text-3xl font-semibold mb-10'>Mail us</h1>
            <div className='border-2 px-2 py-2 hover:border-sky-600 duration-200 flex flex-wrap sm:px-4 '>

              <p className='text-xl py-1 sm:text-2xl' >Email: Lendenofficial01@gmail.com </p>
              <Commonbutton text={emailbutton} classname=' text-xl text-slate-600 hover:border-yellow-600 hover:text-black hover:shadow-md border-2 !py-1 !px-2 !rounded-none ml-2 sm:ml-5 sm:text-2xl' onClick={emailclicked} ></Commonbutton>
            </div>
          </div>
          <div className='flex justify-center'>
            <p className='text-4xl mb-20 lg:mb-0'>OR</p>
          </div>

          {/* form section */}

          <div className='w-full sm:w-2/3 lg:w-1/3'>
            <h1 className='text-2xl font-semibold mb-10 sm:text-3xl'>Fill this form</h1>
            <form onSubmit={handleSubmit(querysubmit)}>
              <Input label="Name" placeholder="Your Name" classname=" w-full" type="text" {...register('Name', {
                required: 'This field must be filled'
              })} />
              {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
              <Input label="Email" placeholder="Email" classname=" w-full" type="text" {...register('Email', {
                required: 'This field must be filled',
                validate: {
                  pattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid one,eg.@gmail.com",
                }
              })} />
              {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
              <Selectfield label="Purpose" options={['Complaint', 'Bug or Errors', 'Experience', 'Suggestion/Recommendations']} classname=" w-full px-4" type="text" {...register('Purpose', {

              })} />
              {errors.purpose && <p className='text-red-600'>{errors.purpose.message}</p>}
              <div>
                <label htmlFor="message" className='font-semibold'>Your message</label>
                <textarea id='message' placeholder="Type your message..." className="outline-none border-2 w-full mb-5 px-4 py-1 mt-2 focus:border-blue-600 h-40" {...register('Message', {
                  required: 'This field must be filled'
                })} />
              </div>
              {errors.message && <p className='text-red-600'>{errors.message.message}</p>}
              <Commonbutton classname='w-full bg-blue-600 text-white mb-12 hover:bg-blue-700 hover:shadow-lg' />
            </form>
          </div>
        </div>
      </section>

    </>
  )
}

export default Contact