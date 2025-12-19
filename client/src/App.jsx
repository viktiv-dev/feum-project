import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHomePage from "./pages/AdminHomePage";
import PrivateRoute from "./components/PrivateRoute";
import AdminEventsPage from "./pages/AdminEventsPage";
import AdminAddEventPage from "./pages/AdminAddEventPage";
import AdminEditEventPage from "./pages/AdminEditEventPage";
import AdminPlanEventPage from "./pages/AdminPlanEventPage";
import AdminBarPage from "./pages/AdminBarPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <PrivateRoute>
              <AdminEventsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-event-add"
          element={
            <PrivateRoute>
              <AdminAddEventPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-event-edit/:id"
          element={
            <PrivateRoute>
              <AdminEditEventPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-event-plan/:id"
          element={
            <PrivateRoute>
              <AdminPlanEventPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-bar"
          element={
            <PrivateRoute>
              <AdminBarPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
