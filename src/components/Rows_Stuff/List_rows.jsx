import React, { useState } from 'react'
import Commonbutton from '../commonbutton/commonbutton'
import documentobject from '../../appwrite/getdata'
import { useDispatch } from 'react-redux'
import { deleteentry } from '../../contexts/lendingsSlice'
import { updatelending } from '../../contexts/lendingsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Repayments_rows from './Repayments_rows'

function List_rows({ data, seteditdetails, setviewstate, setdetails, index, Repaymentsneeded }) {
  const dispatch = useDispatch()
  const [expand, setexpand] = useState(false);
  const [expand_Repayment, setexpand_Repayment] = useState(false)
  console.log(data)

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
  let colors = ["bg-green-500", "bg-blue-500","bg-orange-500","bg-gray-700"]
  return (

    <div className={'rounded-lg   border-x-4  px-2 py-1 shadow-lg mb-5 border-sky-600  bg-gray-300 bg-opacity-20 sm:px-5 sm:mx-5 '}>
      <div className={'flex justify-between w-auto ' + (expand ? 'mb-1' : '')}>
        <div className='mr-6 sm:mr-10'>
          <p className=' font-bold text-transparent  text-yellow-600   rounded-full font-serif  flex items-center  flex-wrap sm:text-lg'>

            <p className={'font-normal text-sm text-slate-400 italic sm:text-base ' + (Repaymentsneeded != 'No' ? '' : 'hidden')}>
              Borrower:&nbsp;
            </p>
            {data.Borrower_or_Lender? data.Borrower_or_Lender: data.category}
          </p>
          <p className='text-sm italic font-semibold text-slate-400 sm:text-base '>
            {data.Day + "-" + data.Month + "-" + data.Year}
          </p>
        </div>
        <div className='flex flex-col items-end'>
          <div className=''>
            <span className={'text-sm  sm:text-base  font-bold font-mono  mr-2 text-nowrap ' + (data.Repayments?.length > 0 ? 'line-through ' : 'text-green-600 ')}>
              {data.Amount}
            </span>
              <span className={'font-mono text-nowrap  text-green-600 text-opacity-80 font-bold sm:text-lg ' + (data.Repayments?.length > 0 ? '':'hidden')}>
                {data.Amount - 100} 
              </span>
          </div>
          <div>
            <span className={'text-xs  rounded-full px-1 text-white  font-semibold ' + (data.Method == 'Cash' || data.Payment_Method == 'Cash' ? colors[0] : colors[1])}>
              {data.Method?data.Method : data.Payment_Method}
            </span>
          </div>
        </div>
      </div>
      <div className={(expand ? '' : 'hidden')}>
        <div className='flex justify-between flex-wrap'>

          <div>
            <div className={(Repaymentsneeded != 'No' ? '' : 'hidden')}>
              <span className='text-blue-500 font-semibold mr-1'>
                Repayments
              </span>
              <FontAwesomeIcon title='expand/create' className={'text-lime-300 border-2 text-sm border-lime-700 rounded-full cursor-pointer hover:bg-black duration-300 ' + (expand_Repayment ? 'transform rotate-45' : '')} icon={'fa-solid  fa-plus'}
                onClick={(e) => {
                  setexpand_Repayment((prev) => !prev)
                }} />
            </div>
          </div>
          <div className='flex justify-end space-x-4'>
            <div title='Edit' className='   p-0 duration-200 text-center  hover:text-green-600  text-base cursor-pointer sm:text-xl ' onClick={() => { seteditdetails(expense); setviewstate(true) }}>
              <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
            </div>
            <div title='delete' className='  bg-transparent  p-0 duration-200 text-center  hover:text-red-500  text-base cursor-pointer sm:text-xl' onClick={deletelending}>
              <FontAwesomeIcon icon="fa-regular fa-trash-can" />
            </div>
          </div>
        </div>
        {expand_Repayment && Repaymentsneeded != 'No' &&
          <Repayments_rows repayments={data.Repayments} documentid={data.$id} index={index} />
        }
        {(data.Purpose != '' || data.Desc != '') && <>
          <span className='text-sm text-slate-400 block sm:text-base'>Note: </span>
          <textarea className='text-sm bg-gray-300  px-2  rounded-lg border-2 border-black mb-4 h-14 w-full overflow-auto sm:text-base'>{Repaymentsneeded != 'No' ? data.Purpose : data.Desc}</textarea>
        </>}
        <p className={'text-sm text-slate-400 mb-4 sm:text-base ' + (Repaymentsneeded != 'No'?'':'hidden')}>Return(Expected): <span className='text-green-600'>{data.Return}</span></p>
      </div>
      <div className='relative text-center font-bold  '>

        <span className={'text-blue-500 text-sm absolute -bottom-4  b rounded-full cursor-pointer transform   duration-200 bg-white px-2 bg-opacity-90  hover:scale-125 shadow-xl ' + (expand ? 'rotate-180' : '')} onClick={() => setexpand((prev) => !prev)}>
          <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
        </span>

      </div>

    </div>

  )
}

export default List_rows