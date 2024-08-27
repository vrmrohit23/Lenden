import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Expenserows, Selectfield } from '../index'
function Adminexpensesfilter() {
    let list = useSelector((state) => state.expense.expenseslist)
    const users = useSelector((state) => state.auth.users)
    const [byemployee, setByemployee] = useState("All")
    const [approved, setApproved] = useState(false)
    const [Pending, setPending] = useState(false)
    const [userslist, setuserslist] = useState([])
    
    useEffect(() => {
        
        let usersarray = users.filter((option)=>option.Name).map(option=>{return{name:option.Name,id:option.id}})
        
        setuserslist([{name:"All",id:"All"},...usersarray])
        console.log(userslist)
        
    }, [users])
    
    if (Pending !== false || approved !== false) {
        if (Pending && !approved) {
            if(byemployee !== "All"){
                list = list.filter((expense) => expense.Status === "Pending" && expense.userid === byemployee)
            }
            list = list.filter((expense) => expense.Status === "Pending")
        }
        else if (!Pending && approved) {
            list = list.filter((expense) => expense.Status === "Approved")
        }
        else {
            list = list.filter((expense) => expense.Status !== "Rejected")
        }
    }
    else if(byemployee !== "All"){
        list = list.filter(expense=>{console.log(expense.userid," ",byemployee)
           return expense.userid === byemployee })
    }
    


    return (
        <>
            <div className='mt-10'>
                <div className='flex justify-center'>
                    <label htmlFor="Approved" className='mr-1' >Approved</label>
                    <input id='Approved' type="checkbox" className='size-4 mr-4 mt-1' onClick={() => setApproved((prev) => !prev)} />
                    <label htmlFor="Pending" className='mr-1 '>Pending</label>
                    <input id='Pending' type="checkbox" className='size-4 mr-4 mt-1' onClick={() => setPending((prev) => !prev)} />
                    <div className=''>

                    <Selectfield options={userslist} label='Added by' value={byemployee} onChange={(e) => setByemployee(e.target.value)} classname='w-full text-center  text-lg' />
                    </div>
                </div>
                <table className=' rounded-lg w-full px-4 bg-transparent'>
                    <thead className=''>

                        <tr >
                            <th className='border-2 text bg-gray-300 max-w-12 border-slate-600 py-1'>Day-Month-Year</th>
                            <th className='border-2 bg-gray-300 max-w-28 border-slate-600 py-1'>Description</th>
                            <th className='border-2 bg-gray-300 border-slate-600 py-1'>Category</th>
                            <th className='border-2 bg-gray-300 border-slate-600 py-1'>Status</th>
                            <th className='border-2 bg-gray-300 border-slate-600 py-1' >Amount</th>
                        </tr>
                    </thead>
                    <tbody>


                        {list.map((option) => {
                            return <Expenserows expense={option} firstbutton={"Approve"} secondbutton={"Reject"} key={option.$id} />
                        })}
                    </tbody>
                </table>


            </div>
        </>
    )
}


export default Adminexpensesfilter