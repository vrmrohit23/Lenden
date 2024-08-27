import React, { useEffect, useState, } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const authstatus = useSelector(state => state.auth.status)
   
    const [loader, setloader] = useState(true)
    useEffect(() => {
        
        if (authentication && authstatus !== authentication) {
        setloader(true);  
        
        }
        else{
        setloader(false)
        }
    }, [navigate, authstatus, authentication])
    return loader? <div className='flex items-center bg-slate-500 p-20 flex-col'>
       

    <div className='text-3xl animate-pulse mt-10 p10 mb-4 font-semibold'>Please Login first</div>
    <Link to={"/login"} className='text-3xl text-white bg-blue-700 hover:bg-blue-500 px-4 py-3'>Login</Link>
        
  </div> :
   <div>{children}</div>


  
}

