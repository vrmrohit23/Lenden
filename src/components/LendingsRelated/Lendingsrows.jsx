import React from 'react'
import Commonbutton from '../commonbutton/commonbutton'
import documentobject from '../../appwrite/getdata'
import { useDispatch } from 'react-redux'
import { deleteentry } from '../../contexts/lendingsSlice'
import { updateexpense } from '../../contexts/lendingsSlice'
function Lendingsrows({ data, seteditdetails, setviewstate,setdetails}) {
  const dispatch = useDispatch()
  // document status updation function
  // const Approve_Reject = async (action) => {
  //   const response = await documentobject.updatedocument(expense.$id,{Status:action})
  //   if(response){
  //     const updatedocumentobj = {userid:expense.userid, $id: expense.$id,Day:expense.Day,Month:expense.Month,Year:expense.Year,category:expense.category,Desc:expense.Desc,Amount:expense.Amount,featuredimage:expense.featuredimage,Status:action
  //     }
  //     dispatch(updateexpense(updatedocumentobj))
  //   }
  // }
  const deletelending = async () => {
    // let deleteresponse = await documentobject.deletedocument(expense.$id)
    // if (deleteresponse) {
      dispatch(deleteentry(data.$id))
    // }
  }
  return (
    <tr >
      <td className='border-2 bg-gray-200 max-w-12 border-gray-100 text-center text-xs sm:text-base'>{data.Day + "-" + data.Month + "-" + data.Year}</td>
      <td className='border-2  text-center bg-gray-700 border-gray-100 hover:bg-slate-800 hover:border-orange-600 cursor-pointer' onClick={()=>{setdetails(data.Desc || 'empty')}}> <span className=' text-white   text-base sm:px-2 sm:text-xl' ><i class="fa-solid fa-plus"></i>
      </span></td>
      <td className='border-2 max-h-7 bg-gray-200 border-gray-100 text-center max-w-10 text-xs sm:text-base'>{data.category}</td>
      <td className={`border-2 bg-gray-200 max-w-10 border-gray-100 text-center text-xs sm:text-base`}>{data.Payment_Method}</td>
      <td className='border-2 bg-gray-200 border-gray-100 text-center text-xs sm:text-base'>{data.Amount}</td>
      <td className='  border-x-2 in  border-t-2 bg-gray-200 border-gray-100 p-0 duration-200 text-center  hover:text-green-400 hover:bg-slate-800 text-base cursor-pointer sm:text-xl ' onClick={() => { seteditdetails(data); setviewstate(true) }}>
        <i class="fa-regular fa-pen-to-square " ></i>
      </td>
      <td className='  border-x-2 border-t-2 border-spacing-14 bg-gray-200 border-gray-100 p-0 duration-200 text-center  hover:text-red-500 hover:bg-slate-800 text-base cursor-pointer sm:text-xl' onClick={deletelending}>
      <i class="fa-regular fa-trash-can" />
      </td>
      
      
    </tr>
  )
}

export default Lendingsrows