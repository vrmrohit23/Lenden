import React, { useState,useEffect,useMemo } from 'react'
import { Lendingsform, Selectfield, Render_rows, Modalbox,Filter } from './index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFilters from './Hooks/useFilters'
import useSetLendings from './Hooks/useSetLendings'
function Lendings() {
  
  const {lendingslist,setselectedfilters,months,month,setmonth,year,setyear,years,borrowerslist} = useSetLendings();
  const {details,setdetails,viewstate,setviewstate,editdetails,seteditdeatils} = useFilters();
  const filtercategory = [
    'Method','Borrowers','Amount'
  ]
  
 
  const filteroptions = {
    "Method":['Cash', 'Recharge/Bills', 'Paytm', 'Google Pay', 'Contribution'],
    "Borrowers":borrowerslist
  }
  console.log(lendingslist)


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
  
        <Render_rows data={lendingslist} Lender_Borrower="Given to" setdetails={setdetails} seteditdeatils={seteditdeatils} setviewstate={setviewstate} showformat='list'/>

        <Lendingsform viewstate={viewstate} setviewstate={setviewstate} editdetails={editdetails} seteditdetails={seteditdeatils} setMonth={setmonth} setYear={setyear}/>

        <section>
          <div className='flex justify-center mb-20'>
            <button className='bg-gradient-to-r from-orange-500 to-yellow-500 px-2 py-1 text-base rounded-md hover:scale-110 duration-75 sm:text-xl' onClick={() => { if (!viewstate) { setviewstate(true) } }}>
              Add Lending
            </button>
          </div>
        </section>
      </div>
    </>
  )
}


export default Lendings