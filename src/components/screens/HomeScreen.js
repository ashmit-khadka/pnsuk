import React, { useState, useEffect } from "react";
import { ReactComponent as IconLocation } from '../../assets/icons/location.svg';
import { ReactComponent as IconDate } from '../../assets/icons/date.svg';
import { ReactComponent as IconContact } from '../../assets/icons/phone.svg';
import { ReactComponent as IconScribble } from '../../assets/icons/scribble.svg';
import axios from "axios";
import Article from "../Article";
import Member from "../Member";
import Carousel from 'react-bootstrap/Carousel';

const HomeScreen = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/home')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
  }, []);

  const WhatWeDoItem = ({
    title,
    description
  }) => (
    <div className="flex flex-col items-center w-64 gap-2 text-center">
      <img className="rounded-full" src="https://via.placeholder.com/150" alt="placeholder" />
      <p className="font-bold">{title}</p>
      <p>{description}</p>
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-8">

      <div className="flex flex-row gap-16 w-full ">
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="font-bold text-6xl">Peterborough Nepalese Society PNS UK</h3>
          <p>The Peterborough Nepalese Society (PNS) is a non-profit making community based organisation established in 2007 with the initiation of all individuals or families originally coming from Nepal and those who are living in and around Peterborough areas.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max">
            Learn More
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max">
            Book Westwood hall
          </button>
        </div>
        <div className="flex-1">

          <Carousel>
            {data?.images?.map((article) => 
              <Carousel.Item>
                <img key={article.id} src={`http://localhost:3000/assets/media/images/articles/${article.images[0].image}`} alt={article.title} />
              </Carousel.Item>
            )  
          }
          </Carousel>

        </div>
      </div>

      <div className="w-full pt-4 px-8 pb-8 shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-center p-4">What we do</h2>
        <div className="flex flex-row justify-around">
          <WhatWeDoItem
            title="Donate"
            description="We extend a helping hand to support individuals and families in need, embodying the spirit of compassion and community care."
          />
          <WhatWeDoItem
            title="Celebrations"
            description="Join us as we come together to honour and celebrate Nepali culture, traditions, and national occasions with pride and joy."
          />
          <WhatWeDoItem
            title="Educate"
            description="Empowering the next generation through engaging workshops, cultural education, and skills development."
          />
          <WhatWeDoItem
            title="Hall Booking"
            description="Rent our spacious hall for your events and gatherings, conveniently located and perfect for any occasion."
          />
        </div>
      </div>

      <div className="home-upcomming-events w-full  pt-4 px-24 pb-8 flex flex-col gap-16 items-center">
        <h2 className="text-2xl font-bold font-lora text-3xl">Our upcoming events</h2>
        <div className="w-full flex flex-row justify-around gap-4">
          {
            data?.events?.map((event) => (
              <EventItem
                title={event.title}
                description={event.description}
                location={event.location}
                date={event.date}
                contact={event.contact}
              />
            )
            )}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> View more</button>
        <IconScribble className="home-upcomming-events-scribble" />
      </div>

      <div className="mt-24 grid grid-cols-3 gap-16 w-full ">
        <div className="col-span-1 flex flex-col justify-center gap-4">
          <h2 className="text-4xl">How we have supported the community</h2>
          <p>Our work is made possible by the generous support of our sponsors and donors. We are grateful for their contributions and commitment to helping us make a difference in the community.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Become a sponsor</button>
        </div>
        <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-8">
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

      <div className="w-full pt-4 px-8 pb-8 flex flex-col gap-16 items-center">
        <h2 className="text-2xl font-bold">Meet our team</h2>
        <div className="flex flex-row w-full justify-around">
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

      <div className="grid grid-cols-3 gap-16 w-full ">
        <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-8">
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
          <h2 className="text-4xl">How we have supported the community</h2>
          <p>Our work is made possible by the generous support of our sponsors and donors. We are grateful for their contributions and commitment to helping us make a difference in the community.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Become a sponsor</button>
        </div>

      </div>
    </div>
  );
}

export default HomeScreen;