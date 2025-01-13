import React, { useState, useEffect } from "react";
import { ReactComponent as IconLocation } from '../../assets/icons/location.svg';
import { ReactComponent as IconDate } from '../../assets/icons/date.svg';
import { ReactComponent as IconContact } from '../../assets/icons/phone.svg';
import { ReactComponent as IconScribble } from '../../assets/icons/scribble.svg';
import ImageDonate from '../../assets/images/pexels-goumbik-928199.jpg';
import ImageCelebrate from '../../assets/images/pexels-padli-772478.jpg';
import ImageEducate from '../../assets/images/pexels-yankrukov-8613095.jpg';
import ImageHall from '../../assets/images/pexels-mohammad-danish-290641-891059.jpg';
import axios from "axios";
import Article from "../Article";
import Member from "../Member";
import Carousel from 'react-bootstrap/Carousel';
import Event from "../Event";

const HomeScreen = () => {

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
    <div className="flex flex-col items-center gap-2 text-center px-2">
      <img className="rounded-full mb-2 w-32 h-32" src={image} alt="placeholder" />
      <p className="font-bold m-0">{title}</p>
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
    <div className="flex flex-col items-center justify-center min-h-screen pt-12 gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 flex flex-col gap-2 flex-1">
          <h3 className="font-satisfy text-5xl text-themePrimary">Peterborough Nepalese Society PNS UK</h3>
          <p>The Peterborough Nepalese Society (PNS) is a non-profit making community based organisation established in 2007 with the initiation of all individuals or families originally coming from Nepal and those who are living in and around Peterborough areas.</p>
          <div className="flex gap-2" >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max">
            Learn More
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max">
            Book Westwood hall
          </button>

          </div>
        </div>
        <div className="col-span-2">
          <Carousel>
            {data?.images?.map((article) => 
              <Carousel.Item className="w-full h-96 rounded-lg" key={article.id}>
                <img className="w-full object-contain rounded-lg" key={article.id} src={`${process.env.REACT_APP_API}/assets/media/images/articles/${article.images[0].image}`} alt={article.title} />
              </Carousel.Item>
            )  
          }
          </Carousel>

        </div>
      </div>

      <div className="w-full pt-4 px-8 pb-8 shadow-xl rounded-lg">
        <h2 className="font-lora text-3xl font-bold text-center p-4">What we do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-8">
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

      <div className="home-upcomming-events w-full  pt-4 px-8 lg:px-16 pb-8 flex flex-col gap-8 items-center mb-24">
        <h2 className="font-lora text-3xl font-bold text-center p-4 text-white">Our upcoming events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {
            data?.events?.map((event) => (
              <Event
                key={event.id}
                title={event.title}
                description={event.description}
                location={event.location}
                date={event.date}
                contact={event.contact}
                mini
              />
            )
            )}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> View more</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 w-full">
        <div className="col-span-1 flex flex-col justify-center gap-4">
          <h2 className="text-4xl font-lora">How we have supported the community</h2>
          <p>Our work is made possible by the generous support of our sponsors and donors. We are grateful for their contributions and commitment to helping us make a difference in the community.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> View more</button>
        </div>
        <div className="col-span-1 md:col-span-2 grid gap-8 grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2">
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

      <div className="relative bg-themeAltLight w-full pt-4 px-8 pb-8 flex flex-col gap-16 items-center mb-24">
        <h2 className="font-lora text-3xl font-bold text-center p-4">Meet our team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          <Member
            name={data?.members?.president?.name}
            position={data?.members?.president?.position}
            image={data?.members?.president?.image}
          />
          {
            data?.members?.vicePresident.map((vp) => (
              <Member
                key={vp.id}
                name={vp.name}
                position={vp.position}
                image={vp.image}
              />
            ))
          }
          <Member
            name={data?.members?.coordinator?.name}
            position={data?.members?.coordinator?.position}
            image={data?.members?.coordinator?.image}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> View more</button>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 w-full ">
        <div className="col-span-1 md:col-span-2 grid gap-8 grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2">
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
        <div className="col-span-1 flex flex-col justify-center gap-4">
          <h2 className="text-4xl font-lora">See what we've been up to</h2>
          <p>Take a look at what we've been up to and the events we've hosted. We're proud to share our journey with you.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> View more</button>
        </div>
      </div>

    </div>
  );
}

export default HomeScreen;