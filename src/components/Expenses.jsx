import React, { useState,useEffect } from 'react'
import { Expenseform, Selectfield, Expenserows, Modalbox,Filter } from './index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFilters from './Hooks/useFilters'
import useSetExpenses from './Hooks/useSetExpenses'
function Expenses() {
  const {expenseslist,setselectedfilters,months,month,setmonth,year,setyear,years} = useSetExpenses();
  const {details,setdetails,viewstate,setviewstate,editdetails,seteditdeatils} = useFilters();
  const filtercategory = [
    'Category','P_Method','Amount','Date'
  ]
  const filteroptions = {
    "Category":["Travel","Hotel","Fuel","Food","Other"],
    "P_Method":["Cash","Credit-Card","Debit-Card","Borrowings","Google Pay/Paytm"],
  }
  // console.log(expenseslist)
 
  
  let totalexpense = 0;


  return (
    <>
      <Modalbox show={details != ''} details={details} setshow={setdetails}/>
      <div className=''>
        <div className='flex justify-center my-10 mx-5'>
          <div className='mr-6 w-48 '>
            <Selectfield options={months} label='Month' value={month} onChange={(e) => setmonth(e.target.value)} classname='w-full text-center  text-base sm:text-lg' />
          </div>
          <div className=' w-48 '>

            <Selectfield options={years} label='Year' value={year} onChange={(e) => setyear(e.target.value)} classname='w-full text-center text-base sm:text-lg' />
          </div>
        </div>
        
      <Filter categoryoptions={filtercategory} filteroptions={filteroptions} month={month} setselectedfilters={setselectedfilters}/>
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

              {expenseslist.map((expense) => {
                totalexpense = totalexpense + expense.Amount;
                return <Expenserows expense={expense} seteditdetails={seteditdeatils} setviewstate={setviewstate} key={expense.$id}  setdetails={setdetails}/>

              }
              )
              }
              <tr></tr>
              {expenseslist.length > 0 &&
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='border-2 bg-green-600 border-gray-100 p-0 duration-200  max-w-12 text-center font-semibold text-xs sm:text-base'>Total</td>
                  <td className='border-2 bg-gray-300 text-center border-slate-600 py-1 font-semibold text-xs sm:text-base'>{totalexpense}</td>
                </tr>
              }
            </tbody>
          </table>
        </section>

        <Expenseform viewstate={viewstate} setviewstate={setviewstate} editdetails={editdetails} seteditdetails={seteditdeatils} />
        <section>
          <div className='flex justify-center mb-20'>
            <button className='bg-gradient-to-r from-orange-500 to-yellow-500 px-2 py-1 text-base rounded-md hover:scale-110 duration-75 sm:text-xl' onClick={() => { if (!viewstate) { setviewstate(true) } }}>
              Add Expense
            </button>
          </div>
        </section>
      </div>
    </>
  )
}


export default Expenses