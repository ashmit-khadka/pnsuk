import React from 'react'





const GalleryMain = (props) => {
    console.log(props)
    return (
        <div className='gallery-main'>
            <img className='gallery-main__image gallery-main__image--background' src='/assets/media/event_imgs/IMG-3d1df6771babec57f5474b5a16e019b1-V6866.b20dbbe96e4f.jpg'></img>
            <div className='gallery-main__container'>
                <img className='gallery-item-focus__image' src='/assets/media/event_imgs/IMG-3d1df6771babec57f5474b5a16e019b1-V6866.b20dbbe96e4f.jpg'></img>
                <div className='gallery-main__gradient'>
                </div>

                <div className='gallery-main__text'>
                    <p className='gallery-main__title'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    <p className='gallery-main__description'>Vestibulum molestie neque nisl, eu sodales ipsum aliquet vitae. Integer id magna in massa semper dignissim. Sed interdum hendrerit tellus, non finibus eros. Sed nec tellus efficitur felis tincidunt ornare quis id augue</p>
                </div>
            </div>

        </div>
    )
}

export default GalleryMain