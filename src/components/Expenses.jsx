
import React from 'react'
import { Expenseform, Selectfield,  Modalbox, RenderTabs,Filter, Render_rows } from './index'


import useFilters from './Hooks/useFilters'
import useSetExpenses from './Hooks/useSetExpenses'
function Expenses() {
  const { expenseslist, setselectedfilters, months, month, setmonth, year, setyear, years } = useSetExpenses();
  const { details, setdetails, viewstate, setviewstate, editdetails, seteditdeatils, showformat, setshowformat } = useFilters();
  const filtercategory = [
    'Category', 'P_Method', 'Amount', 'Date'
  ]
  const filteroptions = {
    "Category": ["Travel", "Hotel", "Fuel", "Food", "Other"],
    "P_Method": ["Cash", "Credit-Card", "Debit-Card", "Borrowings", "Google Pay/Paytm"],
  }
 






  return (
    <>
      <div className=''>
      <Modalbox show={details != ''} details={details} setshow={setdetails} />
        <div className='flex justify-center my-10 mx-5'>
          <div className='mr-6 w-48 '>
            <Selectfield options={months} label='Month' value={month} onChange={(e) => setmonth(e.target.value)} classname='w-full text-center  text-base sm:text-lg' />
          </div>
          <div className=' w-48 '>

            <Selectfield options={years} label='Year' value={year} onChange={(e) => setyear(e.target.value)} classname='w-full text-center text-base sm:text-lg' />
          </div>
        </div>
        <div className='flex justify-center items-end flex-wrap'>
        <Filter categoryoptions={filtercategory} filteroptions={filteroptions} month={month} setselectedfilters={setselectedfilters} />
        <RenderTabs setformat={setshowformat}/>
        </div>
      
        <Render_rows data={expenseslist} Lender_Borrower="No" setdetails={setdetails} seteditdeatils={seteditdeatils} setviewstate={setviewstate} showformat={showformat} />
        <Expenseform viewstate={viewstate} setviewstate={setviewstate} editdetails={editdetails} seteditdetails={seteditdeatils} setMonth={setmonth} setYear={setyear} />
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