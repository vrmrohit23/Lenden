import React from 'react'
import Lendingsrows from './Lendingsrows'
function Render_rows({data,Lender_Borrower}) {
  let totallending = 0;
  return (
    <section className="px-3 py-10 mx-2 mb-20  bg-gradient-to-r from-green-300 to to-blue-400 rounded-lg lg:px-20 lg:mx-20 max-h-96 overflow-auto sm:mx-10 sm:px-10">

          <table className=' rounded-lg w-full px-4 bg-transparent '>
            <thead className=''>
              <tr >
                <th className='border-2 text bg-gray-300   border-slate-600 py-1 text-xs sm:text-base lg:max-w-16'>Day-Month-Year</th>
                <th className='border-2 bg-gray-300 w-2 border-slate-600 py-1 px- text-xs sm:text-base sm:px-2'>Note</th>
                <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base'>P_Method</th>
                <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base'>{Lender_Borrower} by</th>
                <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base' >Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenseslist.map((lending) => {
                totallending = totallending + lending.Amount;
                return <Lendingsrows data={lending} seteditdetails={seteditdeatils} setviewstate={setviewstate} key={lending.$id}  setdetails={setdetails}/>
              })}
              <tr></tr>
              {expenseslist.length > 0 &&
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='border-2 bg-green-600 border-gray-100 p-0 duration-200  max-w-12 text-center font-semibold text-xs sm:text-base'>Total</td>
                  <td className='border-2 bg-gray-300 text-center border-slate-600 py-1 font-semibold text-xs sm:text-base'>{totallending}</td>
                </tr>
              }
            </tbody>
          </table>
        </section>
  )
}

export default Render_rows