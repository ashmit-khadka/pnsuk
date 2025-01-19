import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../services/services";
import moment from "moment";
import { ReactComponent as IconLocation } from '../../assets/icons/noun-location.svg';
import { ReactComponent as IconCalendar } from '../../assets/icons/noun-calendar.svg';
import { ReactComponent as IconPhone } from '../../assets/icons/noun-phone.svg';
import Event from "../Event";
import Breadcrumbs from "../Breadcrumbs";

const EventsScreen = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    let events = await getAllEvents();

    // Calculate the next valid date for each event
    events = events.map((event) => ({
      ...event,
      nextValidDate: calculateNextValidDate(event.timestamp, event.recurring),
    }));

    // Sort events by nextValidDate
    events.sort((a, b) => {
      if (a.nextValidDate && b.nextValidDate) {
        return b.nextValidDate - a.nextValidDate;
      }
      return 0;
    });

    setEvents(events);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function calculateNextValidDate(timestamp, recurring) {
    // Parse the provided timestamp into a Moment object
    let eventDate = moment(timestamp);
    const currentDate = moment(); // Current date and time

    // If the event timestamp is in the future, return the event date
    if (eventDate.isAfter(currentDate)) {
      return eventDate;
    }

    // Calculate the next valid date based on the recurrence pattern
    switch (recurring) {
      case "weekly":
        while (eventDate.isSameOrBefore(currentDate)) {
          eventDate.add(7, 'days'); // Add 7 days
        }
        break;

      case "monthly":
        while (eventDate.isSameOrBefore(currentDate)) {
          eventDate.add(1, 'months'); // Add 1 month
        }
        break;

      case "annually":
        while (eventDate.isSameOrBefore(currentDate)) {
          eventDate.add(1, 'years'); // Add 1 year
        }
        break;

      default:
        return eventDate; // If recurrence is "none" or invalid, return null
    }

    return eventDate;
  }

  const groupEventsByMonth = (events) => {
    const groupedEvents = {};

    events.forEach(event => {
      const eventDate = event.nextValidDate;
      const month = moment(eventDate).format("MMMM YYYY");
      if (!groupedEvents[month]) {
        groupedEvents[month] = [];
      }
      groupedEvents[month].push(event);
    });

    return groupedEvents;
  };

  const groupedEvents = groupEventsByMonth(events);

  // Sort the month keys in descending order
  const sortedMonths = Object.keys(groupedEvents).sort((a, b) => moment(b, "MMMM YYYY") - moment(a, "MMMM YYYY"));

  return (
    <div>
      <Breadcrumbs
        Items={[
          { href: '/', text: 'Home' },
          { href: '/events', text: 'Events' }
        ]}
      />

      <h1 className="font-lora mb-8 text-center">Events</h1>
      {sortedMonths.map(month => (
        <div className="mt-8" key={month}>
          <h2 className="font-lora mb-4">{month}</h2>
          {groupedEvents[month].map(event => (
            <Event
              key={event.id}
              title={event.title}
              description={event.description}
              location={event.location}
              date={event.nextValidDate ? moment(event.nextValidDate).toDate().toString() : "No upcoming date"}
              contact={event.contact}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default EventsScreen;