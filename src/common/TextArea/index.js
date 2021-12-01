import React from 'react';
import './textArea.css';

const TextArea = (props) =>{
    const {name,value,rows,placeholder,required,onChange,label} = props;


    const handleChange = (event) =>{
        onChange(event.target.value)
    }

    return(
        <div className="textarea-container">
            <label>{label}</label>
            <textarea
                name={name}
                value={value}
                rows = {rows || 2} 
                placeholder={placeholder}
                onChange={handleChange}
                required = {required || false}
            >
            </textarea>
        </div>
    )
}

export default TextArea;