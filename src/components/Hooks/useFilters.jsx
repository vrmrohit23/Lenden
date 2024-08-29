import React,{useState} from 'react'

function useFilters() {
    const [details,setdetails] = useState('');
    const [viewstate, setviewstate] = useState(false)
    const [editdetails, seteditdeatils] = useState(null)

  return {details,setdetails,viewstate,setviewstate,editdetails,seteditdeatils}
}

export default useFilters