import React from 'react'
import '../css/CustomInput.css'

function CustomInput({level,name,type,placeholder,onchange,value}) {
  return (
    <div>
       <div className="form-group">
                        <label>{level}</label>
                        <input className="input" type={type} name={name} placeholder={placeholder} value={value} 
                            onChange={onchange}/>
                    </div>

    </div>
  )
}

export default CustomInput
