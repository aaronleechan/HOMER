import React,{useEffect,useState} from 'react';
import './displayComponent.css'
import Alert from '../../common/Alert';
import ApplicationForm from '../ApplicationForm';
import ModalDialog from '../../common/ModalDialog';
const axios = require('axios')

const DisplayComponent = (props) =>{
    const {data} = props
    const [displayData,setDisplayData] = useState(data)
    const [showModal,setShowModal] = useState(false)
    const [statusModal,setStatusModal] = useState(false)
    const [title,setTitle] = useState('')
    const [alert,setAlert] = useState({status: '',message: ''})
    const [editObj,setEditObj] = useState({})

    useEffect(()=>{
        setDisplayData(data)
    },[data])

    useEffect(()=>{
        if(showModal){
            setAlert({status: '',message: ''})
        }
    },[showModal])

    useEffect(()=>{
        if(alert.status){
            setStatusModal(true)
        }else{
            setStatusModal(false)
        }
    },[alert])

    const removeItem = async (id) =>{
        try{
            let removeData = await axios.delete(`/api/banner/${id}`)
            let {response,message,status} = removeData.data
            setDisplayData(response.models)
            setAlert({message: message,status: status})
        }catch(e){
            console.log(e)
        }
    }

    const onSubmit = async (data) =>{
        let newData = await axios.post(`/api/banner/`,{...data})
        let {response,message,status} = newData.data
        setDisplayData(response.models)
        setAlert({message: message,status: status})
    }

    const editItem = (index)=>{
        setTitle("Edit New Banner")
        setEditObj(displayData[index])
        setShowModal(true)
    }

    const convertMonthDateYear = (date) =>{
        let newFormat = new Date(date)
        let month = newFormat.getMonth()+1
        if(month < 9){
            month = `0${month}`
        }
        return `${month}/${newFormat.getDate()}/${newFormat.getFullYear()}`
    }

    const renderingHeader = () =>{
        let header = []
        header.push(
            <tr className="header-container" key={1}>
                <th>Action</th>
                <th>Headline</th>
                <th>Link</th>
                <th>BG Color</th>
                <th>Icon</th>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
        )
        return header;
    }

    const renderingBody = () =>{
        let body = []
        if(displayData.length > 0){
            displayData.map((v,index)=>{
                const {bannerText,bannerLink,bannerColor,bannerIcon,startDate,endDate,id} = v
                body.push(
                    <tr className="body-container" key={id}>
                        <td className="action" key={`${id}-action`}> 
                            <i onClick={()=>editItem(index)} className='fas fa-pen'></i>
                            <button onClick={()=>removeItem(id)} type="button">Delete</button>
                        </td>
                        <td>{bannerText}</td>
                        <td>{bannerLink}</td>
                        <td>{bannerColor}</td>
                        <td>{bannerIcon ? <img src={bannerIcon}/> : ''}</td>
                        <td>{convertMonthDateYear(startDate)}</td>
                        <td>{convertMonthDateYear(endDate)}</td>
                    </tr>
                )
            })
        }
        return body
    }

    const addNewbanner = () =>{
        setEditObj({})
        setTitle("Add New Banner")
        setShowModal(true)
    }

    const MyContext = React.createContext();

    return(
        <div className="container">

            <ApplicationForm onSubmit={onSubmit} setShowModal={setShowModal} showModal={showModal} title={title} edit={editObj}/>
            <ModalDialog title="Notification" setShowModal={setStatusModal} showModal={statusModal}body={<Alert notification={alert}/>}/>

            <table>
                <thead>{renderingHeader()}</thead>
                <tbody>{renderingBody()}</tbody>
            </table>
            
            <div className="new-button-icon">
                <i onClick={()=>addNewbanner()} className='fas fa-plus'>Add New Banner</i>
            </div>
            
        </div>
    )
}

export default DisplayComponent