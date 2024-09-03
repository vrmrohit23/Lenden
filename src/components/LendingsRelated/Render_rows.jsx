import React from 'react'
import Lendingsrows from './Lendingsrows'
function Render_rows({data,Lender_Borrower,seteditdeatils,setviewstate,setdetails}) {
  let totallending = 0;
  let colors = ["bg-gray-800","bg-orange-600","bg-blue-600","bg-"]
  return (
    <section className="px-3 py-10 mx-2 mb-20  bg-gradient-to-r from-gray-800 to to-gray-600 rounded-lg lg:px-20 lg:mx-20 max-h-96 overflow-auto sm:mx-10 sm:px-10">
      <div className='fle'>

      <div className='flex justify-between flex-wrap items-start'>


      {data.map((lending) => {
        totallending = totallending + lending.Amount;
        return <Lendingsrows data={lending} seteditdetails={seteditdeatils} setviewstate={setviewstate} key={lending.$id}  setdetails={setdetails}/>
      })}
      </div>
      </div>
    
          {/* {data.length > 0? 
          <table className=' rounded-lg w-full px-4 bg-transparent '>
            <thead className=''>
              <tr >
                <th className='border-2 text bg-gray-300   border-slate-600 py-1 text-xs sm:text-base lg:max-w-16'>Day-Month-Year</th>
                <th className='border-2 bg-gray-300 w-2 border-slate-600 py-1 px- text-xs sm:text-base sm:px-2'>Purpose</th>
                <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base'>Transaction</th>
                <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base'>{Lender_Borrower} </th>
                <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base' >Return by </th>
                <th className='border-2 bg-gray-300 border-slate-600 py-1 text-xs sm:text-base' >Amount</th>
              </tr>
            </thead>
            <tbody>
              
              <tr></tr>
              {data.length > 0 &&
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='border-2 bg-green-600 border-gray-100 p-0 duration-200  max-w-12 text-center font-semibold text-xs sm:text-base'>Total</td>
                  <td className='border-2 bg-gray-300 text-center border-slate-600 py-1 font-semibold text-xs sm:text-base'>{totallending}</td>
                </tr>
              }
            </tbody>
          </table>
          : <div className='text-center bg-white p-5 font-semibold text-2xl'>
            Sorry, it's empty here
          </div>
          } */}
        </section>
  ) 
}

export default Render_rows