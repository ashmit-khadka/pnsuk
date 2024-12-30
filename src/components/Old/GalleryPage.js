import React from 'react'
import Gallery from './Gallery'
import Advertisement from './Advertisement'


const GalleryPage = (props) => { 

    return (
        <div className='base'>
            <div className='base__header'>
                <img className='base__image' src='/assets/media/cover/project.jpg'></img>
                <h2 className='base__title'>Gallery</h2>
            </div>
            <div className=''>
                        <Gallery />
                    
            </div>
        </div>
    )
}

export default GalleryPage