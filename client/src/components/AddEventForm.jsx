// client/src/components/AddEventForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function AddEventForm({ onEventAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    event_date: '',
    location: '',
    lineup: '',
    picture_path: '',
    price: '',
    genre: '',
    description: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', formData);
      setFormData({
        name: '',
        event_date: '',
        location: '',
        lineup: '',
        picture_path: '',
        price: '',
        genre: '',
        description: '',
      });
      onEventAdded(); // refresh the event list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event name" value={formData.name} onChange={handleChange} required />
        <input type="datetime-local" name="event_date" value={formData.event_date} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="text" name="lineup" placeholder="Lineup" value={formData.lineup} onChange={handleChange} />
        <input type="text" name="picture_path" placeholder="Picture URL" value={formData.picture_path} onChange={handleChange} />
        <input type="number" step="0.01" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}
