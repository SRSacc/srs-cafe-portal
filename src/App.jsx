import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import Admin1Layout from './layouts/Admin1Layout';
import RegisterSubscriber from './pages/RegisterSubscriber';
import Subscribers from './pages/Subscribers';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/admin1" element={<Admin1Layout />}>
        {/**
         * NOTE: switched admin dashboard from AdminDashboard.jsx to
         * Subscribers.jsx.
         */}
          {/* <Route path="admin2" element={<AdminDashboard/>} /> */}
          <Route path="dashboard" element={<Subscribers />} />
          <Route path="register" element={<RegisterSubscriber />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
