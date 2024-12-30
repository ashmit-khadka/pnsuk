import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Gallery from './Gallery'
import ContentCard from './ContentCard'
import Event from './Event'
import Advertisement from './Advertisement'
import {ReactComponent as ImgProject}  from '../assets/icons/teamwork.svg'
import {ReactComponent as ImgAid}  from '../assets/icons/heart.svg'
import {ReactComponent as ImgGuest}  from '../assets/icons/party.svg'
import DocConstitution from '../assets/docs/constitution.pdf'
import DocGlance from '../assets/docs/PNS_glance.pdf'
import DocHall from '../assets/docs/community_hall_2023.pdf'

const Home = (props) => {

    
    const [ latestItems, setLatestItems ] = useState([])
    const [ projectItems, setProjectItems ] = useState([])
    const [ aidItems, setAidItems ] = useState([])
    const [ eventItems, setEventItems ] = useState([])
    const [ upcommingItems, setUpcommingItems ] = useState([])
    const [ trusteeChair, setTrusteChair ] = useState(null)

    //the number of latest items to show in the home page.
    const latestItemsCount = 4

    useEffect(() => {
        const date = (new Date()).toISOString()
        axios.all([
            //axios.get(`http://${process.env.REACT_APP_HOST}:5000/articles/type/type=event&date=${date}&count=0`),
            //axios.get(`http://${process.env.REACT_APP_HOST}:5000/articles/type/type=project&date=${date}&count=0`),
            //axios.get(`http://${process.env.REACT_APP_HOST}:5000/articles/type/type=aid&date=${date}&count=0`),
            //axios.get(`http://${process.env.REACT_APP_HOST}:5000/articles/type/type=event&date=${date}&count=0`),
           
            axios.get(`${process.env.REACT_APP_HOST}/api/articles/all/${latestItemsCount}`),
            axios.get(`${process.env.REACT_APP_HOST}/api/article/project/`),
            axios.get(`${process.env.REACT_APP_HOST}/api/article/aid/`),
            axios.get(`${process.env.REACT_APP_HOST}/api/article/event/`),
            axios.get(`${process.env.REACT_APP_HOST}/api/upcomming-events/`),

        ])
        .then(axios.spread((latest, projects, aid, events, upcomming) => {
            setLatestItems(latest.data)
            setProjectItems(projects.data)
            setAidItems(aid.data)
            setEventItems(events.data)
            setUpcommingItems(upcomming.data)
            console.log('latest', latest)
        }))
    }, [])

    const latestItemsCards = latestItems.map((item, index) => <ContentCard key={index} content={item}/>)
    const latestProjects = []
    const latestAid = []
    const latestEvents = []
    const upcommingEvents = []

    for( let i=0; i<4; i++) {
        //if (typeof homeItems[i] !== 'undefined') latestItems.push(<ContentCard key={i} content={homeItems[i]}/>)
        if (typeof projectItems[i] !== 'undefined') latestProjects.push(<ContentCard key={i} content={projectItems[i] }/>)
        if (typeof aidItems[i] !== 'undefined') latestAid.push(<ContentCard key={i} content={aidItems[i] }/>)
        if (typeof eventItems[i] !== 'undefined') latestEvents.push(<ContentCard key={i} content={eventItems[i]}/>)
        if (typeof upcommingItems[i] !== 'undefined') upcommingEvents.push(<Event key={i} content={upcommingItems[i]}/>)             
    }

    const getTrusteeChair = () => {
        axios.all([
            axios.get(`${process.env.REACT_APP_HOST}/api/members/trustee/`),
            axios.get(`${process.env.REACT_APP_HOST}/api/members/advisor/`),
            axios.get(`${process.env.REACT_APP_HOST}/api/members/management/`)
        ])

        .then(axios.spread((trustees, advisors, management) => {
            const members = [...trustees.data, ...advisors.data, ...management.data]
            console.log(members)
            members.forEach(member => {
                if (member.home) {
                    setTrusteChair(member)
                    return
                }
            })
        }))
    }

    useEffect(() => {
        getTrusteeChair()
    }, [])


    return (
        <div className='home'>

            <div>
                <div>
                    <h1 className='text-3xl font-bold underline'>
                    Peterborough Nepalese Society PNS UK
                    </h1>
                    <p className='text-lg'>
                    The Peterborough Nepalese Society (PNS) is a non-profit making community based organisation established in 2007 with the initiation of all individuals or families originally coming from Nepal and those who are living in and around Peterborough areas.                    </p>
                </div>
                <div>

                </div>
            </div>


            <div>
                <div className='home-landing__container fadeInUp'>
                    <div className='home__container home-landing'>
                        <div  className='home-landing__info'>
                            <h1>Peterborough Nepalese Society PNS UK</h1>
                            <div className='home-landing__quote'>
                                <img className='home__about__image' src={`${process.env.REACT_APP_HOST}/media/member_imgs/11156251_10153135721597860_6154301736504836438_n_PQPAXli.jpg`}></img>
                                <div className='home__about__text'>
                                    <p className='home__text home__about__text--quote'>"The Peterborough Nepalese Society (PNS) is a non-profit making community based organisation established in 2007 with the initiation of all individuals or families originally coming from Nepal and those who are living in and around Peterborough areas."</p>                        
                                    <p className='home__text home__about__text--note'> {`-Mr. Keshab Khatiwada, Chairman`}</p>         
                                </div>
                            </div>
   
                            <div className='home-landing__links'>
                                
                                <a href={DocGlance} target='_blank'>About Us</a>
                                <Link to='/committee/type=management'>Managment</Link>
                                <Link to='/committee/type=trustee'>Trutee Board</Link>
                                <Link to='/committee/type=advisor'>Advisory Body</Link>
                                <a href={DocConstitution} target='_blank'>Constitution</a>
                                <Link className='' to='/minutes'>Meetings</Link>
                            </div>
                        </div>

                        <div className='home-landing__image'>
                            <img className='home__about__image' src="assets/media/cover/home-pic.jpeg"></img>

                        </div>
                    </div>
                </div>
            </div>
            <div className='home__sections'>
                <div className='home__sections--left'>

                </div>
                <div className='home__sections--center'>
                    <div className='home__latest home__container'>
                        <h2 className='home__sub-title home__sub-title--section' >Latest</h2>
                        <div className='home__latest__content'>
                            {latestItemsCards}
                        </div>
                    </div>
                    <div className='home__latest home__container'>
                        <div className='section__header'>
                            <h2 className='section__title'>Upcomming Events</h2>
                            <div className='section__dot'></div>
                            <span className='section__count section__count--aid'>{upcommingItems.length}</span>
                        </div>                        
                        <div className='home__latest__content'>
                            {upcommingEvents}
                        </div>
                    </div>
                    <div className='section home__container'>
                        <div className='section__header'>
                            <h2 className='section__title'>Projects</h2>
                            <div className='section__dot'></div>
                            <span className='section__count section__count--project'>{projectItems.length}</span>
                        </div>
                        <div className='section__content'>
                            <div className='section__content--left section__content--bring-front section__info section__info--project'>
                                <div className='section-circle section-circle--projectt'></div>
                                <ImgProject className='section__image section__image--project'/>
                                <p className='section__info-text section__info-text--project'>We support projects that help the community.</p>
                                <Link to='/category/type=project'><button className='section__button section__button--project'>More</button></Link>
                            </div>
                            <div className='section__content--right section__card-grid'>
                                {latestProjects}
                            </div>
                        </div>

                    </div>
                    <div className='section home__container'>
                        <div className='section__header'>
                            <h2 className='section__title'>Donations</h2>
                            <div className='section__dot'></div>
                            <span className='section__count section__count--aid'>{aidItems.length}</span>
                        </div>
                        <div className='section__content'>
                            <div className='section__content--left section__card-grid'>
                                {latestAid}
                            </div>
                            <div className='section__content--right section__content--bring-front section__info section__info--aid'>
                                <div className='section-circle section-circle--aidt'></div>
                                <ImgAid className='section__image section__image--aid'/>
                                <p className='section__info-text section__info-text--aid'>We donate money to those who are in need.</p>
                                <Link to='/category/type=aid'><button className='section__button section__button--aid'>More</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className='section home__container'>
                        <div className='section__header'>
                            <h2 className='section__title'>Events</h2>
                            <div className='section__dot'></div>
                            <span className='section__count section__count--guest'>{eventItems.length}</span>
                        </div> 
                        <div className='section__content'>
                            <div className='section__content--left section__content--bring-front section__info section__info--guest'>
                                <div className='section-circle section-circle--guestt'></div>
                                <ImgGuest className='section__image section__image--guest'/>
                                <p className='section__info-text section__info-text--guest'>We setup special events for the community.</p>
                                <Link to='/category/type=event'><button className='section__button section__button--guest'>More</button></Link>
                            </div>
                            <div className='section__content--right section__card-grid'>
                                {latestEvents}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='home__sections--right'>
                    <Advertisement/>

                </div>
            </div>

            <div className='section section--location'>
                <h2 className='home__sub-title home__sub-title--section'>Where are we?</h2>

                <iframe className='section--location__map margin-top-medium' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77572.92216372718!2d-0.37049195885147335!3d52.58491219183411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8077dccaa4605%3A0xaefe2de1d96d8dd5!2sPeterborough!5e0!3m2!1sen!2suk!4v1596404799681!5m2!1sen!2suk" width="100%" height="450"></iframe>

            </div>
        </div>
    )
}

export default Home