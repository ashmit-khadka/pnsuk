import React, { useEffect, useState } from "react";
import { getAllMinutes } from "../../services/services";
import moment from "moment";

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
    window.open(`${process.env.REACT_APP_HOST}/assets/media/docs/minutes/${minute.title}`, "_blank");
    

  } 

  const groupedMinutes = groupMinutesByMonth(minutes);

  // Sort the month keys in descending order
  const sortedMonths = Object.keys(groupedMinutes).sort((a, b) => moment(b, "MMMM YYYY") - moment(a, "MMMM YYYY"));

  return (
    <div>
      <h1>Minutes</h1>
      {sortedMonths.map(month => (
        <div key={month}>
          <h2>{month}</h2>
          {groupedMinutes[month].map(minute => (
            <div key={minute.id}>
              <h3 onClick={() => onOpenMinute(minute)} >{minute.title}</h3>
              <p>{moment(minute.date).format("MMMM Do YYYY")}</p>
              <p>{minute.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MinutesScreen;