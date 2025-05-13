import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Admin1Layout from './layouts/Admin1Layout';
import Admin2Layout from './layouts/Admin2Layout';
import WorkerLayout from './layouts/WorkerLayout';
import RegisterSubscriber from './pages/RegisterSubscriber';
import Subscribers from './pages/Subscribers';
import Notifications from './pages/Notifications';
import WorkHours from './pages/WorkHours';
import Subscription from './pages/Subscription';
import LandingPage from './pages/LandingPage';
import Contact from './pages/Contact'; // <-- Make sure this import exists

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
           path="/"
           element={<LandingPage />}
          >
            <Route path="/AuthPage" element={<AuthPage />} />
          </Route>

          <Route
            path="/AuthPage"
            element={<AuthPage />}
          />


          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* Admin1 Routes */}
          <Route path="/admin1" element={<Admin1Layout />}>
            <Route path="dashboard" element={<Subscribers />} />
            <Route path="register" element={<RegisterSubscriber />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Admin2 Routes */}
          <Route path="/admin2" element={<Admin2Layout />}>
            <Route path="dashboard" element={<Subscribers />} />
            <Route path="system" element={<Notifications />} />
            <Route path="database" element={<Notifications />} />
            <Route path="users" element={<Notifications />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Worker Routes */}
          <Route path="/worker" element={<WorkerLayout />}>
            <Route path="dashboard" element={<WorkHours />} />
            <Route path="hours" element={<WorkHours />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
