import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import { ReactComponent as ImgUser } from '../assets/icons/user.svg'
import Advertisement from './Advertisement'

const MemberItem = props => {
    
    const position = props.details.position
    const image = props.details.image ? <img className='member-item__image' src={props.details.image}></img> : <ImgUser className='member-item__image'/>

    return (
        <div className='member-item'>
            {image}
            <h3 className='member-item__name'>{props.details.name}</h3>
            <span className='member-item__position'>{position}</span>
        </div>
    )
}

const Members = props => {

    const [items, setItems] = useState([])
    const location = useLocation()
    let title = ''

    switch ( props.match.params.type ) {
        case 'management':
            title = 'Management Committee'
            break
        case 'trustee':
            title = 'Trustee Board'
            break
        case 'advisor':
            title = 'Advisory Body'
            break
    }

    useEffect(() => {
        title = ''
        setItems([])
        //axios.get(`http://${process.env.REACT_APP_HOST}:5000/members/type=${props.match.params.type}`)
        let request = `${process.env.REACT_APP_HOST}/api/members/${props.match.params.type}/`

        axios.get(request)
        .then(response => {
            setItems(response.data)
        })
    }, [location])

    const members = items.map((item, index) => 
        <MemberItem key={index} details={item} />
    )

    return (
        <div>
            <div className='base__header'>
                <img className='base__image' src='/assets/media/cover/project.jpg'></img>
                <h2 className='base__title'>{title}</h2>
            </div>
            <div className='base__content'>
                <div className='base__items'>
                    {members}
                </div>
                <Advertisement/>
            </div>
        </div>
    )
}

export default Members 