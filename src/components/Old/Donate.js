import React from 'react' 
import { ReactComponent as IconClose } from '../assets/icons/cancel.svg'

const toggleModal = () => {
    document.getElementById('donate-modal').classList.toggle('hide')
}

const Donate = props => {
    return (
        <div className='hide' id='donate-modal' >
            <div className='donate__background' onClick={toggleModal}></div>
            <div className='donate__content'>
                <IconClose onClick={toggleModal}/>
                <h2>Thank you</h2>
                <span>Please donate via this bank account and email us at peterborough.nepalesesociety@gmail.com</span>
                <ul>
                    <li>Account Name: PNS</li>
                    <li>Bank: TSB</li>
                    <li>Sort code: 30-96-60</li>
                    <li>Account Number: 00152108</li>
                </ul>
                <span>Thank you for your donation, every little helps.</span>
            </div>
        </div>
    )
}

export default Donate