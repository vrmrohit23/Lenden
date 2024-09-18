import React, { useState } from 'react'
import expense_object from '../../appwrite/getdata'
import lending_object from '../../appwrite/getlendingsdata'
import { useDispatch } from 'react-redux'
import { delete_lending} from '../../contexts/lendingsSlice'
import { delete_expense} from '../../contexts/expenseslice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Repayments_rows from './Repayments_rows'

function List_rows({ data, seteditdetails, setviewstate, setdetails, index = '', Repaymentsneeded = 'yes' }) {
  const dispatch = useDispatch()
  const [expand, setexpand] = useState(false);
  const [expand_Repayment, setexpand_Repayment] = useState(false)

  const delete_Item = async () => {
    try{
    if (Repaymentsneeded != 'No') {
      let deleteresponse = await lending_object.deletedocument(data.$id)
      if (deleteresponse) {
        dispatch(delete_lending(data.$id));
      }
    }
    else {
      let deleteresponse = await expense_object.deletedocument(data.$id)
      if (deleteresponse) {
        dispatch(delete_expense(data.$id))
      }
      
    }
  }
  catch(error){
    console.log(error)
  }
}


    let total = 0;
    let colors = ["bg-green-500", "bg-blue-500", "bg-orange-500", "bg-gray-700"]
    return (

      <div key={data.$id} className={'rounded-lg w-full  border-x-4  px-2 py-1 shadow-lg mb-5 border-sky-600  bg-gray-300 bg-opacity-20 sm:px-5 sm:mx-5 sm:w-auto'}>
        <div className={'flex justify-between w-auto ' + (expand ? 'mb-1' : '')}>
          <div className='mr-6 sm:mr-10'>
            <span className={'font-normal text-sm text-slate-400 italic sm:text-base ' + (Repaymentsneeded != 'No' ? '' : 'hidden')}>
              Borrower:&nbsp;
            </span>
            <span className=' font-bold text-transparent  text-yellow-600   rounded-full font-serif   sm:text-lg'>

              {data.Borrower_or_Lender ||data.category}
            </span>
            <p className='text-sm italic font-semibold text-slate-400 sm:text-base '>
              {data.Day + "-" + data.Month + "-" + data.Year}
            </p>
          </div>
          <div className='flex flex-col items-end'>
            <div className=''>
              <span className={'  font-bold font-mono  mr-2 text-nowrap ' + (data.Repayments?.length > 0 ? 'line-through ' : 'text-green-600 ')}>
                {data.Amount}
              </span>
              <span className={'font-mono text-nowrap  text-green-600 text-opacity-80 font-bold sm:text-lg ' + (data.Repayments?.length > 0 ? '' : 'hidden')}>
                {data.Amount - data.Repaid}
              </span>
            </div>
            <div>
              <span className={'text-xs  rounded-full px-1 text-white  font-semibold ' + (data.Method == 'Cash' ? colors[0] : colors[1])}>
                {data.Method}
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
                <FontAwesomeIcon title='expand/create' className={'text-lime-300 border-2 text-sm border-lime-700 rounded-full cursor-pointer hover:bg-black duration-300 ' + (expand_Repayment ? 'transform rotate-180' : '')} icon={'fa-solid  fa-chevron-down'}
                  onClick={(e) => {
                    setexpand_Repayment((prev) => !prev)
                  }} />
              </div>
            </div>
            <div className='flex justify-end space-x-4'>
              <div title='Edit' className='   p-0 duration-200 text-center  hover:text-green-600  text-base cursor-pointer sm:text-xl ' onClick={() => { seteditdetails(data); setviewstate(true) }}>
                <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
              </div>
              <div title='delete' className='  bg-transparent  p-0 duration-200 text-center  hover:text-red-500  text-base cursor-pointer sm:text-xl' onClick={delete_Item}>
                <FontAwesomeIcon icon="fa-regular fa-trash-can" />
              </div>
            </div>
          </div>
          {expand_Repayment && Repaymentsneeded != 'No' &&
            <Repayments_rows repayments={data.Repayments} repayments_objects={data.Repayments_Objects} repaid={data.Repaid} documentid={data.$id} indexing={index} />
          }
          {(data.Purpose != '' || data.Desc != '') && <>
            <span className='text-sm text-slate-400 block sm:text-base'>Note: </span>
            <textarea readOnly className='text-sm bg-gray-300  px-2  rounded-lg border-2 border-black mb-4 h-14 w-full overflow-auto sm:text-base' value={data.Desc} />
          </>}
          <p className={'text-sm text-slate-400 mb-4 sm:text-base ' + (Repaymentsneeded != 'No' ? '' : 'hidden')}>Return(Expected): <span className='text-green-600'>{data.Return}</span></p>
        </div>
        <div className='relative text-center font-bold  '>

          <span className={'text-blue-500 text-sm absolute -bottom-4  b rounded-full cursor-pointer  duration-200 bg-white px-2 bg-opacity-90  hover:scale-125 shadow-xl ' + (expand ? 'rotate-180' : '')} onClick={() => setexpand((prev) => !prev)}>
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
          </span>

        </div>

      </div>
    )


  }

  export default List_rows