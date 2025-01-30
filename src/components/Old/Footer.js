import React from 'react'
import { Link } from 'react-router'
import DocGlance from '../assets/docs/PNS_glance.pdf'
import {ReactComponent as IconLinkedIn} from "../assets/icons/linkedin.svg"

const Footer = props => {
    return (
        <div className='footer'>
            <div className='footer__container'>
                <div className='footer__links'>
                    <Link className='footer__link footer__link--internal' to='/category/type=aid'>Donations</Link>
                    <Link className='footer__link footer__link--internal' to='/category/type=event'>Events</Link>
                    <Link className='footer__link footer__link--internal' to='/category/type=project'>Projects</Link>
                    <Link className='footer__link footer__link--internal' to='/advertise'>Advertise</Link>
                    <a className='footer__link footer__link--internal' href={DocGlance}>About Us</a>
                    <Link className='footer__link footer__link--internal' to='/contact-us'>Contact Us</Link>
                </div>
                <p className='footer__description'>PNS is committed in helping its members to integrate better with the core British values, while preserving their own culture, faith and religion, and bringing in richness of Nepalese culture to Britain. It also aims to conduct small-scale charity work in Nepal, in particular, helping under-privileged and socially deprived children.</p>
                <h3 className='footer__useful-links-title'>Useful Links</h3>
                <div className='footer__useful-links margin-top-medium'>
                    <a className='footer__link footer__link--external' href='https://www.gov.uk/government/organisations/uk-visas-and-immigration'>Home Office UK Visas & Immigration</a>
                    <a className='footer__link footer__link--external' href='https://www.gov.uk/government/organisations/charity-commission'>Charity Commision UK</a>
                    <a className='footer__link footer__link--external' href='https://www.cambs.police.uk/report/report'>Cambridgeshire Constabulary</a>
                    <a className='footer__link footer__link--external' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/42-uk-visa-application-centre-ktm.html'>UK Visa Application Centre KTM</a>
                    <a className='footer__link footer__link--external' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/47-work-permit.html'>Work Permit</a>
                    <a className='footer__link footer__link--external' href='https://www.citizensadvice.org.uk/'>Citizens Advice</a>
                    <a className='footer__link footer__link--external' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/17-foreign-travel-office-nepal.html'>Foreign Travel Advice - Nepal</a>
                    <a className='footer__link footer__link--external' href='https://www.peterborough.gov.uk/'>Peterborough City Council</a>
                    <a className='footer__link footer__link--external' href='http://www.nepalimmigration.gov.np/'>Department of Immigration</a>
                    <a className='footer__link footer__link--external' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/19-hm-revenue-a-customs.html'>HM Revenue & Customs</a>
                    <a className='footer__link footer__link--external' href='https://www.nwangliaft.nhs.uk/our-hospitals/peterborough-city-hospital/'>Peterborough City Hospital</a>
                    <a className='footer__link footer__link--external' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/21-identity-a-passport-service.html'>HM Passport Office</a>
                    <a className='footer__link footer__link--external' href='https://uk.nepalembassy.gov.np/'>Embassy of Nepal, London</a>
                </div>
                <div className='footer__link footer__link--credit margin-top-medium'>                    
                    <a href="https://www.linkedin.com/in/ashmit-khadka/">Website Created by Ashmit Khadka {<IconLinkedIn/>}</a>
                </div>
            </div>
        </div>
    )
}

export default Footer