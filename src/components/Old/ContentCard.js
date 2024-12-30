import React from 'react'
import { NavLink } from 'react-router-dom'
import dateFormat from 'dateformat'
import { ReactComponent as ImgFacebook } from '../assets/icons/facebook.svg'
import { ReactComponent as ImgViber } from '../assets/icons/viber.svg'


const ContentCard = props => {
    
    //console.log(props)
    const articleURL = '/article/id=' + props.content.id
    const date = dateFormat(props.content.date, 'mmmm dS, yyyy')

    return (
        <div className='content-card' data-aos="fade-up">
            <NavLink to={articleURL}><img className='content-card__image' src={props.content.image} alt='None'></img></NavLink>
            <div className='content-card__details'>

                <NavLink className='content-card__title' to={articleURL}><h3 className='content-card__title'>{props.content.title}</h3></NavLink>
                <time dateTime={props.content.date}><span className='content-card__date'>{date}</span></time>
                <p className='content-card__description'>{props.content.text ? props.content.text.slice(0,75) : ''}</p>
            </div>
            <div className='content-card__share'>
                <ImgFacebook className='content-card__share-item'/>
                <ImgViber className='content-card__share-item'/>
            </div>
        </div>
    )
}

export default ContentCard