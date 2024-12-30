import React, { useState, useEffect } from "react";
import { ReactComponent as IconLocation } from '../../assets/icons/location.svg';
import { ReactComponent as IconDate } from '../../assets/icons/date.svg';
import { ReactComponent as IconContact } from '../../assets/icons/phone.svg';
import axios from "axios";
import Article from "../Article";
import Member from "../Member";

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
    <div className="w-80 flex flex-col gap-2 p-8 border border-gray-200 rounded-lg">
      <h3 className="font-bold">{title}</h3>
      <p className="flex gap-2 items-center"><IconLocation className="w-4 h-4" /> {location}</p>
      <p className="flex gap-2 items-center"><IconDate className="w-4 h-4" /> {date}</p>
      <p className="flex gap-2 items-center"><IconContact className="w-4 h-4" /> {date}</p>
      <p>{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
    </div>
  )

  const TeamItem = ({
    name,
    role,
    pic,
  }) => (
    <div className="flex flex-col items-center">
      <img className="rounded-full mb-4" src="https://via.placeholder.com/150" alt="placeholder" />
      <p className="font-bold">{name}</p>
      <p>{role}</p>
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
          <img src="https://via.placeholder.com/500" alt="placeholder" />
        </div>
      </div>

      <div className="w-full  pt-4 px-8 pb-8 shadow-xl rounded-lg">
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

      <div className="w-full  pt-4 px-8 pb-8 flex flex-col gap-16 items-center">
        <h2 className="text-2xl font-bold">Our upcoming events</h2>
        <div className="w-full flex flex-row justify-around">
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
      </div>

      <div className="grid grid-cols-3 gap-16 w-full ">
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

      <div className="w-full  pt-4 px-8 pb-8 flex flex-col gap-16 items-center">
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