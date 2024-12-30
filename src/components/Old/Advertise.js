import React from 'react'
import Advertisement from './Advertisement'


const Advertise = props => {
    return (
        <div className='base'>
            <div className='base__header'>
                <img className='base__image' src='/assets/media/cover/project.jpg'></img>
                <h1 className='base__title'>Advertise</h1>
            </div>
            <div className='base__content'>
                <div className='advertise'>
                    <h2 className='text-large'>What can we offer?</h2>
                    <p className='text-medium margin-top-small'>                    
                        pnsuk.org, a website of community (Nepalese) charity organisation registered in the UK, is offering you an opportunity to promote your business through disseminating your business information to many of our users and community at large. This is the only one Nepalese community based web portal in Peterborough attracting hundreds of Nepalese users/community living in and around Peterborough, Spalding, Cambridge, Bourne, Huntingdon, Norwich and Leicester and more. We, at PNS UK, are helping you by offering space for your static business banner with a very little cost for a requested period of time which is linked to you own preferred page or business website. Our ads are competitively priced per month and can be extended as per your request.
                    </p>
                    <div className='advertise__section margin-top-large'>
                        <div className='advertise__pricing'>
                            <h3 className='advertise__title'>AD Scheme</h3>
                            <ul className='advertise__pricing-list'>
                                <li>(available for commercial adverts only)</li>
                                <li>Size: minimum 100x100 pixels</li>
                                <li>Price: £25 for a month</li>
                                <li>Price: £65 for 3 months</li>
                                <li>Price: £120 for 6 months</li>
                                <li>Price: £220 for a year</li>
                            </ul>
                        </div>
                        <div className='advertise__example'></div>

                    </div>
                </div>
                <Advertisement/>
            </div>
        </div>
    )
}

export default Advertise