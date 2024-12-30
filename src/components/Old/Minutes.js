import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Advertisement from './Advertisement'
import { ReactComponent as ImgDocument} from '../assets/icons/document.svg'
import dateFormat from 'dateformat'
import SyncLoader from "react-spinners/SyncLoader";


const Minute = props => {
    const date = dateFormat(props.minute.date, 'mmmm dS, yyyy')

    console.log(props.minute)
    return (
        <div className='minute'>
            <a href={props.minute.file} target='_blank'>
            <ImgDocument/>
            <h3>{'Meeting - ' + date}</h3>
            <p>Click to view</p>
            </a>
        </div>
    )
}

const Minutes = props => {

    const [minutes, setMinutes] = useState([])

    useEffect(() => {
        //axios.get(`http://${process.env.REACT_APP_HOST}:5000/minutes/`)
        axios.get(`${process.env.REACT_APP_HOST}/api/minutes/`)
        .then(response => {
            setMinutes(response.data)
        })
    }, [])

    const minuteItems = minutes.map((minute, index) => 
        <Minute key={index} minute={minute}/>
    )

    return (
        <div>
            <div className='base__header'>
                <img className='base__image' src='/assets/media/cover/project.jpg'></img>
                <h2 className='base__title'>Minutes</h2>
            </div>
            <div className='base__content'>
                <div className='base__items'>
                    {minuteItems.length ? minuteItems : <SyncLoader color={"#0069c0"} className='loader'/>}
                </div>
                <Advertisement/>
            </div>
        </div>
    )
}

export default Minutes