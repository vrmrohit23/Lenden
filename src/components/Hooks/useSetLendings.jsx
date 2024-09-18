import React, { useState, useEffect, useMemo } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import documentobject from '../../appwrite/getlendingsdata'
import { setlendings } from '../../contexts/lendingsSlice'

function useSetLendings() {
  let dispatch = useDispatch();
  const setdata = (response) => {
    let docu = response.documents;
    docu.map((data) => {
      let array = [];
      data.Repayments.map((item) => {
        array.push(JSON.parse(item))
      })
      data.Repayments_Objects = array
    })
    dispatch(setlendings(docu)); console.log(response.documents)
  }
  let loaded = useSelector((state) => state.lending.loaded)
  let auth = useSelector((state) => state.auth.userdata)
  if (!loaded && auth != null) {
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
  let lendingslist = useSelector((state) => state.lending.lendingslist)
  // const {year,setyear,years} = useSetyear()
  const [selectedfilters, setselectedfilters] = useState({});
  const [filtered, setfiltered] = useState([]);
  // let months = [...new Set(expenseslist.map((item)=>item.Month))];
  let months = useMemo(() =>
    lendingslist
      .reduce((acc, item) => {
        if (!acc.some(month => month === item.Month)) {
          acc.push(item.Month)
        }
        return acc;
      }, []),
    [lendingslist]);

  let years = useMemo(() =>
    [...new Set(lendingslist.map((item) => item.Year))],
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
    if (years.length > 0 && !years.includes(year)) {
      // If the current year is not in the updated months array, reset to the first available year
      setyear(years[0]);
    }
  }, [months, years]);



  let filterlending = lendingslist;
  useEffect(() => {
    console.log("we are in filters useeffect")
    if (selectedfilters["Method"] !== undefined && selectedfilters["Method"].length > 0) {

      let Categoryfilter = []
      selectedfilters["Method"].map((options) =>
        Categoryfilter = [...Categoryfilter, ...filterlending.filter((item) => item.Method === options)]
      )
      filterlending = Categoryfilter;
    }
    if (selectedfilters["Borrowers"] !== undefined && selectedfilters["Borrowers"].length > 0) {
      let Pmethodfilter = []
<<<<<<< HEAD
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> 84232ce46d07d9bdbdb81ebe58ee396311f34592
      selectedfilters["Borrowers"].map((options) =>
        Pmethodfilter = [...Pmethodfilter, ...filterlending.filter((item) => item.Borrower_or_Lenderr === options)]
      )
      filterlending = Pmethodfilter;
    }
    if (selectedfilters["Range"] !== undefined) {
      filterlending = filterlending.filter((items) => items.Amount < selectedfilters["Range"])
    }
<<<<<<< HEAD
=======
    // if(selectedfilters["Date"] !== undefined){
    //   filterlending = filterlending.filter((items) => items.Day === selectedfilters["Date"] )
    // }

>>>>>>> 84232ce46d07d9bdbdb81ebe58ee396311f34592
    setfiltered(filterlending)
  }, [selectedfilters, month, lendingslist])

  console.log(filtered)
  lendingslist = filtered;

  lendingslist = lendingslist.filter((lending) => lending.Month === month && lending.Year === year)

  const borrowerslist = useMemo(() => {
    return lendingslist.reduce((acc, item) => {
      if (!acc.some(borrower => borrower === item.Borrower_or_Lender)) {
        acc.push(item.Borrower_or_Lender);
      }
      return acc;
    }, []);
  }, [lendingslist]);
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> 84232ce46d07d9bdbdb81ebe58ee396311f34592


  return { lendingslist, setselectedfilters, months, month, setmonth, year, setyear, years, borrowerslist }
}

export default useSetLendings