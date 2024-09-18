import React,{useState,useEffect, useMemo} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import documentobject from '../../appwrite/getdata'
import { setexpenses } from '../../contexts/expenseslice'



function useSetExpenses() {
  let dispatch = useDispatch();
  const setdata = (response) => {
    dispatch(setexpenses(response.documents));
  }
    let loaded = useSelector((state) =>state.expense.loaded)
    let auth = useSelector((state)=>state.auth.userdata)
    if (!loaded && auth != 'login' && auth != null) {
      if(auth.$id === 'Guest'){
        documentobject.getGuestdocuments()
        .then(response => setdata(response))
        .catch(error => { console.log(error) });
      }
      else{
      documentobject.listdocuments(auth.$id)
        .then(response => setdata(response))
        .catch(error => { console.log(error) });
      }
    }
    
    let expenseslist = useSelector((state) => state.expense.expenseslist)
    // const {year,setyear,years} = useSetyear()
    const[selectedfilters,setselectedfilters] = useState({});
    const[filtered,setfiltered] = useState([]);
    // let months = [...new Set(expenseslist.map((item)=>item.Month))];
    
    let months = useMemo(() => 
      expenseslist
        .reduce((acc, item) => {
          if (!acc.some(month => month=== item.Month)) {
            acc.push(item.Month);
          }
          return acc;
        }, []), 
      [expenseslist]
    );
    
    
  
    let years = useMemo(()=>
      [...new Set(expenseslist.map((item)=>item.Year))],
    [expenseslist]);
   
    
    // state for filtering based on selected month
    const [month, setmonth] = useState()
    
    // state for filtering based on selected year
    const [year, setyear] = useState()
    
    useEffect(() => {
      if (months.length > 0 && !months.includes(month)) {
        // If the current month is not in the updated months array, reset to the first available month, also it runs when this component mounts
        setmonth(months[0]);
      }
      if(years.length > 0 && !years.includes(year)){
        // If the current year is not in the updated months array, reset to the first available year, also it runs when this component mounts
        setyear(years[0]);
      }
    }, [months,years]);
 
    
   
    let filterexpense = expenseslist;
    useEffect(()=>{
      console.log("we are in filters useeffect")
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
        Pmethodfilter = [...Pmethodfilter,...filterexpense.filter((item)=>item.Method === options)]
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
},[selectedfilters,month,expenseslist])


expenseslist = filtered;

expenseslist = expenseslist.filter((expense) => expense.Month === month && expense.Year === year)



return {expenseslist,setselectedfilters,months,month,setmonth,year,setyear,years}
}

export default useSetExpenses