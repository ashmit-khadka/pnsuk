import React from 'react'
import dateFormat from 'dateformat'
import { ReactComponent as IconLocation } from '../assets/icons/location.svg'
import { ReactComponent as IconCalendar } from '../assets/icons/calendar.svg'
import { ReactComponent as IconContact } from '../assets/icons/mail.svg'
import { ReactComponent as IconEvent } from '../assets/icons/party.svg'

const Event = props => {
    //const date = dateFormat(props.content.date, 'dddd, mmmm dS, yyyy, hh:mm tt')

    return (
        <div className='event'>
            <IconEvent className='event__icon'/>
            <h3>{props.content.title}</h3>
            <p><IconCalendar/>{props.content.date}</p>
            <p><IconLocation/>{props.content.location}</p>
            <p><IconContact/>{props.content.contact}</p>
            <p>{props.content.description}</p>
            
        </div>
    )
}

export default Event