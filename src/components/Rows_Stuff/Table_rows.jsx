import React from 'react'
import Commonbutton from '../commonbutton/commonbutton'
import documentobject from '../../appwrite/getdata'
import { useDispatch } from 'react-redux'
import { delete_expense,update_expense } from '../../contexts/expenseslice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@nextui-org/react'
function Table_rows({ expense, seteditdetails, setviewstate,setdetails}) {
  const dispatch = useDispatch()

  const deleteexpense = async () => {
      dispatch(deleteentry(expense.$id))
  }
  return (
    <tr >
      <td className='border-2 bg-gray-200 max-w-12 border-gray-100 text-center text-xs sm:text-base'>{expense.Day + "-" + expense.Month + "-" + expense.Year}</td>
      
      <Tooltip content='Show Note'>
      <td className='border-  text-center bg-gray-700 border-gray-100 hover:bg-slate-800 hover:border-orange-600 cursor-pointer' onClick={()=>{setdetails(expense.Desc || 'empty')}}> <span className=' text-white   text-base sm:px-2 sm:text-xl' ><FontAwesomeIcon icon={"fa-solid fa-plus"}/>
      </span></td>
      </Tooltip>
      <td className='border-2 max-h-7 bg-gray-200 border-gray-100 text-center max-w-10 text-xs sm:text-base'>{expense.category}</td>
      <td className={`border-2 bg-gray-200 max-w-10 border-gray-100 text-center text-xs sm:text-base`}>{expense.Method}</td>
      <td className='border-2 bg-gray-200 border-gray-100 text-center text-xs sm:text-base'>{expense.Amount}</td>
      <Tooltip content='Edit'>

      <td    className='  border-x-2 in  border-t-2 bg-gray-200 border-gray-100 p-0 duration-200 text-center  hover:text-green-400 hover:bg-slate-800 text-base cursor-pointer sm:text-xl ' onClick={() => { seteditdetails(expense); setviewstate(true) }}>
      <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
      </td>
      </Tooltip>
      <Tooltip content='Delete' color='danger'>

      <td  className='  border-x-2 border-t-2 border-spacing-14 bg-gray-200 border-gray-100 p-0 duration-200 text-center  hover:text-red-500 hover:bg-slate-800 text-base cursor-pointer sm:text-xl' onClick={deleteexpense}>
      <FontAwesomeIcon icon="fa-regular fa-trash-can" />
      </td>
      </Tooltip>
      
      
    </tr>
  )
}

export default Table_rows