import React, { useState, useEffect } from "react";
import { ReactComponent as IconLocation } from '../../assets/icons/location.svg';
import { ReactComponent as IconDate } from '../../assets/icons/date.svg';
import { ReactComponent as IconContact } from '../../assets/icons/phone.svg';
import { ReactComponent as IconScribble } from '../../assets/icons/scribble.svg';
import { ReactComponent as IconUnderline } from '../../assets/icons/noun-underline.svg';
import { ReactComponent as IconArrow } from '../../assets/icons/noun-arrow.svg';
import { ReactComponent as IconHighlight } from '../../assets/icons/noun-highlight.svg';
import ImageDonate from '../../assets/images/pexels-goumbik-928199.jpg';
import ImageCelebrate from '../../assets/images/pexels-padli-772478.jpg';
import ImageEducate from '../../assets/images/pexels-yankrukov-8613095.jpg';
import ImageHall from '../../assets/images/pexels-mohammad-danish-290641-891059.jpg';
import axios from "axios";
import Article from "../Article";
import Member from "../Member";
import Carousel from 'react-bootstrap/Carousel';
import Event from "../Event";
import Button from '../Button';
import { useNavigate } from 'react-router';

const HomeScreen = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_API);
    axios.get(`${process.env.REACT_APP_API}/home`)
      .then((response) => {
        setData(response.data);
      })
  }, []);

  const WhatWeDoItem = ({
    title,
    description,
    image
  }) => (
    <div className="flex flex-col items-center text-center px-2">
      <img className="rounded-full mb-2" src={image} alt="placeholder" style={{ width: '140px', height: '140px' }}/>
      <p className="font-bold m-0 mt-2">{title}</p>
      <p className="m-0">{description}</p>
    </div>
  )

  const EventItem = ({
    title,
    description,
    location,
    date,
    contact,
  }) => (
    <div className="home-upcomming-event flex flex-col p-8 rounded-lg">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="flex gap-2 items-center"><IconLocation className="w-4 h-4 fill-white" /> {location}</p>
      <p className="flex gap-2 items-center"><IconDate className="w-4 h-4 fill-white" /> {date}</p>
      <p className="flex gap-2 items-center"><IconContact className="w-4 h-4 fill-white" /> {date}</p>
      <p>{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
    </div>
  )

  if (!data) {
    return null
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen pt-12 gap-8">
      <div className="max-w-page grid grid-cols-1 md:grid-cols-7 gap-24 ">
        <div className="col-span-3 flex flex-col gap-2 flex-1 relative">
          <h3 className="font-satisfy text-5xl text-themeDark mb-4">Peterborough Nepalese Society PNS UK</h3>
          <p>The Peterborough Nepalese Society (PNS) is a non-profit making community based organisation established in 2007 with the initiation of all individuals or families originally coming from Nepal and those who are living in and around Peterborough areas.</p>
          <div className="flex flex-col gap-2" >
            <Button onClick={() => navigate('about')}> Learn more</Button>
            <Button onClick={() => window.location.href = 'https://bookevent.pnsuk.org/'}>
              Book Westwood Hall
            </Button>
          </div>
          {/* <IconArrow style={{
            width: '13rem',
            position: 'absolute',
            left: '350px',
            bottom: '-680px',
            fill: '#285F9E',
            transform: 'rotate(185deg)',
          }} /> */}
        </div>

        <div className="col-span-4 relative" style={{ rounded: '50%' }}>
          {/* <img className="w-full h-96 object-cover rounded-lg" src={`${process.env.REACT_APP_HOST}/assets/media/images/banner.png`} alt="placeholder" /> */}
          
          <Carousel>
            {data?.images?.map((article) =>
              <Carousel.Item className="" key={article.id}>
                <img className="w-full h-96 object-cover" style={{ borderRadius: '2rem' }} key={article.id} src={`${process.env.REACT_APP_HOST}/assets/media/images/articles/${article.images[0].image}`} alt={article.title} />

              </Carousel.Item>
            )
            }
          </Carousel>
          {/* <IconHighlight style={{
            width: '10rem',
            position: 'absolute',
            right: '600px',
            bottom: '-410px',
            fill: '#FFA7A8',
            transform: 'rotate(270deg)',
          }} /> */}

        </div>
      </div>

      <div className="max-w-page w-full pt-4 px-8 pb-12 rounded-lg mt-4 mb-16" style={{ boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)' }}>
        <h2 className="font-lora text-4xl font-bold text-center pt-2 pb-8">What we do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8">
          <WhatWeDoItem
            title="Donate"
            description="We extend a helping hand to support individuals and families in need, embodying the spirit of compassion and community care."
            image={ImageDonate}
          />
          <WhatWeDoItem
            title="Celebrations"
            description="Join us as we come together to honour and celebrate Nepali culture, traditions, and national occasions with pride and joy."
            image={ImageCelebrate}
          />
          <WhatWeDoItem
            title="Educate"
            description="Empowering the next generation through engaging workshops, cultural education, and skills development."
            image={ImageEducate}
          />
          <WhatWeDoItem
            title="Hall Booking"
            description="Rent our spacious hall for your events and gatherings, conveniently located and perfect for any occasion."
            image={ImageHall}
          />
        </div>
      </div>

      <div className="home-upcomming-events w-full  pt-4 px-8 lg:px-16 pb-8 flex flex-col gap-8 items-center mb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(40, 95, 158, 0.6),rgba(40, 95, 158, 0.80)), url(${process.env.REACT_APP_HOST}/assets/media/images/screens/pexels-photo-1274922.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h2 className="font-lora text-4xl font-bold text-center p-4 text-white">Our upcoming events</h2>
        <div className="max-w-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {
            data?.events?.map((event) => (
              <Event
                key={event.id}
                title={event.title}
                description={event.description}
                location={event.location}
                date={event.timestamp}
                contact={event.contact}
                mini
              />
            )
            )}
        </div>
        <Button variant="darkBlue"> View more</Button>
      </div>

      <div className="max-w-page grid grid-cols-1 lg:grid-cols-3 gap-24 w-full mb-16">
        <div className="col-span-1 flex flex-col justify-center gap-2 relative">
          <h2 className="text-4xl font-lora" style={{ lineHeight: '3rem' }}>How we have supported the community</h2>
          {/* <IconUnderline className="fill-current text-themeLight" style={{
            width: '12rem',
            position: 'absolute',
            right: '180px',
            bottom: '62px',
            fill: '#EB696B',
          }} /> */}
          <p>Our work is made possible by the generous support of our sponsors and donors. We are grateful for their contributions and commitment to helping us make a difference in the community.</p>
          <Button variant="default" onClick={() => console.log('clicked')}> View more</Button>
        </div>
        <div className="col-span-1 md:col-span-2 grid gap-16 grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2">
          {
            data?.donations?.map((article) => (
              <Article
                key={article.id}
                id={article.id}
                images={article.images}
                title={article.title}
                date={article.date}
              />
            ))
          }
        </div>
      </div>

      <div className="relative bg-themeAltLight w-full pt-4 px-8 pb-8 flex flex-col gap-8 items-center mb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 168, 168, 0.9),rgba(255, 168, 168, 0.9)), url(${process.env.REACT_APP_HOST}/assets/media/images/screens/pexels-photo-3714145.jpeg)`,
          backgroundSize: 'cover', // Adjust the size of the background image
          backgroundPosition: 'center', // Center the background image
          backgroundRepeat: 'no-repeat', // Prevent the background image from repeating
          backgroundColor: 'rgba(192, 74, 74, 0.5)', // Semi-transparent background color

        }}
      >
        <h2 className="font-lora text-4xl font-bold text-center p-4">Meet our team</h2>
        <div className="max-w-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          <Member
            name={data?.members?.president?.name}
            position={data?.members?.president?.position}
            image={data?.members?.president?.image}
            imageSize="large"
          />
          {
            data?.members?.vicePresident.map((vp) => (
              <Member
                key={vp.id}
                name={vp.name}
                position={vp.position}
                image={vp.image}
                imageSize="large"
              />
            ))
          }
          <Member
            name={data?.members?.coordinator?.name}
            position={data?.members?.coordinator?.position}
            image={data?.members?.coordinator?.image}
            imageSize="large"
          />
        </div>
        <Button variant="darkRed" onClick={() => console.log('clicked')}>
          View more
        </Button>
      </div>

      <div className="max-w-page grid grid-cols-1 lg:grid-cols-3 gap-24 w-full mb-16">
        <div className="col-span-1 md:col-span-2 grid gap-16 grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2">
          {
            data?.articles?.map((article) => (
              <Article
                key={article.id}
                id={article.id}
                images={article.images}
                title={article.title}
                date={article.date}
              />
            ))
          }
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-2 relative">
          <h2 className="text-4xl font-lora" style={{ lineHeight: '3rem' }}>Take a look at how we've enriched our community</h2>
          {/* <IconUnderline className="fill-current text-themeLight" style={{
            width: '12rem',
            position: 'absolute',
            right: '90px',
            bottom: '50px',
            fill: '#EB696B',
          }} /> */}
          <p>Take a look at what we've been up to and the events we've hosted. We're proud to share our journey with you.</p>
          <Button variant="default" onClick={() => console.log('clicked')}> View more</Button>
        </div>
      </div>

      <div className='w-full'>
        <h2 className="font-lora text-4xl text-center p-4" >Where are we?</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77572.92216372718!2d-0.37049195885147335!3d52.58491219183411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8077dccaa4605%3A0xaefe2de1d96d8dd5!2sPeterborough!5e0!3m2!1sen!2suk!4v1596404799681!5m2!1sen!2suk" width="100%" height="450"></iframe>
      </div>

    </div>
  );
}

export default HomeScreen;