import React, { useState } from 'react'
import Advertisement from './Advertisement'
import { useForm } from "react-hook-form"
import axios from 'axios'
import MembershipFromDoc from '../assets/docs/General_Membership_From.odt'


const Membership = props => {

    const [ emailStatus, setEmailStatus ] = useState()
    const { register, handleSubmit, errors, reset } = useForm()
    const submitMembership = data => {
        console.log(data)
        axios.post(`${process.env.REACT_APP_HOST}/api/membership/`, data)
        .then(response => {
            console.log(response)
            setEmailStatus(response.status)
            reset()
        })
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
                <h1 className='base__title'>General Membership From</h1>
            </div>
            {formStatus}
            <div className='base__content'>
                <div className=''>
                    <a className='membership__print' href={MembershipFromDoc} target='_blank'>Click here to download the printable version</a>
                    <p className='membership__intro'>Our general membership is £12 per family, If you wish to apply, please transfer the sum into our back account. We will contact you to confirm your registration.
                        <br></br>Account Name: PNS
                        <br></br>Bank: TSB
                        <br></br>Sort code: 30-96-60
                        <br></br>Account Number: 00152108
                        <br></br>Thank you!
                    </p>
                    <form onSubmit={handleSubmit(submitMembership)}>
                        <label className='form__label' for='contact-name'>Name (Please list full names of all family members who wish to join)</label>
                        <input className='form__input'id='contact-name' name='name' type='text' placeholder='enter your name here..' ref={register}></input>

                        <label className='form__label' for='contact-email'>Email</label>
                        <input className='form__input' id='contact-email' name='email' type='email' placeholder='enter your email here..' ref={register}></input>

                        <label className='form__label' for='contact-address'>Address</label>
                        <input className='form__input' id='contact-address' name='address' type='text' placeholder='enter your address here..' ref={register}></input>

                        <label className='form__label' for='contact-phone'>Phone</label>
                        <input className='form__input' id='contact-phone' name='phone' type='number' placeholder='enter your phone number here..' ref={register}></input>

                        <label className='form__label' for='contact-date'>Date of payment</label>
                        <input className='form__input' id='contact-date' name='date' type='date' ref={register}></input>

                        <label className='form__label' for='contact-comments'>Comments (optional)</label>
                        <textarea className='form__input' id='contact-comments' name='comments' type='text' placeholder='enter your comments here..' ref={register}></textarea>
                        <button className='form__submit' type='submit'>Submit</button>
                    </form>
                </div>
                <Advertisement/>
            </div>
        </div>
    )
}

export default Membership