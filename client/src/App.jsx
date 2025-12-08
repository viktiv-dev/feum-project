// client/src/App.jsx
import { useState } from 'react';
import EventList from './components/EventList';
import AddEventForm from './components/AddEventForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ padding: '20px' }}>
      <h1>FEUM Events</h1>
      <AddEventForm onEventAdded={handleRefresh} />
      <EventList key={refresh} /> {/* refresh list after adding */}
    </div>
  );
}

export default App;
