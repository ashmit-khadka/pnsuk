import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
//import Event from './Event'
import Advertisement from './Advertisement'
import InfiniteScroll from "react-infinite-scroller";


const Event = props => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

const Events = props => {


    const [items, setItems] = useState([])
    const title = 'Upcomming Events'

    document.title = 'Upcomming Events | Peterborough Nepalese Society'

    const getArticles = () => {
        console.log('getting items..')
        let request = `${process.env.REACT_APP_HOST}/api/upcomming-events/`

        axios.get(request)
        .then(response => {
            console.log(request)
            setItems(items.concat(response.data))
        })
    }

    const content = items.map((item, index) => 
        <Event key={index} content={item}/>
    )

    //console.log(content)

    return (
        <div className='category'>
            <div className='base__header'>
                <img className='base__image' src='/assets/media/cover/project.jpg'></img>
                <h2 className='base__title'>{title}</h2>
            </div>
            <div className='base__content'>
                    <InfiniteScroll className='base__items'
                        loadMore={getArticles}
                        hasMore={true}
                        >
                        {content}
                    </InfiniteScroll>
                <Advertisement/>
            </div>
        </div>
    )
}


export default Events