import React from 'react'
import List_rows from './List_rows';
import Table_rows from './Table_rows';
function Render_rows({ data, Lender_Borrower, seteditdeatils, setviewstate, setdetails, showformat = '' }) {
  let total = 0;
  let colors = ["bg-gray-800", "bg-orange-600", "bg-blue-600", "bg-"]
  return (showformat == 'list') ?
    <section className={'px-3 py-10 m mb-20  bg-gradient-to-r from-gray-800 to to-gray-600 rounded lg:px-20 lg:mx-20 max-h-96 overflow-auto sm sm:px-10 '}>
      
      <div className='flex justify-between flex-wrap items-start'>
        {/* For creating rows */}
        {data.map((entry, index) => {
          total = total + entry.Amount - (entry.Repaid?entry.Repaid:0);
          return <List_rows key={entry.$id} data={entry} seteditdetails={seteditdeatils} setviewstate={setviewstate} setdetails={setdetails} index={index} Repaymentsneeded ={Lender_Borrower} />
        })}
      </div>
      <div className='flex justify-end mt-5'>

      <div className='inline-block rounded-xl bg-gray-300 bg-opacity-20'>

        <span className='text-slate-300 bg-opacity-80 font-semibold rounded-xl rounded-r-none  text- px-1 inline-block'>
          Total : 
        </span>
          <span className='text-green-600  font-mono text-lg px-1 rounded-l-none rounded-xl font-bold '>
            {total}
            </span>
      </div>
      </div>
    </section>
   
    : 

    <section className=" py-10  mb-20  bg-gradient-to-r from-green-300 to to-blue-400 rounded-lg lg:px-20 lg:mx-20 max-h-96 overflow-auto sm:mx-10 sm:px-10">
    <table className=' rounded-lg w-full px-4 bg-transparent '>
      <thead className=''>

        <tr >
          <th className='border-2 text bg-gray-300   border-slate-600 py-1 text-xs sm:text-base lg:max-w-16'>Day-Month-Year</th>
          <th className='border-2 bg-gray-300 w-2 border-slate-600 py-1 px- text-xs sm:text-base sm:px-2'>Note</th>
          <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base'>Category</th>
          <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base'>P-method</th>
          <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base' >Amount</th>
        </tr>
      </thead>
      <tbody>

        {data.map((expense) => {
          total = total + expense.Amount;
          return <Table_rows expense={expense} seteditdetails={seteditdeatils} setviewstate={setviewstate} key={expense.$id}  setdetails={setdetails}/>

        }
        )
        }
        <tr></tr>
        {data.length > 0 &&
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className='border-2 bg-green-600 border-gray-100 p-0 duration-200  max-w-12 text-center font-semibold text-xs sm:text-base'>Total</td>
            <td className='border-2 bg-gray-300 text-center border-slate-600 py-1 font-semibold text-xs sm:text-base'>{total}</td>
          </tr>
        }
      </tbody>
    </table> 
    </section>


}

export default Render_rows