<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { Input, Selectfield, Commonbutton} from '../index'
=======
import React, { useEffect, useState, useId } from 'react'
import { Input, Selectfield, Commonbutton, Expenses } from '../index'
>>>>>>> 84232ce46d07d9bdbdb81ebe58ee396311f34592
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { update_expense, addexpense } from '../../contexts/expenseslice'
import expense_object from '../../appwrite/getdata'
<<<<<<< HEAD
=======
import { monthsnames } from '../essentials/currentDMY_Exp'
>>>>>>> 84232ce46d07d9bdbdb81ebe58ee396311f34592
import { ID } from 'appwrite'
function Expenseform({
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

  const [imageurl, setimageurl] = useState(null);
  const setvalues = () => {
    setValue('Date', editdetails ? editdetails.Year + '-' + editdetails.Month + '-' + editdetails.Day : '')
    setValue('category', editdetails?.category || "Food")
    setValue('Desc', editdetails?.Desc || "")
    setValue('Amount', editdetails?.Amount || "")
    setValue('image', editdetails?.featuredimage || "")
    setValue('Method', editdetails?.Method || "Cash")
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
    const [year,month,day] = data.Date.split("-")
    
    delete (data.Date)
    if (editdetails) {
      
      if(user.$id === "Guest"){
        delete (data.image);
        const updateobject = { userid: editdetails.userid, $id: editdetails.$id, ...data, Day:day, Month: month, Year: year }
        dispatch(update_expense(updateobject))
      }
      else{
      const file = data.image[0] ? await expense_object.uploadfile(data.image[0]) : undefined;
      //deleting previous uploaded image
      if (editdetails.featuredimage) {
        expense_object.deletefile(editdetails.featuredimage)
      }
      const updatepostresponse = await expense_object.updatedocument(editdetails.$id, { ...data, featuredimage: file ? file.$id : undefined,Day: day, Month: month, Year: year })
    
      if (updatepostresponse) {
        delete (data.image);
        const updateobject = { userid: editdetails.userid, $id: editdetails.$id, ...data, Day:day, Month: month, Year: year }

        dispatch(update_expense(updateobject))
      }
      seteditdetails(null)
    }
  }
    else {
      if(user.$id === "Guest"){
        delete (data.image); // image is uploaded so deleting it from data to not have unnecessary property
        const createobject = { userid: 'Guest', $id: ID.unique(), ...data, Amount: data.Amount, Day:day, Month: month, Year: year }
        dispatch(addexpense(createobject))
      }
      else{
      const file = data.image[0] ? await expense_object.uploadfile(data.image[0]) : undefined;
      const createresponse = await expense_object.createdocument({ ...data, featuredimage: file ? file.$id : undefined, userid: user.$id ,Day:day, Month: month, Year: year})
      if (createresponse) {
        delete (data.image); // image is uploaded so deleting it from data to not have unnecessary property
        const createobject = { userid: user.$id, $id: createresponse.$id, ...data, Amount: data.Amount, Day:day, Month: month, Year: year }
        dispatch(addexpense(createobject))
       
        
      }
    }
    setMonth(month)
    setYear(year)
    setvalues();
    }
  }

  return (
    <>
      <section className={`${viewstate ? 'flex ' : 'hidden'}  fixed justify-center inset-0 items-center  w-full h-full z-50`}>
        <div className={`text-xs  relative  mx-3 border-2 border-double  border-amber-500 max-h-screen w-full overflow-auto lg:w-3/4 lg:max-w-3xl  sm:mx-5 sm:text-base`}>
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
                    options={['Fuel', 'Food', 'Travel', 'Hotel','Bill / Recharge', 'Other']}
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
                    {...register('Method', {
                      required: true,
                    })} />

                </div>
                <div className={'w-full md:ml-10 sm:w-3/4 md:w-1/2 bg-sky-200 border-2 border-blue-500 ' + ((editdetails != null && editdetails?.featuredimage != undefined) ? 'hidden' : '')}>
                 
                  <div className={'flex flex-col items-center '}>
                    <Input classname='w-full cursor-pointer  rounded-none' type='file' label='Add a Receipt' labelclassname=' font-bold text-center italic text-sm sm:text-lg' accept="image/png, image/jpg, image/jpeg, image/gif"  {...register('image', {
                      onChange: (e) => handleimage(e)
                    })} />
                    <Commonbutton text='Remove' type='' classname={'!px-1 !py-1 text-white bg-red-300 hover:bg-red-400 mb-3 ' + (imageurl?'':'hidden') }
                    onClick={()=>{setimageurl(null); setValue('image','')}}/>
                    <img src={imageurl} alt="uploadedimage" className={'w-3/4 h-52 outline-none border-none sm:w-2/4 ' + (imageurl == null ? 'hidden' : '')} 
                    />
                  </div>

                </div>
              </div>
              <div className='flex justify-end mt-5 '>

                <Commonbutton text={'Cancel'} onClick={() => {
                  setviewstate(false); if (editdetails) seteditdetails(null);
                  else setvalues(); setimageurl(null);
                }} 
                classname='bg-blue-500 mr-4  text-white hover:bg-blue-600 sm:!px-20' />

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