import { useState } from "react";
import { Navigate } from "react-router-dom";
import Logo from "../assets/SRSLogoWhite.svg";
import Ambassador from "../assets/Ambassador.png";

export default function AuthPage() {
  const [role, setRole] = useState("admin2");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === "admin2" && username && password) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard/admin2" />;
  }

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* Fullscreen Logo Background */}
      {/* <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img src={Logo} alt="Background Logo" className="w-3/4 max-w-4xl" />
      </div> */}
      {/* Top Left Logo */}
        <div className="absolute top-6 left-6 z-20">
            <img src={Logo} alt="SRS Café Logo" className="w-28" />
        </div>
      {/* Background Image */}
      <img
        src={Ambassador}
        alt="Ambassador"
        className="absolute bottom-0 left-0 h-[80%] object-contain opacity-80"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-end h-full px-20">
        <div className="flex w-full h-[80%] max-w-4xl bg-white/05 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Left Side */}
          
          <div className="w-1/2 p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 leading-snug">
              Accelerate Your Tech Innovation
            </h1>
            <p className="text-gray-300 text-xl">
              Seamless workspace access, fast internet, and 24/7 availability
              for coders, designers, and thinkers.
            </p>
          </div>

          {/* Right Side Form */}

          <div className="w-1/2 bg-[#f5f5f5] text-black  text-xl p-10 flex flex-col justify-center rounded-2xl">
            <div className="text-center pb-10 flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-4 leading-snug">Login</h2>
            </div>
            {/* Role Tabs */}
            <div className="flex justify-around mb-6">
              <button
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  role === "worker" ? "bg-black text-white" : "text-black"
                }`}
                onClick={() => setRole("worker")}
              >
                Worker
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  role === "admin1" ? "bg-black text-white" : "text-black"
                }`}
                onClick={() => setRole("admin1")}
              >
                Admin 1
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  role === "admin2" ? "bg-black text-white" : "text-black"
                }`}
                onClick={() => setRole("admin2")}
              >
                Admin 2
              </button>
              
            </div>

            {/* Login Form (Admin 2 only for now) */}
            {role === "admin2" ? (
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
