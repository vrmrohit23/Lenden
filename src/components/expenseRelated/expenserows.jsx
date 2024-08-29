import React from 'react'
import Commonbutton from '../commonbutton/commonbutton'
import documentobject from '../../appwrite/getdata'
import { useDispatch } from 'react-redux'
import { deleteentry } from '../../contexts/expenseslice'
import { updateexpense } from '../../contexts/expenseslice'
function Expenserows({ expense, seteditdetails, setviewstate,setdetails}) {
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
  const deleteexpense = async () => {
    // let deleteresponse = await documentobject.deletedocument(expense.$id)
    // if (deleteresponse) {
      dispatch(deleteentry(expense.$id))
    // }
  }
  return (
    <tr >
      <td className='border-2 bg-gray-200 max-w-12 border-gray-100 text-center text-xs sm:text-base'>{expense.Day + "-" + expense.Month + "-" + expense.Year}</td>
      <td title='Open Description' className='border-  text-center bg-gray-700 border-gray-100 hover:bg-slate-800 hover:border-orange-600 cursor-pointer' onClick={()=>{setdetails(expense.Desc || 'empty')}}> <span className=' text-white   text-base sm:px-2 sm:text-xl' ><i class="fa-solid fa-plus"></i>
      </span></td>
      <td className='border-2 max-h-7 bg-gray-200 border-gray-100 text-center max-w-10 text-xs sm:text-base'>{expense.category}</td>
      <td className={`border-2 bg-gray-200 max-w-10 border-gray-100 text-center text-xs sm:text-base`}>{expense.Payment_Method}</td>
      <td className='border-2 bg-gray-200 border-gray-100 text-center text-xs sm:text-base'>{expense.Amount}</td>
      <td title='Edit expense' className='  border-x-2 in  border-t-2 bg-gray-200 border-gray-100 p-0 duration-200 text-center  hover:text-green-400 hover:bg-slate-800 text-base cursor-pointer sm:text-xl ' onClick={() => { seteditdetails(expense); setviewstate(true) }}>
        <i class="fa-regular fa-pen-to-square " ></i>
      </td>
      <td title='delete expense' className='  border-x-2 border-t-2 border-spacing-14 bg-gray-200 border-gray-100 p-0 duration-200 text-center  hover:text-red-500 hover:bg-slate-800 text-base cursor-pointer sm:text-xl' onClick={deleteexpense}>


        <i class="fa-regular fa-trash-can" />

      </td>
      
      
    </tr>
  )
}

export default Expenserows