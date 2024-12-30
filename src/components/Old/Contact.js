import React, { useState } from 'react'
import Advertisement from './Advertisement'
import { useForm } from "react-hook-form"
//import sendmail from 'sendmail'

import axios from 'axios'

const Contact = props => {

    const [ emailStatus, setEmailStatus ] = useState()
    const { register, handleSubmit, errors, reset } = useForm()
    const submitMessage = data => {
        console.log(data)
        axios.post(`${process.env.REACT_APP_HOST}/api/contact/`, data)
        .then(response => {
            console.log(response)
            setEmailStatus(response.status)
        })
        reset()
    }

    let formStatus = ''
    if (emailStatus == 200) {
        formStatus = <div className='form__message form__message--successful'>Your message was sent successfully, thank you.</div>
    }
    else if (emailStatus == 400) {
        formStatus = <div className='form__message form__message--unsuccessful'>Your message was not sent, please try again later.</div>
    }

    return (
        <div className='base'>
            <div className='base__header'>
                <img className='base__image' src='/assets/media/cover/project.jpg'></img>
                <h2 className='base__title'>Contact Us</h2>
            </div>
            {formStatus}
            <div className='base__content'>
                <div className='base__items'>   
                    <div className='contact__body'>       
          
                        <form onSubmit={handleSubmit(submitMessage)}>
                            <label className='form__label' htmlFor='contact-name'>Name</label>
                            <input className='form__input'id='contact-name' name='name' type='text' placeholder='enter your name here..' ref={register}></input>
                            <label className='form__label' htmlFor='contact-email'>Email</label>
                            <input className='form__input' id='contact-email' name='email' type='email' placeholder='enter your email here..' ref={register}></input>

                            <label className='form__label' htmlFor='contact-subject'>Subject</label>
                            <input className='form__input' id='contact-subject' name='subject' type='text' placeholder='enter your subject here..' ref={register} ></input>
                            <label className='form__label' htmlFor='contact-text'>Text</label>
                            <textarea className='form__input' id='contact-text' name='message' type='text' placeholder='enter your thoughts here..' ref={register}></textarea>
                            <button className='form__submit' type='submit'>Submit</button>
                        </form>
                        <div className='contact__details'>
                            <h3 className='text-medium'>Email</h3>
                            <ul className='contact__info-list'>
                                <li>nepalisociety@pnsuk.org</li>
                                <li>peterborough.nepalesesociety@gmail.com</li>
                            </ul>
                            <h3 className='text-medium margin-top-medium'>Phone</h3>
                            <ul className='contact__info-list'>
                                <li>Mr. Keshab Khatiwada: 07958 452503</li>
                            </ul>
                            <h3 className='text-medium margin-top-medium'>Address</h3>
                            <ul className='contact__info-list'>
                                <li>119 Charlotte Way,</li>
                                <li>Peterborough,</li>
                                <li>Cambridgeshire,</li>
                                <li>PE3 9ES</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Advertisement/>
            </div>
        </div>
    )
}

export default Contact