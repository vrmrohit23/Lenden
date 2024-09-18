import React,{useId, useMemo} from 'react'
import { monthsnames } from '../essentials/currentDMY_Exp'
function Selectfield({options = [], label ,value,classname='',...props},ref) {
    let labelid = useId()
  return (
      <div >
    {label && <label className='block font-semibold text-nowrap mb-1 sm:mb-2' htmlFor={labelid}>{label}</label>}
    <select id={labelid} value={value} ref={ref} className={' border-2 rounded-lg py-2 outline-none focus:border-blue-600 mb-2 sm:mb-5 '+classname} {...props}>
        {useMemo(()=> options.map((option)=>{
         return label != 'Month'?
         <option key={option.id || option}
            value={option.id || option}  >
                {option.name || option}
            </option>
            :
            <option key={option} 
            value={option}>
              {monthsnames[option]}
            </option>
        }  
      )

,[options]
)
}
    </select>
    </div>
  )
}

export default React.forwardRef(Selectfield)