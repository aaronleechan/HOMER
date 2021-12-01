import React from 'react';
import './alert.css'

const Alert = (props) =>{
    const {notification} = props
    return(
        <>
            <div className={notification.status === 'success'  ? 'succcess-alert' : 'error-alert'}>
                {
                    notification.status === 'success' ?
                    <h4>"Success! "</h4>
                    :
                    <h4>"Fail!"</h4>
                }
                {notification.message}
            </div>
        </>
    )
}
export default Alert;