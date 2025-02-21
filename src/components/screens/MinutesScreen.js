import React, { useEffect, useState } from "react";
import { getAllMinutes } from "../../services/services";
import moment from "moment";
import Breadcrumbs from "../Breadcrumbs";
import Button from "../Button";

const MinutesScreen = () => {
  const [minutes, setMinutes] = useState([]);

  const fetchMinutes = async () => {
    const minutes = await getAllMinutes();
    setMinutes(minutes);
  }

  useEffect(() => {
    fetchMinutes();
  }, []);

  const groupMinutesByMonth = (minutes) => {
    const groupedMinutes = {};

    minutes.forEach(minute => {
      const minuteDate = moment(minute.date);
      const month = minuteDate.format("MMMM YYYY");
      if (!groupedMinutes[month]) {
        groupedMinutes[month] = [];
      }
      groupedMinutes[month].push(minute);
    });

    return groupedMinutes;
  };

  const onOpenMinute = (minute) => {
    window.open(`${process.env.REACT_APP_HOST}/assets/media/docs/minutes/${minute.file}`, "_blank");
  }

  const groupedMinutes = groupMinutesByMonth(minutes);

  // Sort the month keys in descending order
  const sortedMonths = Object.keys(groupedMinutes).sort((a, b) => moment(b, "MMMM YYYY") - moment(a, "MMMM YYYY"));

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-page w-full">
        <Breadcrumbs
          Items={[
            { href: '/', text: 'Home' },
            { href: '/minutes', text: 'Minutes' }
          ]}
        />
        <h1 className="font-lora mb-8">Minutes</h1>
      </div>
      {sortedMonths.map(month => (
        <div key={month} className="max-w-page w-full mb-8">
          <h2>{`${month} (${groupedMinutes[month].length})`}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-page w-full mt-4">
            {groupedMinutes[month].map(minute => (
              <div key={minute.id} onClick={() => onOpenMinute(minute)} className="w-full flex flex-col cursor-pointer group font-raleway">
                <div className="overflow-hidden">
                  <img src={`${process.env.REACT_APP_HOST}/assets/media/images/defaults/minutes.jpg`} alt={minute.title} className="w-full w-full h-48 rounded-lg mb-2 object-cover transform transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-bold m-0 group-hover:underline">{minute.title}</h3>
                <p>{moment(minute.date).format("MMMM Do YYYY")}</p>
                <p>{minute.description}</p>
              </div>
            ))}

          </div>
        </div>
      ))}
    </div>
  );
}

export default MinutesScreen;