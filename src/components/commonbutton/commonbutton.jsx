import React from 'react'

function Commonbutton({
    text = "Submit",
    classname = "",
    ...props
}) {
  return (
    <div>
        <button className={'px-6 py-3 rounded-lg ' + classname} {...props}>{text}</button>
    </div>
  )
}

export default Commonbutton