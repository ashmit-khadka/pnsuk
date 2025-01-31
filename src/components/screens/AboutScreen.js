import React from "react";
import { Button } from "react-bootstrap";
import Breadcrumbs from "../Breadcrumbs";

const AboutScreen = () => {

  const aboutSection = (title, description, image, flip, link) => {
    return (
      <div className="w-full flex sm:gap-16 gap-4 flex-col sm:flex-row">
        <div className={`flex-2 md:pt-8  ${flip ? 'order-2' : 'order-1'} w-full`}>
          <h2 className="font-lora text-2xl">{title}</h2>
          <p>{description}</p>
          <Button
            onClick={() => window.open(link, "_blank")}
            variant="primary"
          >Read More</Button>
        </div>
        <div className={`flex-3 ${flip ? 'order-1' : 'order-2'} w-full`}>
          <img className="w-full h-72 object-cover" src={image} alt={title} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-page margin-auto px-4">
      <Breadcrumbs
        Items={[
          { href: '/', text: 'Home' },
          { href: '/about', text: 'About Us' }
        ]}
      />
      <h1 className="font-lora text-5xl text-center pb-16">About Us</h1>
      <div className="flex flex-col gap-8">
        {aboutSection(
          "PNS at a Glance",
          "Our mission is to provide the best service to our customers.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-669986.jpeg`,
          false,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/PNS_glance.pdf`
        )}
        {aboutSection(
          "Constitution",
          "Our mission is to provide the best service to our customers.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-2104882.jpeg`,
          false,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/constitution.pdf`
        )}
        {aboutSection(
          "PNS Property Acquisition Proposal",
          "Our mission is to provide the best service to our customers.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-1370704.jpeg`,
          true,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/PNS_Property_Acquisition_Proposal.pdf`
        )}
        {aboutSection(
          "Donation Fund Collection Policy",
          "Our mission is to provide the best service to our customers.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-5942584.jpeg`,
          true,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/Donation_Fund_Collection_Policy.pdf`
        )}
        {aboutSection(
          "PNS Safeguarding Policy",
          "Our mission is to provide the best service to our customers.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-609771.jpeg`,
          false,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/PNS_Safeguarding_Policy.pdf`
        )}
        {aboutSection(
          "Health and Safety Policy",
          "Our mission is to provide the best service to our customers.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-669986.jpeg`,
          false,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/Health_and_Safety_Policy.pdf`
        )}

      </div>
    </div>
  )
}

export default AboutScreen;