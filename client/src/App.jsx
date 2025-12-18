import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHomePage from "./pages/AdminHomePage";
import PrivateRoute from "./components/PrivateRoute";
import AdminEventsPage from "./pages/AdminEventsPage";
import AdminAddEventPage from "./pages/AdminAddEventPage";
import AdminEditEventPage from "./pages/AdminEditEventPage";
import AdminPlanEventPage from "./pages/AdminPlanEventPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
