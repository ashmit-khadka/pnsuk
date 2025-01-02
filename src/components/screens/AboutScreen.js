import React from "react";
import { Button } from "react-bootstrap";

const AboutScreen = () => {

  const aboutSection = (title, description, image, flip) => {
    return (
      <div className="w-full flex gap-16">
        <div className={`flex-2 pt-8 ${flip ? 'order-2' : 'order-1'} w-full`}>
          <h2 className="font-lora text-2xl">{title}</h2>
          <p>{description}</p>
          <Button variant="primary">Read More</Button>
        </div>
        <div className={`flex-3 ${flip ? 'order-1' : 'order-2'} w-full`}>
          <img className="w-full h-72 object-cover" src={image} alt={title} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-lora text-5xl text-center pb-16">About Us</h1>
      <div className="flex flex-col gap-8">
      {aboutSection("PNS at a Glance", "Our mission is to provide the best service to our customers.", "http://localhost:3000/assets/media/images/about/pexels-photo-669986.jpeg")}
      {aboutSection("Constitution", "Our mission is to provide the best service to our customers.", "http://localhost:3000/assets/media/images/about/pexels-photo-2104882.jpeg")}
      {aboutSection("PNS Property Acquisition Proposal", "Our mission is to provide the best service to our customers.", "http://localhost:3000/assets/media/images/about/pexels-photo-1370704.jpeg", true)}
      {aboutSection("Donation Fund Collection Policy", "Our mission is to provide the best service to our customers.", "http://localhost:3000/assets/media/images/about/pexels-photo-5942584.jpeg", true)}
      {aboutSection("PNS Safeguarding Policy", "Our mission is to provide the best service to our customers.", "http://localhost:3000/assets/media/images/about/pexels-photo-609771.jpeg")}
      {aboutSection("Health and Safety Policy", "Our mission is to provide the best service to our customers.", "http://localhost:3000/assets/media/images/about/pexels-photo-669986.jpeg")}

      </div>
    </div>
  )
}

export default AboutScreen;