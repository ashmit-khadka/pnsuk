import React from 'react';
import { Link } from 'react-router';
import DocGlance from '../assets/docs/PNS_glance.pdf';
import { ReactComponent as IconLinkedIn } from "../assets/icons/linkedin.svg";
import { Button } from 'react-bootstrap';

const Footer = props => {
    return (
        <div className='bg-themeDark text-white p-4 pt-8 pb-32 mt-24 w-full flex justify-center text-center'>
            <div className='w-page'>
                <div className='py-4 flex justify-between flex-wrap gap-4'>
                <Button as={Link} className='min-w-[100px] max-w-[200px]' to='/category/type=aid'>Donations</Button>
                    <Button as={Link} className='min-w-[100px] max-w-[200px]' to='/category/type=event'>Events</Button>
                    <Button as={Link} className='min-w-[100px] max-w-[200px]' to='/category/type=project'>Projects</Button>
                    <Button as={Link} className='min-w-[100px] max-w-[200px]' to='/advertise'>Advertise</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href={DocGlance}>About Us</Button>
                    <Button as={Link} className='min-w-[100px] max-w-[200px]' to='/contact-us'>Contact Us</Button>
                </div>
                <p className='footer__description'>PNS is committed in helping its members to integrate better with the core British values, while preserving their own culture, faith and religion, and bringing in richness of Nepalese culture to Britain. It also aims to conduct small-scale charity work in Nepal, in particular, helping under-privileged and socially deprived children.</p>
                <h3 className='font-lora pt-4 pb-2'>Useful Links</h3>
                <div className='flex justify-between flex-wrap gap-4'>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='https://www.gov.uk/government/organisations/uk-visas-and-immigration'>Home Office UK Visas & Immigration</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='https://www.gov.uk/government/organisations/charity-commission'>Charity Commision UK</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='https://www.cambs.police.uk/report/report'>Cambridgeshire Constabulary</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/42-uk-visa-application-centre-ktm.html'>UK Visa Application Centre KTM</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/47-work-permit.html'>Work Permit</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='https://www.citizensadvice.org.uk/'>Citizens Advice</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/17-foreign-travel-office-nepal.html'>Foreign Travel Advice - Nepal</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='https://www.peterborough.gov.uk/'>Peterborough City Council</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='http://www.nepalimmigration.gov.np/'>Department of Immigration</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/19-hm-revenue-a-customs.html'>HM Revenue & Customs</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='https://www.nwangliaft.nhs.uk/our-hospitals/peterborough-city-hospital/'>Peterborough City Hospital</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='http://www.nepalisamajuk.com/component/weblinks/76-nsuk-useful-links/21-identity-a-passport-service.html'>HM Passport Office</Button>
                    <Button as="a" className='min-w-[100px] max-w-[200px]' href='https://uk.nepalembassy.gov.np/'>Embassy of Nepal, London</Button>
                </div>
                {/* <div className='footer__link footer__link--credit margin-top-medium'>                    
                    <a href="https://www.linkedin.com/in/ashmit-khadka/">Website Created by Ashmit Khadka {<IconLinkedIn/>}</a>
                </div> */}
            </div>
        </div>
    )
}

export default Footer;