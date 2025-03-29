import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import Button from "../Button";

const AboutScreen = () => {

  const aboutSection = (title, description, image, flip, link) => {
    return (
      <div className="w-full flex sm:gap-16 gap-12 flex-col sm:flex-row">
        <div className={`flex-2 md:pt-8  ${flip ? 'order-2' : 'order-1'} w-full`}>
          <h2 className="font-lora text-2xl">{title}</h2>
          <p>{description}</p>
          <Button
            onClick={() => window.open(link, "_blank")}
            variant="default"
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
          "Learn about our organization's history, mission, and vision for serving the Nepalese community in Peterborough.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-669986.jpeg`,
          false,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/PNS_glance.pdf`
        )}
        {aboutSection(
          "Constitution",
          "Our governing document that outlines the rules, principles, and framework under which PNS operates.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-2104882.jpeg`,
          false,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/constitution.pdf`
        )}
        {aboutSection(
          "PNS Property Acquisition Proposal",
          "Details of our initiative to acquire property for community use and development.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-1370704.jpeg`,
          true,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/PNS_Property_Acquisition_Proposal.pdf`
        )}
        {aboutSection(
          "Donation Fund Collection Policy",
          "Guidelines and procedures for transparent and accountable collection and management of donations.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-5942584.jpeg`,
          true,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/Donation_Fund_Collection_Policy.pdf`
        )}
        {aboutSection(
          "PNS Safeguarding Policy",
          "Our commitment to ensuring the safety and well-being of all community members, particularly vulnerable individuals.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-609771.jpeg`,
          false,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/PNS_Safeguarding_Policy.pdf`
        )}
        {aboutSection(
          "Health and Safety Policy",
          "Protocols and guidelines to ensure safe environments during all PNS events and activities.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-669986.jpeg`,
          false,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/Health_and_Safety_Policy.pdf`
        )}
        {aboutSection(
          "PNS Fundraising Policy",
          "Standards and procedures for ethical fundraising activities to support our community initiatives.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-6348119.jpeg`,
          true,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/PNS_UK_fundraising-policy_revised1.pdf`
        )}
        {aboutSection(
          "Data Protection Policy",
          "Our commitment to protecting personal data and maintaining privacy in accordance with GDPR regulations.",
          `${process.env.REACT_APP_HOST}/assets/media/images/about/pexels-photo-357514.jpeg`,
          true,
          `${process.env.REACT_APP_HOST}/assets/media/docs/about/PNS_GDPR.v3.pdf`
        )}
      </div>
    </div>
  )
}

export default AboutScreen;