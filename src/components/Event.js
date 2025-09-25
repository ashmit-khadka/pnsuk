import React from "react";
import { ReactComponent as IconLocation } from '../assets/icons/noun-location.svg';
import { ReactComponent as IconCalendar } from '../assets/icons/noun-calendar.svg';
import { ReactComponent as IconPhone } from '../assets/icons/noun-phone.svg';
import { formatDate } from "../services/formatDate";
import moment from "moment";


const Event = (props) => {
  const { title, description, location, date, contact, mini, image } = props;

  const containerClass = mini ?
    "bg-themeDark text-white p-8 relative mb-12 rounded-lg shadow-lg" :
    "p-4 sm:p-12 relative mb-12";

  const formattedDescription = () => {
    if (mini && description.length > 100) {
      return description.substring(0, 100)
    }
    return description;
  }

  const formattedDate = formatDate(date);
  const eventMoment = moment(date);
  const month = eventMoment.format('MMM'); // Short month name (e.g., "Jan", "Feb")
  const day = eventMoment.format('Do'); // Day with ordinal suffix (e.g., "1st", "2nd", "3rd", "15th")

  return (
    <div
      className={containerClass}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.10) 0px 5px 25px"
      }}
    >
      <div className="mb-4">
        <img
          src={image || 'https://project-pnsuk.s3.eu-north-1.amazonaws.com/prod/assets/media/images/defaults/event.png'}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-4">

        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p>{formattedDescription()}</p>
          <div>
            <p className="flex items-center gap-2"><IconCalendar className="w-6 h-6 fill-current text-themePrimary" />{formattedDate}</p>
            <p className="flex items-center gap-2"><IconLocation className="w-6 h-6 fill-current text-themePrimary" />{location}</p>
            <p className="flex items-center gap-2"><IconPhone className="w-6 h-6 fill-current text-themePrimary" />{contact}</p>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Event;