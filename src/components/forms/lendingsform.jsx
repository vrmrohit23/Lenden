import React, { useEffect, useState, useId } from 'react'
import { Input, Selectfield, Commonbutton, Expenses } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updatelending, addlending } from '../../contexts/lendingsSlice'
import documentobject from '../../appwrite/getdata'
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




  //   const [imageurl, setimageurl] = useState(null);
  //   const setvalues = ()=>{
  //     setValue('Day', editdetails?.Day || thisday)
  //     setValue('Month', editdetails?.Month || setmonthlocal(thismonth))
  //     setValue('Year', editdetails?.Year || thisyear)
  //     setValue('Purpose', editdetails?.Purpose || "")
  //     setValue('Borrower', editdetails?.Borrower_or_Lender || "")
  //     setValue('Amount', editdetails?.Amount || "")
  //     // setValue('image', editdetails?.featuredimage || "")
  //     setValue('Method', editdetails?.Method || "Cash")
  //     // if (editdetails?.featuredimage) {
  //     //   setimageurl(documentobject.getfilepreview(editdetails.featuredimage))
  //     // }
  //   }
  //   useEffect(() => {
  //     setvalues();

  //   }, [editdetails])

  //   const handleimage = (e) => {
  //     const file = e.target.files[0]
  //     if (file) {
  //       setimageurl(URL.createObjectURL(file))
  //     }
  //     else {
  //       setimageurl(null)
  //     }
  //   }


  // form submission function
  const formsubmit = async (data) => {
    setviewstate(false);
    // setimageurl(null);

    // if (editdetails) {
    //   // const file = data.image[0] ? await documentobject.uploadfile(data.image[0]) : undefined;
    //   // deleting previous uploaded image
    //   // if (editdetails.featuredimage) {
    //   //   documentobject.deletefile(editdetails.featuredimage)
    //   // }
    //   // const updatepostresponse = await documentobject.updatedocument(editdetails.$id, { Status:editdetails.Status,...data, featuredimage: file ? file.$id : undefined })

    //   // if (updatepostresponse) {
    //     delete (data.image);
    //     // const updateobject = { userid: editdetails.userid, $id: editdetails.$id, ...data, featuredimage: file ? file.$id : undefined,Status:editdetails.Status }
    //     const updateobject1 = { userid: editdetails.userid, $id: editdetails.$id, ...data,Amount:Number.parseInt(data.Amount) }
    //     dispatch(updatelending(updateobject1))
    //   // }
    //   seteditdetails(null)
    // }
    // else {
    // const file = data.image[0] ? await documentobject.uploadfile(data.image[0]) : undefined;

    // const createresponse = await documentobject.createdocument({ ...data, featuredimage: file ? file.$id : undefined,userid:user.$id })
    // if (createresponse) {
    delete (data.image);
    // const createobject = {userid:user.$id, $id: createresponse.$id, ...data, featuredimage: file ? file.$id : undefined }

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
                    {/* <p>-</p> */}
                    {/* <Selectfield label='Month' value = {monthlocal}  options={['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']} classname='w-28 rounded-none text-center font-semibold  tracking-wide' 
                  {...register('Month', {
                  required: true,
                  onChange:(e) => {setmonthlocal(e.target.value); console.log("monthlocal changing");}
                }
                )}
                 /> */}
                    {/* <span>-</span> */}
                    {/* <Input 
                  classname='w-24 rounded-none font-semibold lg:w-28'  
                  maxLength='4' 
                  type='number' 
                  placeholder='eg.2020' 
                  label='Year' 
                  labelclassname=' font-semibold  ' 
                  {...register('Year', {
                    required: true,
                  })} /> */}
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

                  <Input classname=' w-full rounded-none' label='Borrwer' labelclassname=' font-semibold ' placeholder='Money given to' {...register('Borrower', {
                    required: true,
                  })} />
                  <Input classname=' w-full rounded-none' type='number' label='Amount' labelclassname=' font-semibold ' placeholder='Enter Amount in rs ' {...register('Amount', {
                    required: true,
                  })} />


                </div>

                {/* <div className='w-full md:ml-10 sm:w-3/4 md:w-1/2'>
                <div>
                  <p className='font-bold text-xl tracking-wide text-center'>Upload &nbsp; a &nbsp;well lit image</p>
                  <div className='flex justify-center mt-4'>
                    <p>eg.</p>
                    <img src="https://qph.cf2.quoracdn.net/main-qimg-6216726e9c5ac841aa04a037432e3a37.webp" alt="" className='w-1/2 hover:scale-150 sm:w-1/3' />
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <Input classname='w-full  rounded-none' type='file' label='file' labelclassname=' font-semibold  ' accept="image/png, image/jpg, image/jpeg, image/gif"  {...register('image', {
                    onChange: (e) => handleimage(e)
                  })} />
                  <img src={imageurl} alt="uploadedimage" className={'w-3/4 h-52 outline-none border-none sm:w-2/4 ' + (imageurl == null?'hidden':'')} />
                </div>

              </div> */}
              </div>
              <div className='flex justify-end mt-5 '>

                <Commonbutton text={'Cancel'} onClick={() => {
                  setviewstate(false);
                  //   if(editdetails)seteditdetails(null);
                  //     else setvalues(); setimageurl(null)
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