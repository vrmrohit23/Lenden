import React, { useEffect, useState, useId } from 'react'
import { Input, Selectfield, Commonbutton, Expenses } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { update_expense, addexpense } from '../../contexts/expenseslice'
import expense_object from '../../appwrite/getdata'
import { ID } from 'appwrite'
import { thisday, thismonth, thisyear } from '../essentials/currentDMY_Exp'
function Expenseform({
  viewstate,
  setviewstate,
  editdetails,
  seteditdetails
}) {
  const dispatch = useDispatch();
  const user = useSelector(State => State.auth.userdata)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const [imageurl, setimageurl] = useState(null);
  const setvalues = () => {
    setValue('Date', editdetails ? editdetails.Year + '-' + editdetails.Month + '-' + editdetails.Day : '')
    setValue('category', editdetails?.category || "Food")
    setValue('Desc', editdetails?.Desc || "")
    setValue('Amount', editdetails?.Amount || "")
    setValue('image', editdetails?.featuredimage || "")
    setValue('Payment-Method', editdetails?.Payment_Method || "Cash")
    console.log(editdetails?.featuredimage)
    if (editdetails?.featuredimage) {
      setimageurl(documentobject.getfilepreview(editdetails.featuredimage))
    }
  }
  useEffect(() => {
    setvalues();

  }, [editdetails])

  const handleimage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setimageurl(URL.createObjectURL(file))
    }
    else {
      setimageurl(null)
    }
  }


  // form submission function
  const formsubmit = async (data) => {
    setviewstate(false); setimageurl(null);
    data.Amount = Number.parseInt(data.Amount);
    let datevariables = data.Date.split("-")
    delete (data.Date)
    if (editdetails) {
      const file = data.image[0] ? await expense_object.uploadfile(data.image[0]) : undefined;
      //deleting previous uploaded image
      if (editdetails.featuredimage) {
        expense_object.deletefile(editdetails.featuredimage)
      }
      const updatepostresponse = await expense_object.updatedocument(editdetails.$id, { ...data, featuredimage: file ? file.$id : undefined,Day: datevariables[2], Month: datevariables[1], Year: datevariables[0] })

      if (updatepostresponse) {
        delete (data.image);
        const updateobject = { userid: editdetails.userid, $id: editdetails.$id, ...data, Day: datevariables[2], Month: datevariables[1], Year: datevariables[0] }

        dispatch(update_expense(updateobject))
      }
      seteditdetails(null)
    }
    else {
      const file = data.image[0] ? await expense_object.uploadfile(data.image[0]) : undefined;

      const createresponse = await expense_object.createdocument({ ...data, featuredimage: file ? file.$id : undefined, userid: user.$id })
      if (createresponse) {
        delete (data.image);
        const createobject = { userid: user.$id, $id: createresponse.$id, ...data, featuredimage: file ? file.$id : undefined }

        data.Amount = Number.parseInt(data.Amount);
        let datevariables = data.Date.split("-")
        delete (data.Date)

        const createobject1 = { userid: user.$id, $id: ID.unique(), ...data, Amount: data.Amount, Day: datevariables[2], Month: datevariables[1], Year: datevariables[0] }
        dispatch(addexpense(createobject1))
        // }
      }
    }
  }

  return (
    <>
      <section className={`${viewstate ? 'flex ' : 'hidden'}  fixed justify-center inset-0 items-center  w-full h-full z-50`}>
        <div className={`text-xs  relative  mx-3 border-2 border-double  border-amber-500 max-h-screen w-full overflow-auto lg:w-3/4 lg:max-w-3xl  sm:mx-5 sm:text-base`}>


          {/* <div className='bg-gradient-to-r  from-red-400 to-pink-300 px-2 py-2  sm:px-20 sm:py-10'>
          <div className='text-center '><h1 className='bg-white text-xl font-semibold text-blue-500 border-2 border-blue-500 border-dashed shadow-lg px-4 py-2 sm:text-3xl'>Add a new expense or Edit existing one</h1></div>
        </div> */}
          <form onSubmit={handleSubmit(formsubmit)}>
            <div className='bg-white px-2 pt-4 pb-2 sm:px-10 sm:pb-5 sm:pt-10'>
              <div className='flex flex-col md:flex-row items-center'>
                <div className='w-full bg-sky-200 px-4 py-4 border-2 border-blue-500 sm:w-3/4  lg:w-2/4 mb-5 md:mb-0'>

                  <Input
                    classname=' rounded-none font-semibold '


                    type='date'
                    placeholder='eg.2020'
                    label='Date'
                    labelclassname=' font-semibold  '
                    {...register('Date', {
                      required: true,
                    })} />


                  <Selectfield
                    label='Category'
                    options={['Fuel', 'Food', 'Travel', 'Hotel', 'Other']}
                    classname='w-full rounded-none text-center font-semibold  tracking-wide'
                    {...register('category', {
                      required: true,
                    })} />
                  <label htmlFor="textarea" className='font-semibold '>Note</label>
                  <textarea name="" id="textarea" className='border-2 w-full mt-2 pt-2 px-4 outline-none focus:border-blue-600' rows="3" placeholder='if you wanna add a note' {...register('Desc', {

                  })}></textarea>
                  <Input classname=' w-full rounded-none' type='number' label='Amount' labelclassname=' font-semibold mt-4' placeholder='Enter Amount in rs ' {...register('Amount', {
                    required: true,
                  })} />
                  <Selectfield
                    label='Payment-Method'
                    options={['Cash', 'Credit-Card', 'Borrowings', 'Debit-Card', "Google Pay/Paytm"]}
                    classname='w-full rounded-none text-center font-semibold  tracking-wide'
                    {...register('Payment_Method', {
                      required: true,
                    })} />

                </div>
                <div className={'w-full md:ml-10 sm:w-3/4 md:w-1/2 bg-sky-200 border-2 border-blue-500 ' + ((editdetails != null && editdetails?.featuredimage != undefined) ? 'hidden' : '')}>
                  <div>
                    <p className='font-bold text-xl tracking-wide text-center'>Upload &nbsp; a &nbsp;well lit image</p>
                    <div className='flex justify-center mt-4'>
                      <p>eg.</p>
                      <img src="https://qph.cf2.quoracdn.net/main-qimg-6216726e9c5ac841aa04a037432e3a37.webp" alt="" className='w-1/2 hover:scale-150 sm:w-1/3' />
                    </div>
                  </div>
                  <div className={'flex flex-col items-center '}>
                    <Input classname='w-full   rounded-none' type='file' label='file' labelclassname=' font-semibold  ' accept="image/png, image/jpg, image/jpeg, image/gif"  {...register('image', {
                      onChange: (e) => handleimage(e)
                    })} />
                    <img src={imageurl} alt="uploadedimage" className={'w-3/4 h-52 outline-none border-none sm:w-2/4 ' + (imageurl == null ? 'hidden' : '')} />
                  </div>

                </div>
              </div>
              <div className='flex justify-end mt-5 '>

                <Commonbutton text={'Cancel'} onClick={() => {
                  setviewstate(false); if (editdetails) seteditdetails(null);
                  else setvalues(); setimageurl(null);
                }} classname='bg-blue-500 mr-4  text-white hover:bg-blue-600 sm:!px-20' />

                <Commonbutton text={editdetails ? 'Update' : 'ADD'} type='submit' classname='bg-blue-500 text-white hover:bg-blue-600 sm:!px-20' />
                <button type='submit'></button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Expenseform