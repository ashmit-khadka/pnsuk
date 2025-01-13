import React from "react";
import { ReactComponent as IconLocation } from '../assets/icons/noun-location.svg';
import { ReactComponent as IconCalendar } from '../assets/icons/noun-calendar.svg';
import { ReactComponent as IconPhone } from '../assets/icons/noun-phone.svg';


const Event = (props) => {
  const { title, description, location, date, contact, mini } = props;

  const containerClass = mini ? 
    "bg-themeDark text-white p-12 relative mb-12 rounded-lg" :
    "bg-gradient-to-r from-themeDark to-themePrimary text-white p-12 relative mb-12 rounded-lg";

  const formatDescription = () => {
    if (mini && description.length > 100) {
      return description.substring(0, 100)
    }
    return description;
  }

  return (
    <div
      className={containerClass}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <div>
        <p className="flex items-center gap-2"><IconLocation className="w-6 h-6 fill-current text-themeLight" />{location}</p>
        <p className="flex items-center gap-2"><IconCalendar className="w-6 h-6 fill-current text-themeLight" />{date}</p>
        <p className="flex items-center gap-2"><IconPhone className="w-6 h-6 fill-current text-themeLight" />{contact}</p>
      </div>
      <p>{formatDescription()}</p>

    </div>

  )
}

export default Event;