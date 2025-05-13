import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/SRSLogoWhite.svg";
import { FaWifi, FaClock, FaUsers, FaRocket, FaEnvelope, FaInstagram, FaTwitter } from "react-icons/fa";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white font-sans flex flex-col overflow-x-hidden">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-30 rounded-full blur-3xl animate-blob1 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-cyan-400 via-blue-600 to-purple-600 opacity-20 rounded-full blur-3xl animate-blob2 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="SRS Café Logo" className="w-12 h-12 drop-shadow-lg" />
          <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow">SRS Café</span>
        </div>
        <nav className="flex gap-6">
          <Link to="/about" className="hover:text-blue-400 transition font-semibold">About</Link>
          <Link to="/contact" className="hover:text-blue-400 transition font-semibold">Contact</Link>
          <Link to="/AuthPage" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition duration-200">Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center px-8 py-16 gap-16">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up">
            Accelerate Your Tech Innovation
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light mb-4 animate-fade-in-up">
            Seamless workspace access, fast internet, and 24/7 availability for coders, designers, and thinkers.
          </p>
          <div className="flex gap-4 animate-fade-in-up">
            <button
              onClick={() => navigate('/AuthPage')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-3 rounded-xl font-bold text-lg shadow-xl transition duration-200 transform hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/about')}
              className="bg-white/10 hover:bg-white/20 text-blue-300 px-10 py-3 rounded-xl font-semibold text-lg border border-blue-400 transition duration-200 transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
        {/* Right: Visual */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Soft dark radial shadow for depth */}
            <div className="absolute inset-0 rounded-3xl z-0" style={{
              boxShadow: "0 12px 48px 0 rgba(20,30,60,0.55), 0 1.5px 8px 0 rgba(40,60,120,0.18)"
            }} />
            {/* Glass Card with subtle border and circuit lines */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/90 rounded-3xl shadow-2xl backdrop-blur-xl border border-blue-900/40 overflow-hidden z-10">
              {/* Circuit lines SVG */}
              <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 384 384" fill="none">
                <path d="M32 32 L352 32 M32 352 L352 352 M32 32 L32 352 M352 32 L352 352" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="6 8"/>
                <circle cx="192" cy="192" r="110" stroke="#6366f1" strokeWidth="1.2" strokeDasharray="4 6"/>
                <path d="M80 192 H304" stroke="#818cf8" strokeWidth="1" strokeDasharray="2 4"/>
                <path d="M192 80 V304" stroke="#a5b4fc" strokeWidth="1" strokeDasharray="2 4"/>
              </svg>
            </div>
            {/* Gentle blue glow behind logo */}
            <div className="absolute w-56 h-56 rounded-full bg-blue-800 opacity-30 blur-2xl z-10"></div>
            {/* Logo */}
            <img src={Logo} alt="SRS Café" className="w-44 h-44 object-contain opacity-95 z-20 drop-shadow-xl animate-fade-in-up" />
            {/* Floating Badges with glass effect */}
            <span className="absolute -top-8 -right-8 flex items-center gap-2 bg-gradient-to-r from-blue-900/80 to-blue-700/70 text-white px-5 py-2 rounded-2xl shadow-lg font-semibold text-base animate-bounce glass-badge z-30 border border-blue-800/40" style={{backdropFilter: "blur(6px)"}}>
              <FaClock className="mr-2 opacity-80" /> 24/7
            </span>
            <span className="absolute -bottom-8 -left-8 flex items-center gap-2 bg-gradient-to-r from-purple-900/80 to-purple-700/70 text-white px-5 py-2 rounded-2xl shadow-lg font-semibold text-base animate-pulse glass-badge z-30 border border-purple-800/40" style={{backdropFilter: "blur(6px)"}}>
              <FaWifi className="mr-2 opacity-80" /> WiFi
            </span>
            {/* Decorative Dots */}
            <span className="absolute top-8 left-1/2 w-3 h-3 bg-blue-500 rounded-full blur-sm opacity-50 animate-pulse" />
            <span className="absolute bottom-12 right-12 w-2 h-2 bg-purple-400 rounded-full blur-sm opacity-40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="bg-white/10 rounded-2xl p-10 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-200 backdrop-blur-lg border border-white/10 animate-fade-in-up">
          <FaWifi className="text-5xl text-blue-400 mb-4 drop-shadow" />
          <h3 className="text-2xl font-bold mb-2">Ultra-fast WiFi</h3>
          <p className="text-gray-300 text-center">Experience seamless connectivity for all your devices, all day long.</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-10 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-200 backdrop-blur-lg border border-white/10 animate-fade-in-up">
          <FaClock className="text-5xl text-purple-400 mb-4 drop-shadow" />
          <h3 className="text-2xl font-bold mb-2">24/7 Access</h3>
          <p className="text-gray-300 text-center">Work on your schedule—our doors never close for innovation.</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-10 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-200 backdrop-blur-lg border border-white/10 animate-fade-in-up">
          <FaUsers className="text-5xl text-cyan-400 mb-4 drop-shadow" />
          <h3 className="text-2xl font-bold mb-2">Tech Community</h3>
          <p className="text-gray-300 text-center">Join a thriving network of creators, coders, and entrepreneurs.</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-10 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-200 backdrop-blur-lg border border-white/10 animate-fade-in-up">
          <FaRocket className="text-5xl text-pink-400 mb-4 drop-shadow" />
          <h3 className="text-2xl font-bold mb-2">Productivity Boost</h3>
          <p className="text-gray-300 text-center">Focus, collaborate, and launch your next big idea in style.</p>
        </div>
      </section>

{/* Testimonial / Community Highlight */}
      <section className="relative z-10 py-16 px-8 max-w-4xl mx-auto text-center">
        <div className="inline-block bg-white/10 rounded-2xl px-10 py-8 shadow-lg backdrop-blur-lg border border-white/10 animate-fade-in-up">
          <blockquote className="text-3xl italic text-gray-100 mb-4 font-light">
            “SRS Café transformed the way I work. The energy, the people, and the vibe are unmatched!”
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-14 h-14 rounded-full border-2 border-blue-400 shadow" />
            <span className="font-semibold text-white text-lg">Alex T., Full Stack Developer</span>
          </div      >
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-16 px-8 flex flex-col items-center bg-gradient-to-r from-blue-900/70 via-black/70 to-purple-900/70 rounded-3xl mx-8 mb-12 shadow-2xl animate-fade-in-up border border-white/10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow">
          Ready to join the future of work?
        </h2>
        <button
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-5 rounded-2xl font-bold text-2xl shadow-xl transition mt-2 transform hover:scale-105"
        >
          Get Your Pass
        </button>
        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-8 bottom-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold shadow-2xl border-2 border-white/20 hover:scale-110 transition-transform duration-300 animate-float"
          style={{
            boxShadow: "0 4px 24px 0 rgba(80,60,180,0.18), 0 1.5px 8px 0 rgba(40,60,120,0.18)",
            backdropFilter: "blur(6px)"
          }}
          aria-label="Back to Top"
        >
          <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
          </svg>
          Top
        </button>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 py-8 border-t border-white/10 text-gray-400 text-base bg-black/30 backdrop-blur-lg">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <FaEnvelope className="mr-1" />
          <span>contact@srscafe.com</span>
        </div>
        <div className="flex gap-4">
          <a href="https://instagram.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition text-xl"><FaInstagram /></a>
          <a href="https://twitter.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition text-xl"><FaTwitter /></a>
        </div>
        <span>&copy; {new Date().getFullYear()} SRS Café. All rights reserved.</span>
      </footer>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(.4,0,.2,1) both; }
          @keyframes float {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-20px);}
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          @keyframes blob1 {
            0%,100% { transform: translate(0,0) scale(1);}
            50% { transform: translate(-40px, 30px) scale(1.1);}
          }
          .animate-blob1 { animation: blob1 16s ease-in-out infinite; }
          @keyframes blob2 {
            0%,100% { transform: translate(0,0) scale(1);}
            50% { transform: translate(40px, -30px) scale(1.07);}
          }
          .animate-blob2 { animation: blob2 18s ease-in-out infinite; }
          @keyframes wiggle {
            0%,100% { transform: rotate(-3deg);}
            50% { transform: rotate(3deg);}
          }
          .animate-wiggle { display:inline-block; animation: wiggle 2s infinite;}
          @keyframes neon-border {
            0%, 100% { box-shadow: 0 0 24px 4px #38bdf8, 0 0 48px 8px #a78bfa; }
            50% { box-shadow: 0 0 48px 12px #a78bfa, 0 0 24px 4px #38bdf8; }
          }
          .animate-neon-border {
            border: 2.5px solid transparent;
            background: linear-gradient(120deg, #38bdf8 0%, #a78bfa 100%) border-box;
            border-radius: 1.5rem;
            animation: neon-border 3s infinite alternate;
            z-index: 1;
          }
          .glass-badge {
            backdrop-filter: blur(8px);
            background: rgba(255,255,255,0.08);
            border: 1.5px solid rgba(255,255,255,0.18);
          }
        `}
      </style>
    </div>
  );
}