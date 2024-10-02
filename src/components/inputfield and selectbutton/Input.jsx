import { useId } from "react"
import React from 'react'

function Input({
    labelclassname = '',
    label,
    type = 'text',
    placeholder = 'input',
    classname = '',
    ...props
},ref) {
    const id = useId()
  return (
    <div>
        {label && <label htmlFor={id} className={"block font-semibold  mb-1 sm:mb-2 "+labelclassname}>
           {label} </label>}
           <input type={type} placeholder={placeholder} className={"px-4 py-2 focus:border-blue-600 border-2 rounded-lg mb-2 sm:mb-5 outline-none border-gray-200 duration-200 " + classname} id={id} {...props} ref={ref} />
    </div>
  )
}

export default React.forwardRef(Input)