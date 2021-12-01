import React,{useEffect, useState} from 'react';
import ModalDialog from '../../common/ModalDialog';
import TextArea from '../../common/TextArea';
import DatePicker from '../../common/DatePicker';

const ApplicationForm = (props) =>{
    
    const {onSubmit,showModal,setShowModal,title,edit} = props;

    const [text,setText] = useState('')
    const [link,setLink] = useState('')
    const [color,setColor] = useState('')
    const [icon,setIcon] = useState('')
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')

    const dateConvertString = (value) =>{
        let dateFormat = new Date(value)
        let year = dateFormat.getFullYear()
        let month = dateFormat.getMonth() + 1
        let date = dateFormat.getDate()
        if(month < 10){
            month = `0${month}`
        }
        if(date < 10){
            date = `0${date}`
        }
        let toString = year + "-" + month + "-" + date
        return toString
    }


    useEffect(()=>{
        setText(edit.bannerText ? edit.bannerText : '')
        setLink(edit.bannerLink ? edit.bannerLink : '')
        setColor(edit.bannerColor ? edit.bannerColor : '')
        setIcon(edit.bannerIcon ? edit.bannerIcon : '')
        setStartDate(edit.startDate ? dateConvertString(edit.startDate) : '')
        setEndDate(edit.endDate ? dateConvertString(edit.endDate) : '')
    },[edit])

    const handleSubmit = (event) =>{
        event.preventDefault();
        let data = {
            id: event.target.id.value,
            bannerColor: event.target.bannerColor.value,
            bannerLink:  event.target.bannerLink.value,
            bannerText: event.target.bannerText.value,
            bannerIcon: event.target.bannerIcon.value,
            startDate: event.target.startDate.value,
            endDate:   event.target.endDate.value
        }
        onSubmit(data)
        setShowModal(false)
    }

    return(
        <form onSubmit={handleSubmit}>
            <ModalDialog 
                showModal={showModal}
                setShowModal={setShowModal}
                title={title}
                body={
                    <>
                        <input name="id" value={edit.id ? edit.id : ''} hidden={true}/>
                        <TextArea value={text}  onChange={setText}  rows={2}    name="bannerText" label="Headline" required/>
                        <TextArea value={link}  onChange={setLink}  rows={2}    name="bannerLink" label="Link" required/>
                        <TextArea value={color} onChange={setColor} rows={2}    name="bannerColor" label="BG Color" required/>
                        <TextArea value={icon}  onChange={setIcon}  rows={2}    name="bannerIcon" label="Icon"/>
                        <DatePicker value={startDate} onChange = {setStartDate} name="startDate" label="Start Date" required/>
                        <DatePicker value={endDate} onChange = {setEndDate} name="endDate" label="End Date" required/>
                    </>
                }
                footer={
                    <>
                        <button type="button" onClick={()=>setShowModal(!showModal)}> Cancel</button>
                        &nbsp;&nbsp;
                        <button type="submit"> Save</button>
                    </>
                }
            />
        </form>
    )
}

export default ApplicationForm