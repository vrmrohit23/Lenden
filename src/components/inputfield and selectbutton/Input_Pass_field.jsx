import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useState } from "react"
import React from 'react'


function Input_Pass_field({
  labelclassname = '',

  label = 'Password:',
  classname = '',
  ...props
}, ref) {
  const [showpassword, setshowpassword] = useState(false);
  const id = useId()
  return (
    <>
      <label htmlFor={id} className={"block font-semibold mb-2 " + labelclassname}>
        {label} </label>
      <div className="relative">
        <input type={showpassword ? "text" : "password"} placeholder="Enter Password" className={"px-4 py-2 focus:border-blue-600 border-2 rounded-lg  outline-none border-gray-200 duration-200 w-full " + classname} id={id} {...props} ref={ref} />
        <div className={`absolute inset-y-0  pr-3 right-0 flex items-center cursor-pointer`} onClick={() => setshowpassword(!showpassword)} >{showpassword ? <FontAwesomeIcon icon='fa-solid fa-eye-slash' /> : <FontAwesomeIcon icon='fa-solid fa-eye' />}</div>

      </div>
    </>
  )
}

export default React.forwardRef(Input_Pass_field)