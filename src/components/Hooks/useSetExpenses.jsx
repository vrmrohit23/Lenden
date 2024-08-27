import React,{useState,useEffect, useMemo} from 'react'
import { useSelector } from 'react-redux'
function useSetExpenses() {
    let expenseslist = useSelector((state) => state.expense.expenseslist)
    // const {year,setyear,years} = useSetyear()
    const[selectedfilters,setselectedfilters] = useState({});
    const[filtered,setfiltered] = useState([]);
    // let months = [...new Set(expenseslist.map((item)=>item.Month))];
    let months = useMemo(()=>
      [...new Set(expenseslist.map((item)=>item.Month))],
    [expenseslist]);
  
    let years = useMemo(()=>
      [...new Set(expenseslist.map((item)=>item.Year))],
    [expenseslist]);;
   
    // state for filtering based on selected year

    // state for filtering based on selected month
    const [month, setmonth] = useState()
     
    const [year, setyear] = useState()
  
    useEffect(() => {
      if (months.length > 0 && !months.includes(month)) {
        // If the current month is not in the updated months array, reset to the first available month
        setmonth(months[0]);
      }
      if(years.length > 0 && !years.includes(year)){
        // If the current year is not in the updated months array, reset to the first available year
        setyear(years[0]);
      }
    }, [months,years]);
 
    
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

expenseslist = expenseslist.filter((expense) => expense.Month === month && expense.Year === year)


return {expenseslist,setselectedfilters,months,month,setmonth,year,setyear,years}
}

export default useSetExpenses