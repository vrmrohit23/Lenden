import React,{useState,useEffect, useMemo} from 'react'
import { useSelector } from 'react-redux'
import documentobject from '../../appwrite/getlendingsdata'
import { useDispatch } from 'react-redux'
import { setlendings } from '../../contexts/lendingsSlice'
function useSetExpenses() {
    let loaded = useSelector((state) =>state.lending.loaded)
    let auth = useSelector((state)=>state.auth.userdata.$id)
    if(!loaded && auth != 'login' && auth != null ){
      let dispatch = useDispatch();
      console.log(auth)
      documentobject.listdocuments(auth)
      .then(response =>{
        let docu = response.documents;
        docu.map((data,index)=>{
          let array = [];
          data.Repayments.map((item)=>{
            console.log(typeof item)
            array.push(JSON.parse(item))
          })
          data.Repayments = array
        })
        dispatch(setlendings(response.documents)); console.log(response.documents)})
      .catch(error=>{console.log(error)});
    }
    let lendingslist = useSelector((state) => state.lending.lendingslist)
    console.log(lendingslist)
    // const {year,setyear,years} = useSetyear()
    const[selectedfilters,setselectedfilters] = useState({});
    const[filtered,setfiltered] = useState([]);
    // let months = [...new Set(expenseslist.map((item)=>item.Month))];
    let months = useMemo(()=>
      [...new Set(lendingslist.map((item)=>item.Month))],
    [lendingslist]);
  
    let years = useMemo(()=>
      [...new Set(lendingslist.map((item)=>item.Year))],
    [lendingslist]);
   
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
 
    
   
    let filterlending = lendingslist;
    useEffect(()=>{
      console.log("we are in filters useeffect")
      if(selectedfilters["Category"] !== undefined && selectedfilters["Category"].length > 0){
        console.log("checking Category")
        let Categoryfilter = []
        selectedfilters["Category"].map((options)=>
          Categoryfilter = [...Categoryfilter,...filterlending.filter((item)=>item.category === options)]
      )
      filterlending = Categoryfilter;
    }
    if(selectedfilters["P_Method"] !== undefined && selectedfilters["P_Method"].length > 0){
      console.log("checking Payment Method")
      let Pmethodfilter = []
      selectedfilters["P_Method"].map((options)=>
        Pmethodfilter = [...Pmethodfilter,...filterlending.filter((item)=>item.Payment_Method === options)]
    )
    filterlending = Pmethodfilter;
  }
  if(selectedfilters["Range"] !== undefined){
    filterlending = filterlending.filter((items) => items.Amount < selectedfilters["Range"] )
  }
  if(selectedfilters["Date"] !== undefined){
    filterlending = filterlending.filter((items) => items.Day === selectedfilters["Date"] )
  }
  
  setfiltered(filterlending)
},[selectedfilters,month,lendingslist])


lendingslist = filtered;

lendingslist = lendingslist.filter((lending) => lending.Month === month && lending.Year === year)



return {lendingslist,setselectedfilters,months,month,setmonth,year,setyear,years}
}

export default useSetExpenses