import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Logo from "../assets/SRSLogoWhite.svg";
import Ambassador from "../assets/Ambassador.png";
import { loginUser } from '../api/auth';
import { LogIn, Loader2 } from "lucide-react"; 
import Toast from '../components/common/Toast';

export default function AuthPage() {
  const [role, setRole] = useState("admin1");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Add loading state
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowToast(false);
    setLoading(true); // Start loading

    try {
      const data = await loginUser({ username, password, role });
      
      if (!data || !data.role) {
        setErrorMessage("Invalid response from server");
        setShowToast(true);
        return;
      }

      // Check if user has permission for selected role
      const userRole = data.role.toLowerCase();
      const selectedRole = role.toLowerCase();
      
      const roleMapping = {
        admin1: 'receptionist',
        admin2: 'manager',
        worker: 'subscriber'
      };

      const hasAccess = 
        userRole === 'manager' || // manager can access all roles
        (userRole === roleMapping[selectedRole]); // other roles must match exactly

      if (!hasAccess) {
        setErrorMessage(`Access denied. You cannot login as ${role}.`);
        setShowToast(true);
        return;
      }

      // If access is granted, proceed with login
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUserRole(userRole);
      setIsLoggedIn(true);

    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage("Invalid username or password.");
      setShowToast(true);
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };

  if (isLoggedIn) {
    const dashboardRoutes = {
      admin1: '/admin1/dashboard',
      admin2: '/admin2/system',
      worker: '/worker/dashboard'
    };
    return <Navigate to={dashboardRoutes[role]} replace />;
  }

  return (
    <div className="relative h-full md:h-screen w-full bg-black text-white overflow-hidden">
      {/* Show toast if there's an error */}
      {showToast && errorMessage && (
        <Toast 
          message={errorMessage} 
          type="error" 
          onClose={() => setShowToast(false)} 
        />
      )}

      {/* Top Left Logo */}
      <div className="sticky md:absolute top-2 left-2 z-20 ">
        <img src={Logo} alt="SRS Café Logo" className="w-24 sm:w-28" />
      </div>

      {/* Background Image */}
      <img
        src={Ambassador}
        alt="Ambassador"
        className="absolute bottom-0 left-0 h-[80%] sm:h-[60%] md:h-[80%] object-contain opacity-80"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-end md:h-full px-4 py-0 md:px-20 md:py-0 overflow-auto">
        <div className="flex flex-col md:flex-row w-full md:h-[80%] max-w-5xl bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Left Side */}
          <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
            <h1 className="sm-text-3xl text-4xl font-bold mb-4 leading-snug">
              Accelerate Your Tech Innovation
            </h1>
            <p className="text-base text-gray-300 sm:text-lg md:text-xl">
              Seamless workspace access, fast internet, and 24/7 availability
              for coders, designers, and thinkers.
            </p>
          </div>

          {/* Right Side Form */}
          <div className="md:w-1/2 w-full bg-[#f5f5f5] text-black  lg:text-xl p-10 sm:p-6 flex flex-col justify-center rounded-2xl">
            <div className="text-center pb-6 flex flex-col justify-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-2 leading-snug">Login</h2>
            </div>
            {/* Role Tabs */}
            <div className="flex justify-between w-full mb-6 text-sm sm:text-base">
              {["worker", "admin1", "admin2"].map((r) => (
                <button
                  key={r}
                  className={`w-1/3 px-2 py-2 sm:px-4 rounded-lg transition font-medium md:font-small text-nowrap ${role === r ? "bg-black text-white" : "text-black"
                    }`}
                  onClick={() => setRole(r)}
                >
                  {r === "admin1" ? "Admin 1" : r === "admin2" ? "Admin 2" : "Worker"}
                </button>
              ))}
            </div>

            {/* Login Form for all roles */}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-black text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'
                } transition`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Login
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
