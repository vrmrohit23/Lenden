import React,{useState} from 'react'

function useFilters() {
    const [details,setdetails] = useState('');
    const [viewstate, setviewstate] = useState(false)
    const [editdetails, seteditdeatils] = useState(null)
    const [showformat,setshowformat] = useState('list')

  return {details,setdetails,viewstate,setviewstate,editdetails,seteditdeatils,showformat,setshowformat}
}

export default useFilters