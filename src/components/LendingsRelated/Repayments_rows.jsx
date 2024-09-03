import React, { useState } from 'react'
import {Commonbutton,Selectfield} from '../index';

function Repayments_rows({repayments}) {
    const [repaymentform,setrepaymentform] = useState(false);

  return (
    <div>
        <table className='w-full text-slate-400 font-light border-2 mt-3 text-xs  max-h-20 overflow-auto '>
            <thead >
                <th className='font-normal '>Date</th>
                <th className='font-normal'>Method</th>
                <th className='font-normal'>Amount</th>
            </thead>
            <tbody >
                {repayments.map((data,index)=>{
                   return <tr key={index}>
                    <td className='text-center max-w-10'>{data.Date}</td>
                    <td className='text-center'>{data.Method}</td>
                    <td className='text-center'>{data.Amount}</td>
                   </tr>
                })
                }   
                {repaymentform && 
                    <>
                    <tr className=''>
                        <td className=''><input className='text-center' type="date" /></td>
                        <td ><Selectfield className='max-w-full' options={['Cash','Paytm','Gpay']}/></td>
                        <td className='max-w-16  overflow-hidden '> <input type="text" placeholder='Amount' className='text-center max-w-16'/></td>
                    </tr>
                
                   </>
                   
                }
                
            </tbody>
        </table>
                <div className='mb-5 flex justify-center'>
                {repaymentform && 
                <>
                <Commonbutton text='save' classname='bg-blue-500 !px-2 text-white text-xs !py-1' onClick={()=>setrepaymentform(false)}/>
                <Commonbutton text='cancel'  classname='bg-red-400 !px-2 text-white text-xs !py-1' onClick={()=>setrepaymentform(false)}/>
                </>
            
            }
                {!repaymentform && 
                <Commonbutton text='Add' classname='bg-blue-500 !px-2 text-white text-xs !py-1' onClick={()=>setrepaymentform(true)}/>   
            }
                </div>
                    
    </div>
  )
}

export default Repayments_rows