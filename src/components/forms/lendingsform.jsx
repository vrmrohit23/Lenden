import React, { useEffect, useState, useId } from 'react'
import { Input, Selectfield, Commonbutton, Expenses } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { update_lending, addlending } from '../../contexts/lendingsSlice'
import lending_object from '../../appwrite/getlendingsdata'

function Lendingsform({
  viewstate,
  setviewstate,
  editdetails,
  seteditdetails,
  setMonth,
  setYear
}) {
  const dispatch = useDispatch();
  const user = useSelector(State => State.auth.userdata)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  // const [monthlocal,setmonthlocal] = useState(thismonth);

  const setvalues = () => {
    setValue('Date', editdetails ? editdetails.Year + '-' + editdetails.Month + '-' + editdetails.Day : '')
    setValue('Desc', editdetails?.Desc || "")
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
    data.category = 'Lending'
    data.Amount = Number.parseInt(data.Amount);
    const [year,month,day] = data.Date.split("-")
    delete (data.Date)
    if (editdetails) {
      if (user.$id === "Guest") {
        const updateobject = { userid: editdetails.userid, $id: editdetails.$id, ...data, Day:day, Month: month, Year: year, Repayments: editdetails.Repayments, Repayments_Objects: editdetails.Repayments_Objects }
        dispatch(update_lending(updateobject))
      }
      const updatepostresponse = await lending_object.updatedocument(editdetails.$id, { ...data, Day:day, Month: month, Year: year })
      if (updatepostresponse) {

        const updateobject = { userid: editdetails.userid, $id: editdetails.$id, ...data,Day:day, Month: month, Year: year, Repayments: editdetails.Repayments, Repayments_Objects: editdetails.Repayments_Objects }
        dispatch(update_lending(updateobject))
      }
      seteditdetails(null)
    }
    else {
      if (user.$id === "Guest") {
        const createobject = { userid: user.$id, $id: createresponse.$id, ...data, Amount: data.Amount,Day:day, Month: month, Year: year, Repayments: [], Repayments_Objects: [] }
        dispatch(addlending(createobject))
      }
      else {
        const createresponse = await lending_object.createdocument({ ...data, userid: user.$id, Day:day, Month: month, Year: year })
        if (createresponse) {
          const createobject = { userid: user.$id, $id: createresponse.$id, ...data, Amount: data.Amount,Day:day, Month: month, Year: year, Repayments: [], Repayments_Objects: [] }
          dispatch(addlending(createobject))
        }
      }
      setMonth(month)
      setYear(year)
      setvalues();
    }
  }

  return (
    <>
      <section className={`${viewstate ? 'flex ' : 'hidden'}  fixed justify-center inset-0 items-center  w-full h-full z-50 bg-black bg-opacity-40`}>
        <div className={`text-xs  relative  mx-3 border-2 border-double  border-amber-500 max-h-screen w-full overflow-auto md:w-3/5 lg:w-2/5  sm:mx-5 sm:text-base`}>

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
                    <Input classname=' rounded-none' type='date' label='Return (Expected)' labelclassname=' font-semibold ' placeholder='Enter Amount in rs ' {...register('Return', {
                      required: true,
                    })} />

                  </div>
                  <label htmlFor="textarea" className='font-semibold '>Description</label>
                  <textarea name="" id="textarea" className='border-2 w-full mt-2 pt-2 px-4 outline-none focus:border-blue-600' rows="3" placeholder='if you wanna add a note' {...register('Desc', {

                  })}></textarea>
                  <Selectfield
                    label='Method'
                    options={['Cash', 'Recharge/Bill', 'Paytm', 'Google Pay', 'Contribution']}
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
                  if (editdetails) seteditdetails(null);
                  else setvalues();
                }} classname='bg-blue-500 mr-4  text-white hover:bg-blue-600 sm:!px-20' />

                <Commonbutton text={
                  editdetails ? 'Update' : 'ADD'
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