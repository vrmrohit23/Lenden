import React, { useEffect, useState,useId } from 'react'
import { Input, Selectfield, Commonbutton, Expenses } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateexpense, addexpense } from '../../contexts/expenseslice'
import documentobject from '../../appwrite/getdata'
import { ID } from 'appwrite'
import { thisday,thismonth,thisyear } from '../essentials/currentDMY_Exp'
function Expenseform({
  viewstate,
  setviewstate,
  editdetails,
  seteditdetails
}) {
  const dispatch = useDispatch();
  const user = useSelector(State=>State.auth.userdata)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [monthlocal,setmonthlocal] = useState(thismonth);
 
  // let array = ['1', '2', '3', '4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28'];
  let limit = 28;
  if(monthlocal !== "Feb"){

    limit = 30;
  if(monthlocal !== "Apr" && monthlocal !== "Jun" && monthlocal !== "Sep" && monthlocal !== "Nov"){
    limit = 31;
  }
}

  const [imageurl, setimageurl] = useState(null);
  const setvalues = ()=>{
    setValue('Day', editdetails?.Day || thisday)
    setValue('Month', editdetails?.Month || setmonthlocal(thismonth))
    setValue('Year', editdetails?.Year || thisyear)
    setValue('category', editdetails?.category || "")
    setValue('Desc', editdetails?.Desc || "")
    setValue('Amount', editdetails?.Amount || "")
    setValue('image', editdetails?.featuredimage || "")
    setValue('Payment-Method', editdetails?.Payment_Method || "")
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
    setviewstate(false);  setimageurl(null);
    
    if (editdetails) {
      // const file = data.image[0] ? await documentobject.uploadfile(data.image[0]) : undefined;
      // deleting previous uploaded image
      // if (editdetails.featuredimage) {
      //   documentobject.deletefile(editdetails.featuredimage)
      // }
      // const updatepostresponse = await documentobject.updatedocument(editdetails.$id, { Status:editdetails.Status,...data, featuredimage: file ? file.$id : undefined })

      // if (updatepostresponse) {
        delete (data.image);
        // const updateobject = { userid: editdetails.userid, $id: editdetails.$id, ...data, featuredimage: file ? file.$id : undefined,Status:editdetails.Status }
        const updateobject1 = { userid: editdetails.userid, $id: editdetails.$id, ...data,Amount:Number.parseInt(data.Amount) }
        dispatch(updateexpense(updateobject1))
      // }
      seteditdetails(null)
    }
    else {
      // const file = data.image[0] ? await documentobject.uploadfile(data.image[0]) : undefined;

      // const createresponse = await documentobject.createdocument({ ...data, featuredimage: file ? file.$id : undefined,userid:user.$id })
      // if (createresponse) {
        delete (data.image);
        // const createobject = {userid:user.$id, $id: createresponse.$id, ...data, featuredimage: file ? file.$id : undefined }

        data.Amount = Number.parseInt(data.Amount);
        console.log(data.Amount);
        const createobject1 = {userid:user.$id, $id: ID.unique(), ...data,Amount:data.Amount }
        dispatch(addexpense(createobject1))
      // }
    }
  }
  return (
    <>
      <section  className={`${viewstate ? 'flex ' : 'hidden'}  fixed justify-center inset-0 items-center  w-full h-full z-50`}>
        <div className={`  relative  mx-3 border-2 border-double  border-amber-500 max-h-screen w-full overflow-auto lg:w-3/4 lg:max-w-3xl  sm:mx-5 `}>

        
        <div className='bg-gradient-to-r  from-red-400 to-pink-300 px-2 py-2  sm:px-20 sm:py-10'>
          <div className='text-center '><h1 className='bg-white text-xl font-semibold text-blue-500 border-2 border-blue-500 border-dashed shadow-lg px-4 py-2 sm:text-3xl'>Add a new expense or Edit existing one</h1></div>
        </div>
        <form onSubmit={handleSubmit(formsubmit)}>
          <div className='bg-white px-2 pt-4 pb-2 sm:px-10 sm:pb-5 sm:pt-10'>
            <div className='flex flex-col md:flex-row items-center'>
              <div className='w-full bg-sky-200 px-4 py-4 border-2 border-blue-500 sm:w-3/4  lg:w-2/4 mb-5 md:mb-0'>
                <div className='flex flex-wrap  justify-between items-center w-full'>
                <Input 
                  classname=' rounded-none font-semibold w-20'  
                  maxLength='4'
                  max ={limit}
                  type='number' 
                  placeholder='eg.2020' 
                  label='Day' 
                  labelclassname=' font-semibold  ' 
                  {...register('Day', {
                    required: true,
                  })} />
                  {/* <p>-</p> */}
                  <Selectfield label='Month' value = {monthlocal}  options={['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']} classname='w-full  rounded-none text-center font-semibold  tracking-wide' 
                  {...register('Month', {
                  required: true,
                  onChange:(e) => {setmonthlocal(e.target.value); console.log("monthlocal changing");}
                }
                )}
                 />
                  {/* <span>-</span> */}
                  <Input 
                  classname='w-24 rounded-none font-semibold'  
                  maxLength='4' 
                  type='number' 
                  placeholder='eg.2020' 
                  label='Year' 
                  labelclassname=' font-semibold  ' 
                  {...register('Year', {
                    required: true,
                  })} />
                </div>
                <Selectfield 
                label='Category' 
                options={['Fuel', 'Food', 'Travel', 'Hotel','Other']} 
                classname='w-full rounded-none text-center font-semibold  tracking-wide' 
                {...register('category', {
                  required: true,
                })} />
                <label htmlFor="textarea" className='font-semibold '>Note</label>
                <textarea name="" id="textarea" className='border-2 w-full mt-2 pt-2 px-4 outline-none focus:border-blue-600' rows="3" placeholder='if you wanna add a note' {...register('Desc', {
                 
                })}></textarea>
                <Input classname=' w-full rounded-none'  type='number' label='Amount' labelclassname=' font-semibold mt-4' placeholder='Enter Amount in rs ' {...register('Amount', {
                  required: true,
                })} />
                <Selectfield 
                label='Payment-Method' 
                options={['Cash', 'Credit-Card', 'Borrowings', 'Debit-Card',"Google Pay/Paytm"]} 
                classname='w-full rounded-none text-center font-semibold  tracking-wide' 
                {...register('Payment_Method', {
                  required: true,
                })} />

              </div>
              <div className='w-full md:ml-10 sm:w-3/4 md:w-1/2'>
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

              </div>
            </div>
            <div className='flex justify-end mt-5 '>

              <Commonbutton text={'Cancel'} onClick={() => { setviewstate(false); if(editdetails)seteditdetails(null);
                else setvalues(); setimageurl(null); }} classname='bg-blue-500 mr-4  text-white hover:bg-blue-600 sm:!px-20' />

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