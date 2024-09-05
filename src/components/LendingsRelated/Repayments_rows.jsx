import React, { useState } from 'react'
import { Commonbutton, Selectfield } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import documentobject from '../../appwrite/getlendingsdata';
import { useDispatch } from 'react-redux';
import { update_Repayments } from '../../contexts/lendingsSlice';
function Repayments_rows({ repayments,id,index }) {
    const [repaymentform, setrepaymentform] = useState(false);
    const [formdata,setformdata] = useState({
        Date:'',
        Method:'Cash',
        Amount:''
    })
    console.log(index)
    const dispatch = useDispatch();
    const add_Repayments=async()=>{
        let date = formdata.Date.split("-").reverse().join("-");
        let arraystring = [];
        repayments.map((item)=>{
            arraystring.push(JSON.stringify(item));
        })
        arraystring.push(JSON.stringify(formdata));
        try{
        let response = await documentobject.updatedocument_Repayments(id,arraystring)
        if(response){
            formdata.Date = date
            let array = [...repayments,formdata]
            dispatch(update_Repayments({index:index,repayments:array}));
        }   
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <table className='w-full text-slate-400  font-light border-2 mt-3 text-xs  max-h-20 overflow-auto '>
                <thead >
                    <tr>

                    <th className='font-normal '>Date</th>
                    <th className='font-normal'>Method</th>
                    <th className='font-normal'>Amount</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-900'>
                    {repayments.map((data, index) => {
                        return <tr key={index}>
                            <td className='text-center max-w-10'>{data.Date}</td>
                            <td className='text-center'>{data.Method}</td>
                            <td className='text-center'>{data.Amount}</td>
                            <td title='delete' className='  bg-transparent  p-0 duration-200 text-center  hover:text-red-500  text-base cursor-pointer ' onClic>
                                <FontAwesomeIcon icon="fa-solid fa-minus" /></td>
                        </tr>
                    })
                    }
                    <tr className={(repaymentform ? '' : 'hidden')}>
                        <td className=''>
                            <input className='text-center text-black font-bold' type="date" value={formdata.Date}  onChange={(e)=>{
                                setformdata({...formdata,Date:e.target.value}); 
                            }}/>
                        </td>

                        <td >
                            <Selectfield className='max-w-full text-black font-bold' value={formdata.Method} onChange={(e)=>setformdata({...formdata,Method:e.target.value})} options={['Cash', 'Paytm', 'Gpay']} />
                        </td>

                        <td className='max-w-16  overflow-hidden '>
                             <input type="text" placeholder='Amount' className='text-center max-w-16 text-black font-bold' value={formdata.Amount} onChange={(e)=>{setformdata({...formdata,Amount:e.target.value}); 
                             let rev = 
                                e.target.value.split().reverse().join()
                                console.log( rev)
                                }}/>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div className='mb-5 flex justify-center'>


                <Commonbutton text='save' classname={'bg-blue-500 !px-2 text-white text-xs !py-1 ' + (repaymentform ? '' : 'hidden')} onClick={() =>{
                     if(formdata.Amount != '' && formdata.Date != ''){setrepaymentform(false);add_Repayments()}
                     }} />
                <Commonbutton text='cancel' classname={'bg-red-400 !px-2 text-white text-xs !py-1 ' + (repaymentform ? '' : 'hidden')} onClick={() => setrepaymentform(false)} />
                {/** The below button is for creating the add new repayment row */}
                <Commonbutton text='Add' classname={'bg-blue-500 !px-2 text-white text-xs !py-1 ' + (repaymentform ? 'hidden' : '')} onClick={() => setrepaymentform(true)} />

            </div>

        </div>
    )
}

export default Repayments_rows