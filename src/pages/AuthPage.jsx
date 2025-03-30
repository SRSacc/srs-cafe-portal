import { useState } from "react";
import { Navigate } from "react-router-dom";
import Logo from "../assets/SRSLogoWhite.svg";
import Ambassador from "../assets/Ambassador.png";


export default function AuthPage() {
  const [role, setRole] = useState("admin1");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === "admin1" && username && password) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/admin1/dashboard" />;
  }

  return (
    <div className="relative h-full md:h-screen w-full bg-black text-white overflow-hidden">
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
                  className={`w-1/3 px-2 py-2 sm:px-4 rounded-lg transition font-medium md:font-small text-nowrap ${
                    role === r ? "bg-black text-white" : "text-black"
                  }`}
                  onClick={() => setRole(r)}
                >
                  {/* Consider adding icons here later */}
                  {r === "admin1" ? "Admin 1" : r === "admin2" ? "Admin 2" : "Worker"}
                </button>
              ))}              
            </div>

            {/* Login Form (Admin 1 only for now) */}
            {role === "admin1" ? (
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
                  className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Login
                </button>
              </form>
            ) : (
              <div className="text-center text-gray-500">
                <p>Login for this role is not available yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
