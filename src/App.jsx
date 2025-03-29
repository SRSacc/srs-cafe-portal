import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import Admin2Layout from './layouts/Admin2Layout';
import RegisterSubscriber from './pages/RegisterSubscriber';
import Subscribers from './pages/Subscribers';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard/admin2" element={<Admin2Layout />}>
          <Route path="register" element={<RegisterSubscriber />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
