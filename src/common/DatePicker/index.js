import React from 'react';
import './datePicker.css';

const DatePicker = (props) =>{
    const {name,value,onChange,label,required} = props;


    const handleChange = (event) =>{
        onChange(event.target.value)
    }

    return(
        <div className="date-container">
            <label>{label}</label>
            <input
                type="date"
                name={name}
                value={value}
                onChange={handleChange}
                required = {required || false}
            >
            </input>
        </div>
    )
}

export default DatePicker;