import React, { useEffect, useState, useId } from 'react'
import { Input, Selectfield, Commonbutton, Expenses } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { update_lending, addlending } from '../../contexts/lendingsSlice'
import lending_object from '../../appwrite/getdata'
import { ID } from 'appwrite'
import { thisday, thismonth, thisyear } from '../essentials/currentDMY_Exp'
function Lendingsform({
  viewstate,
  setviewstate,
  editdetails,
  seteditdetails
}) {
  const dispatch = useDispatch();
  const user = useSelector(State => State.auth.userdata)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  // const [monthlocal,setmonthlocal] = useState(thismonth);




  
    const setvalues = ()=>{
      setValue('Date', editdetails?editdetails.Year+'-'+editdetails.Month+'-'+editdetails.Day:'')
      setValue('Purpose', editdetails?.Purpose || "")
      setValue('Borrower_or_Lender', editdetails?.Borrower_or_Lender || "")
      setValue('Return', editdetails?.Return || "")
      setValue('Method', editdetails?.Method || "Cash")
      setValue('Amount', editdetails?.Amount || "")
    }
    useEffect(() => {
      setvalues();

    }, [editdetails])

  


  // form submission function
  const formsubmit = async (data) => {
    setviewstate(false);
    // if (editdetails) {
    //   // const updatepostresponse = await lending_object.updatedocument(editdetails.$id, { Status:editdetails.Status,...data})

    //   // if (updatepostresponse) {
    //     delete (data.image);
    //     // const updateobject = { userid: editdetails.userid, $id: editdetails.$id, ...data}
    //     const updateobject1 = { userid: editdetails.userid, $id: editdetails.$id, ...data,Amount:Number.parseInt(data.Amount) }
    //     dispatch(update_lending(updateobject1))
    //   // }
    //   seteditdetails(null)
    // }
    // else {

    // const createresponse = await lending_object.createdocument({ ...data,userid:user.$id })
    // if (createresponse) {
   
    // const createobject = {userid:user.$id, $id: createresponse.$id, ...data }

    data.Amount = Number.parseInt(data.Amount);
    let datevariables = data.Date.split("-")
    delete (data.Date)
    data.Return = data.Return

    const createobject1 = { userid: user.$id, $id: ID.unique(), ...data, Amount: data.Amount, Day: datevariables[2], Month: datevariables[1], Year: datevariables[0], Repayments: [] }
    dispatch(addlending(createobject1))
    // }
    // }
  }
  return (
    <>
      <section className={`${viewstate ? 'flex ' : 'hidden'}  fixed justify-center inset-0 items-center  w-full h-full z-50 bg-black bg-opacity-40`}>
        <div className={`text-xs  relative  mx-3 border-2 border-double  border-amber-500 max-h-screen w-full overflow-auto md:w-3/5 lg:w-2/5  sm:mx-5 sm:text-base`}>


          {/* <div className='bg-gradient-to-r  from-red-400 to-pink-300 px-2 py-2  sm:px-20 sm:py-5'>
            <div className='text-center '><h1 className='bg-white text-xl font-semibold text-blue-500 border-2 border-blue-500 border-dashed shadow-lg px-4 py-2 sm:text-3xl'>Add a new expense or Edit existing one</h1></div>
          </div> */}
          <form onSubmit={handleSubmit(formsubmit)}>
            <div className='bg-opacity-7 bg-gray-200 px-2 pt-4 pb-2 sm:px-10 sm:pb-5 sm:pt-10'>
              <div className=''>
                <div className='w-full  bg-sky-200 px-4 py-4 border-2 border-blue-500  mb-5 md:mb-0 sm:text-base'>
                  <div className='flex flex-wrap  justify-between items-center w-full '>
                    <Input
                      classname=' rounded-none font-semibold w-full'
                      type='date'
                      placeholder='eg.2020'
                      label='Date'
                      labelclassname=' font-semibold  '
                      {...register('Date', {
                        required: true,

                      })} />
                    <Input classname=' w-full rounded-none' type='date' label='Return (Expected)' labelclassname=' font-semibold ' placeholder='Enter Amount in rs ' {...register('Return', {
                      required: true,
                    })} />
                    
                  </div>

                  <label htmlFor="textarea" className='font-semibold '>Purpose</label>
                  <textarea name="" id="textarea" className='border-2 w-full mt-2 pt-2 px-4 outline-none focus:border-blue-600' rows="3" placeholder='if you wanna add a note' {...register('Purpose', {

                  })}></textarea>
                  <Selectfield
                    label='Method'
                    options={['Cash', 'Recharge/Bills', 'Paytm', 'Google Pay', 'Contribution']}
                    classname='w-full rounded-none text-center font-semibold  tracking-wide'
                    {...register('Method', {
                      required: true,
                    })} />

                  <Input classname=' w-full rounded-none' label='Borrower' labelclassname=' font-semibold ' placeholder='Money given to' {...register('Borrower_or_Lender', {
                    required: true,
                  })} />
                  <Input classname=' w-full rounded-none' type='number' label='Amount' labelclassname=' font-semibold ' placeholder='Enter Amount in rs ' {...register('Amount', {
                    required: true,
                  })} />


                </div>
              </div>
              <div className='flex justify-end mt-5 '>
                <Commonbutton text={'Cancel'} onClick={() => {
                  setviewstate(false);
                    if(editdetails)seteditdetails(null);
                      else setvalues(); setimageurl(null)
                }} classname='bg-blue-500 mr-4  text-white hover:bg-blue-600 sm:!px-20' />

                <Commonbutton text={
                  // editdetails ? 'Update' :
                  'ADD'
                } type='submit' classname='bg-blue-500 text-white hover:bg-blue-600 sm:!px-20' />
                <button type='submit'></button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Lendingsform