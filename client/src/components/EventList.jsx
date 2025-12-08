import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // define async function inside effect
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data); // this runs after the async fetch completes
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents(); // call the async function
  }, []); // only runs once on mount

  return (
    <div>
      <h2>Events</h2>
      {events.length === 0 ? (
        <p>No events yet</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.name}</strong> - {event.event_date ? new Date(event.event_date).toLocaleString() : 'No date'}<br/>
              Location: {event.location || 'N/A'}<br/>
              Price: {event.price || 'Free!'}<br/>
              Genre: {event.genre || 'N/A'}<br/>
              Description: {event.description || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
