import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/SRSLogoWhite.svg";
import { FaWifi, FaClock, FaUsers, FaRocket, FaEnvelope, FaInstagram, FaTwitter } from "react-icons/fa";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black text-white font-sans flex flex-col overflow-x-hidden">
      {/* Animated Gradient Blobs (now subtle gray/white) */}
      {/* Remove or comment out these two lines for gradient blobs */}
      {/* <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-700 via-gray-500 to-white opacity-10 rounded-full blur-3xl animate-blob1 pointer-events-none" /> */}
      {/* <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-gray-400 via-gray-700 to-black opacity-10 rounded-full blur-3xl animate-blob2 pointer-events-none" /> */}

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="SRS Café Logo" className="w-12 h-12 drop-shadow-lg" />
          <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent drop-shadow">SRS Café</span>
        </div>
        <nav className="flex gap-4 md:gap-6 items-center">
          <Link to="/" className="hover:text-gray-300 transition font-semibold">Home</Link>
          <Link to="/about" className="hover:text-gray-300 transition font-semibold">About</Link>
          <Link to="/contact" className="hover:text-gray-300 transition font-semibold">Contact</Link>
          <Link to="/pricing" className="hover:text-gray-300 transition font-semibold">Pricing</Link>
          <Link to="/AuthPage" className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition duration-200">Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center px-8 py-16 gap-16">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up">
            Accelerate Your Tech Innovation
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light mb-4 animate-fade-in-up">
            Seamless workspace access, fast internet, and 24/7 availability for coders, designers, and thinkers.
          </p>
          <div className="flex gap-4 animate-fade-in-up">
            <button
              onClick={() => navigate('/AuthPage')}
              className="bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900 text-white px-10 py-3 rounded-xl font-bold text-lg shadow-xl transition duration-200 transform hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/about')}
              className="bg-white/10 hover:bg-white/20 text-gray-200 px-10 py-3 rounded-xl font-semibold text-lg border border-gray-400 transition duration-200 transform hover:scale-105"
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
              boxShadow: "0 12px 48px 0 rgba(20,20,20,0.55), 0 1.5px 8px 0 rgba(80,80,80,0.18)"
            }} />
            {/* Glass Card with subtle border and circuit lines */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/90 rounded-3xl shadow-2xl backdrop-blur-xl border border-gray-700/40 overflow-hidden z-10">
              {/* Circuit lines SVG */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 384 384" fill="none">
                <path d="M32 32 L352 32 M32 352 L352 352 M32 32 L32 352 M352 32 L352 352" stroke="#bdbdbd" strokeWidth="1.2" strokeDasharray="6 8"/>
                <circle cx="192" cy="192" r="110" stroke="#e0e0e0" strokeWidth="1.2" strokeDasharray="4 6"/>
                <path d="M80 192 H304" stroke="#bdbdbd" strokeWidth="1" strokeDasharray="2 4"/>
                <path d="M192 80 V304" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="2 4"/>
              </svg>
            </div>
            {/* Gentle gray glow behind logo */}
            <span className="absolute w-56 h-56 rounded-full bg-black opacity-20 blur-2xl z-10"></span>
            {/* Logo */}
            <img src={Logo} alt="SRS Café" className="w-44 h-44 object-contain opacity-95 z-20 drop-shadow-xl animate-pulse-logo" />
            {/* Floating Badges with glass effect */}
            <span className="absolute -top-8 -right-8 flex items-center gap-2 bg-gradient-to-r from-gray-800/80 to-gray-700/70 text-white px-5 py-2 rounded-2xl shadow-lg font-semibold text-base animate-wiggle glass-badge z-30 border border-gray-700/40" style={{backdropFilter: "blur(6px)"}}>
              <FaClock className="mr-2 opacity-80" /> 24/7
            </span>
            <span className="absolute -bottom-8 -left-8 flex items-center gap-2 bg-gradient-to-r from-gray-900/80 to-gray-700/70 text-white px-5 py-2 rounded-2xl shadow-lg font-semibold text-base animate-wiggle glass-badge z-30 border border-gray-800/40" style={{backdropFilter: "blur(6px)"}}>
              <FaWifi className="mr-2 opacity-80" /> WiFi
            </span>
            {/* Decorative Dots */}
            <span className="absolute top-8 left-1/2 w-3 h-3 bg-white rounded-full blur-sm opacity-30 animate-pulse" />
            <span className="absolute bottom-12 right-12 w-2 h-2 bg-gray-400 rounded-full blur-sm opacity-20 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="relative rounded-2xl p-10 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-200 border border-white/10 overflow-hidden glass-animate" style={{
          background: '#000',
          backdropFilter: 'blur(18px)'
        }}>
          <span className="absolute inset-0 z-0 pointer-events-none" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
            filter: 'blur(18px) brightness(1.2)',
            borderRadius: '1.25rem'
          }} />
          <FaWifi className="text-5xl text-gray-300 mb-4 drop-shadow" />
          <h3 className="text-2xl font-bold mb-2 text-gray-100">Ultra-fast WiFi</h3>
          <p className="text-gray-300 text-center">Experience seamless connectivity for all your devices, all day long.</p>
        </div>
        <div className="relative rounded-2xl p-10 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-200 border border-white/10 overflow-hidden glass-animate" style={{
          background: '#000',
          backdropFilter: 'blur(18px)'
        }}>
          <span className="absolute inset-0 z-0 pointer-events-none" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
            filter: 'blur(18px) brightness(1.2)',
            borderRadius: '1.25rem'
          }} />
          <FaClock className="text-5xl text-gray-300 mb-4 drop-shadow" />
          <h3 className="text-2xl font-bold mb-2 text-gray-100">24/7 Access</h3>
          <p className="text-gray-300 text-center">Work anytime with round-the-clock access to our creative space.</p>
        </div>
        <div className="relative rounded-2xl p-10 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-200 border border-white/10 overflow-hidden glass-animate" style={{
          background: '#000',
          backdropFilter: 'blur(18px)'
        }}>
          <span className="absolute inset-0 z-0 pointer-events-none" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
            filter: 'blur(18px) brightness(1.2)',
            borderRadius: '1.25rem'
          }} />
          <FaUsers className="text-5xl text-gray-300 mb-4 drop-shadow" />
          <h3 className="text-2xl font-bold mb-2 text-gray-100">Community</h3>
          <p className="text-gray-300 text-center">Connect and collaborate with like-minded tech enthusiasts.</p>
        </div>
        <div className="relative rounded-2xl p-10 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-200 border border-white/10 overflow-hidden glass-animate" style={{
          background: '#000',
          backdropFilter: 'blur(18px)'
        }}>
          <span className="absolute inset-0 z-0 pointer-events-none" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
            filter: 'blur(18px) brightness(1.2)',
            borderRadius: '1.25rem'
          }} />
          <FaRocket className="text-5xl text-gray-300 mb-4 drop-shadow" />
          <h3 className="text-2xl font-bold mb-2 text-gray-100">Launchpad</h3>
          <p className="text-gray-300 text-center">Kickstart your projects with the perfect environment and resources.</p>
        </div>
      </section>

      {/* Testimonial / Community Highlight */}
      <section className="relative z-10 py-16 px-8 max-w-4xl mx-auto text-center">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="inline-block bg-white/10 rounded-2xl px-10 py-8 shadow-lg backdrop-blur-lg border border-white/10 animate-fade-in-up">
            <blockquote className="text-3xl italic text-gray-100 mb-4 font-light">
              “SRS Café transformed the way I work. The energy, the people, and the vibe are unmatched!”
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-14 h-14 rounded-full border-2 border-gray-400 shadow" />
              <span className="font-semibold text-white text-lg">Ewdard David., Forex Trader</span>
            </div>
          </div>
          <div className="inline-block bg-white/10 rounded-2xl px-10 py-8 shadow-lg backdrop-blur-lg border border-white/10 animate-fade-in-up">
            <blockquote className="text-3xl italic text-gray-100 mb-4 font-light">
              “The 24/7 access is a game changer for my productivity. Highly recommended!”
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-14 h-14 rounded-full border-2 border-gray-400 shadow" />
              <span className="font-semibold text-white text-lg">Chirah Somto., <br /> UI/UX Designer</span>
            </div>
          </div>
          <div className="inline-block bg-white/10 rounded-2xl px-10 py-8 shadow-lg backdrop-blur-lg border border-white/10 animate-fade-in-up">
            <blockquote className="text-3xl italic text-gray-100 mb-4 font-light">
              “Great community and super-fast WiFi. I love working here!”
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="User" className="w-14 h-14 rounded-full border-2 border-gray-400 shadow" />
              <span className="font-semibold text-white text-lg">Inya Paschal., <br />Backend Developer</span>
            </div>
          </div>
          <div className="inline-block bg-white/10 rounded-2xl px-10 py-8 shadow-lg backdrop-blur-lg border border-white/10 animate-fade-in-up">
            <blockquote className="text-3xl italic text-gray-100 mb-4 font-light">
              “The perfect launchpad for my startup ideas. The environment is inspiring!”
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" className="w-14 h-14 rounded-full border-2 border-gray-400 shadow" />
              <span className="font-semibold text-white text-lg">Prince Nwoha., Copywriter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 flex flex-col items-center bg-gradient-to-r from-gray-900/70 via-black/70 to-gray-700/70 rounded-2xl sm:rounded-3xl mx-2 sm:mx-8 mb-16 sm:mb-12 shadow-2xl animate-fade-in-up border border-white/10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent drop-shadow text-center">
          Ready to join the future of work?
        </h2>
        <button
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-xl sm:text-2xl shadow-xl transition mt-2 transform hover:scale-105 w-full sm:w-auto"
        >
          Get Your Pass
        </button>
        {/* Back to Top Button - responsive positioning */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-black text-white font-bold shadow-2xl border-2 border-white/20 hover:scale-110 transition-transform duration-300 animate-float fixed right-4 bottom-4 sm:right-8 sm:bottom-8 sm:fixed absolute sm:translate-y-0 translate-y-[-120%] sm:translate-y-0"
          style={{
            boxShadow: "0 4px 24px 0 rgba(80,80,80,0.18), 0 1.5px 8px 0 rgba(40,40,40,0.18)",
            backdropFilter: "blur(6px)",
            zIndex: 100
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
          <a href="https://instagram.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition text-xl"><FaInstagram /></a>
          <a href="https://twitter.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition text-xl"><FaTwitter /></a>
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
          @keyframes float-slow {
            0%, 100% { transform: translateY(0) scale(1);}
            50% { transform: translateY(-30px) scale(1.1);}
          }
          .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
          @keyframes float-fast {
            0%, 100% { transform: translateY(0) scale(1);}
            50% { transform: translateY(-10px) scale(1.05);}
          }
          .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
          @keyframes float-mid {
            0%, 100% { transform: translateY(0) scale(1);}
            50% { transform: translateY(-18px) scale(1.08);}
          }
          .animate-float-mid { animation: float-mid 8s ease-in-out infinite; }
          @keyframes spin-slow {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .animate-spin-slow { animation: spin-slow 18s linear infinite; }
          @keyframes pulse-logo {
            0%, 100% { filter: drop-shadow(0 0 12px #fff) brightness(1);}
            50% { filter: drop-shadow(0 0 32px #fff) brightness(1.2);}
          }
          .animate-pulse-logo { animation: pulse-logo 3s infinite; }
          @keyframes wiggle {
            0%,100% { transform: rotate(-3deg);}
            50% { transform: rotate(3deg);}
          }
          .animate-wiggle { display:inline-block; animation: wiggle 2s infinite;}
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          .animate-typewriter {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid #fff3;
            width: 0;
            animation: typewriter 3s steps(40, end) 1s 1 normal both;
          }
          @keyframes glass-glow-move {
            0% { transform: translateY(-100%); opacity: 0.7; }
            20% { opacity: 1; }
            50% { transform: translateY(0); opacity: 0.9; }
            80% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0.7; }
          }
          .glass-glow {
            background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.10) 100%);
            filter: blur(18px) brightness(1.3);
            border-radius: 1.25rem;
            animation: glass-glow-move 3.5s cubic-bezier(.4,0,.2,1) infinite;
          }
          .glass-animate { position: relative; z-index: 1; }
        `}
      </style>
      <style>
        {`
          .shining-stars-border {
            border: 2px solid transparent;
            border-radius: 1.25rem;
            position: relative;
            z-index: 1;
          }
          .stars-overlay {
            border-radius: 1.25rem;
            pointer-events: none;
            background: repeating-conic-gradient(from 0deg, #fff 0deg 2deg, transparent 2deg 10deg);
            opacity: 0.18;
            animation: stars-twinkle 2.5s linear infinite;
          }
          @keyframes stars-twinkle {
            0% { filter: brightness(1) blur(0.5px); opacity: 0.18; }
            50% { filter: brightness(2) blur(1.5px); opacity: 0.28; }
            100% { filter: brightness(1) blur(0.5px); opacity: 0.18; }
          }
        `}
      </style>
    </div>
  );
}