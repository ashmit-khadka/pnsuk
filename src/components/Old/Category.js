import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import ContentCard from './ContentCard'
import Event from './Event'
import Advertisement from './Advertisement'
import InfiniteScroll from "react-infinite-scroller";
import SyncLoader from "react-spinners/SyncLoader";

const Category = props => {

    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState([])
    const location = useLocation()

    let title = ''
    switch ( props.match.params.type ) {
        case 'news':
            title = 'News'
            break
        case 'project':
            title = 'Projects'
            break
        case 'event':
            title = 'Events'
            break
        case 'guest':
            title = 'Guests'
            break
        case 'aid':
            title = 'Donations'
            break
        case 'upcomming':
            title = 'Upcomming Events'
            break
    }
    document.title = title + ' | Peterborough Nepalese Society'

    const getArticles = () => {

        let date = (new Date()).toISOString().split('T')[0]
        if (items.length)
            date = items[items.length-1].date

        let request = props.match.params.type === 'upcomming' ? 
            `${process.env.REACT_APP_HOST}/api/upcomming-events/` :
            `${process.env.REACT_APP_HOST}/api/articles/${props.match.params.type}/${date}/9/`
        //console.log('req', request)
        axios.get(request)
            .then(response => {
                console.log('getting items..', request)
                //no more articles are returned for the category or if all upcomming events are loaded at once
                if (response.data.length == 0 || items.length > 0 & props.match.params.type === 'upcomming')
                    setHasMore(false)
                else
                    setItems(items.concat(response.data))
            })
    }

    useEffect(() => {
        console.log('changing..', props.match.params.type)
        title = ''
        setItems([])
        setHasMore(true)
    }, [props.match.params.type])

    const content = items.map((item, index) => 
        props.match.params.type === 'upcomming' ? 
            <Event key={index} content={item}/> : 
            <ContentCard key={index} content={item}/>
    )
    
    return (
        <div className='category'>
            <div className='base__header'>
                <img className='base__image' src='/assets/media/cover/project.jpg'></img>
                <h2 className='base__title'>{title}</h2>
            </div>
            <div className='base__content'>
                    <InfiniteScroll className='base__items'
                        loadMore={getArticles}
                        hasMore={hasMore}
                        loader={<SyncLoader color={"#0069c0"} className='loader'/>}
                        >
                        {content}
                    </InfiniteScroll>
                <Advertisement/>
            </div>
        </div>
    )
}

export default Category