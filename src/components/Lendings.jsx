import React, { useState,useEffect } from 'react'
import { Expenseform, Selectfield, Expenserows, Modalbox,Filter } from './index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { thisday, thismonth, thisyear } from './essentials/currentDMY_Exp'
import FilterComponent from './essentials/Newfilter'
function Lendings() {

  // const user = useSelector((state) => state.auth.userdata)

  let expenseslist = useSelector((state) => state.expense.expenseslist)
  const [details,setdetails] = useState('');
  const[selectedfilters,setselectedfilters] = useState({});
  const [viewstate, setviewstate] = useState(false)
  const [editdetails, seteditdeatils] = useState(null)
  const filtercategory = [
    'Category','P_Method','Amount','Date'
  ]
  const filteroptions = {
    "Category":["Travel","Hotel","Fuel","Food","Other"],
    "P_Method":["Cash","Credit-Card","Debit-Card","Borrowings"],
    
  
  }

  
  
  // state for filtering based on selected year
 
  let months = [...new Set(expenseslist.map((item)=>item.Month))];
  
  let years = [...new Set(expenseslist.map((item)=>item.Year))];
  const [year, setyear] = useState(expenseslist[0]?.Year)
 
  // state for filtering based on selected month
  const[filtered,setfiltered] = useState([]);
  const [month, setmonth] = useState(expenseslist[0]?.Month)
  
  useEffect(() => {
    if (months.length > 0 && !months.includes(month)) {
      // If the current month is not in the updated months array, reset to the first available month
      setmonth(months[0]);
      expenseslist = expenseslist.filter((expense) => expense.Month === month && expense.Year === year)
    }
  }, [months]);

  let filterexpense = expenseslist;
  useEffect(()=>{
    
   
    if(selectedfilters["Category"] !== undefined && selectedfilters["Category"].length > 0){
      console.log("checking Category")
      let Categoryfilter = []
      selectedfilters["Category"].map((options)=>
        Categoryfilter = [...Categoryfilter,...filterexpense.filter((item)=>item.category === options)]

  )
    filterexpense = Categoryfilter;
  }
    if(selectedfilters["P_Method"] !== undefined && selectedfilters["P_Method"].length > 0){
      console.log("checking Payment Method")
      let Pmethodfilter = []
      selectedfilters["P_Method"].map((options)=>
        Pmethodfilter = [...Pmethodfilter,...filterexpense.filter((item)=>item.Payment_Method === options)]
  )
    filterexpense = Pmethodfilter;
    }
    if(selectedfilters["Range"] !== undefined){
      filterexpense = filterexpense.filter((items) => items.Amount < selectedfilters["Range"] )
    }
    if(selectedfilters["Date"] !== undefined){
      filterexpense = filterexpense.filter((items) => items.Day === selectedfilters["Date"] )
      
    }
    
    setfiltered(filterexpense)
    
  },[selectedfilters,month])
  
  

  expenseslist = filtered;
  // for (let index = 0; index < length; index++) {

  //   if (monthsboolean[expenseslist[index].Month]) {

  //     months.push(expenseslist[index].Month)
  //     monthsboolean[expenseslist[index].Month] = false;
  //   }
  //   let yeararraylength = years.length;
  //   let signal = true;
  //   // this 'for' loop is to check if a year is already added in 'years' array or not!!
  //   for (let index2 = 0; index2 < yeararraylength; index2++) {
  //     if (years[index2] === expenseslist[index].Year) {
  //       signal = false;
  //     }
  //   }
  //   if (signal) {
  //     years.push(expenseslist[index].Year);
  //   }
  // }
  console.log(expenseslist)
  
  let totalexpense = 0;


  return (
    <>
      <Modalbox show={show} details={details} setshow={setshow}/>
        
      
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
        <section className="px-3 py-10 mx-2 mb-20  bg-gradient-to-r from-green-300 to to-blue-400 rounded-lg lg:px-20 lg:mx-20 max-h-96 overflow-auto sm:mx-10 sm:px-10">

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
                totalexpense = totalexpense + Number.parseInt(expense.Amount);
                return <Expenserows expense={expense} seteditdetails={seteditdeatils} setviewstate={setviewstate} key={expense.$id} setshow={setshow} setdetails={setdetails}/>

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


export default Lendings