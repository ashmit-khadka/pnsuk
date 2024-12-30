import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';

import axios from 'axios'
import ContentCard from './ContentCard'
import Advertisement from './Advertisement'

import dateFormat from 'dateformat'


const Article = props => {
    
    const [article, setArticle] = useState()
    const [moreItems, setMoreArticle] = useState([])
    const location = useLocation()
    const date = article ? dateFormat(article.date, 'mmmm dS, yyyy') :  <Skeleton />

    console.log(`${process.env.REACT_APP_HOST}/api/article/id/${props.match.params.id}/`)

    const getArticle = () => {
        axios.get(`${process.env.REACT_APP_HOST}/api/article/id/${props.match.params.id}/`)
        .then(response => {
            setArticle(response.data[0])
            console.log('articles', response.data)
        })
        //axios.get(`http://${process.env.REACT_APP_HOST}:5000/articles/samples/count=3`)
        axios.get(`${process.env.REACT_APP_HOST}/api/article/samples/3/`)
        .then(response => {
            setMoreArticle(response.data)
            console.log(response.data)
        })
    }

    useEffect(() => {
        setArticle()
        setMoreArticle([])
        getArticle()
    }, [location])

    //const image_src = article ? '/assets/media/article_imgs/' + article.image : ''
    const image_src = article ? article.image : ''
    const content = moreItems.map((item, index) => 
        <ContentCard key={index} content={item}/>
    )

    return (
        <div className='article'>
            <div className='base__content'>
                <div className='article__details'>
                    <div className='article__info'>
                        <span className='article__tag'>News</span>
                        <h2 className='article__title'>{article ? article.title :  <Skeleton/>}</h2>
                        <span className='article__tag'>{date}</span>
                        <div className='article__image margin-top-medium'>
                            {article ? <img className='article__image--background' src={image_src}></img> : <Skeleton height={500}/>}
                            <img className='article__image--main' src={image_src}></img>
                        </div>
                        <p className='article__text'>{article ? article.text :  <Skeleton count={10}/>}</p>
                    </div>
                    <h3 className='article__more'>More articles</h3>
                    <div className='article__more-items'>
                        {content}
                    </div>
                </div>
                <Advertisement/>
            </div>
        </div>
    )
}

export default Article

