import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Logo from "../assets/SRSLogoWhite.svg";
import Ambassador from "../assets/Ambassador.png";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-x-hidden relative">
      {/* Animated Glassmorphism Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        
        
      </div>
      {/* Animated Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0 animate-pulse-slow">
          <circle cx="20%" cy="30%" r="2" fill="#fff" fillOpacity="0.15" />
          <circle cx="80%" cy="60%" r="1.5" fill="#fff" fillOpacity="0.10" />
          <circle cx="50%" cy="80%" r="2.5" fill="#fff" fillOpacity="0.12" />
          <circle cx="70%" cy="20%" r="1.2" fill="#fff" fillOpacity="0.10" />
          <circle cx="30%" cy="70%" r="1.8" fill="#fff" fillOpacity="0.13" />
        </svg>
      </div>
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
      <section className="flex flex-col md:flex-row items-center justify-center px-4 md:px-8 py-12 md:py-16 gap-10 md:gap-16 z-10 relative">
        {/* Left: Contact Info */}
        <div className="flex-1 max-w-lg space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent drop-shadow-2xl animate-fade-in-up">
            Let's Connect
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-4 animate-fade-in-up">
            Have a question, idea, or just want to say hi? <br />
            Our team is always ready to help you unlock your next big breakthrough.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 group">
              <FaEnvelope className="text-gray-200 text-2xl group-hover:scale-125 group-hover:text-white transition-transform duration-300 animate-wiggle" />
              <span className="text-lg">contact@srscafe.com</span>
            </div>
            <div className="flex items-center gap-4 group">
              <FaPhoneAlt className="text-gray-400 text-2xl group-hover:scale-125 group-hover:text-white transition-transform duration-300 animate-wiggle" />
              <span className="text-lg">+234 800 123 4567</span>
            </div>
            <div className="flex items-center gap-4 group">
              <FaMapMarkerAlt className="text-gray-500 text-2xl group-hover:scale-125 group-hover:text-white transition-transform duration-300 animate-wiggle" />
              <span className="text-lg">
                42 Innovation Avenue, Tech City, Nigeria
              </span>
            </div>
          </div>
          <div className="flex gap-6 mt-6">
            <a href="https://instagram.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition text-2xl animate-float-icon">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition text-2xl animate-float-icon-delay">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition text-2xl animate-float-icon">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="flex-1 max-w-xl bg-white/10 rounded-3xl shadow-10xl backdrop-blur-10xl border border-white/20 p-8 md:p-10 animate-fade-in-up hover:shadow-3xl hover:scale-[1.025] transition-transform duration-300 relative z-10 ring-2 ring-white/30 ring-offset-2 ring-offset-black">
          {/* Ambassador Image Behind Form */}
          
          <h2 className="text-3xl font-bold mb-6 text-white relative z-10">Send Us a Message</h2>
          <form className="space-y-6 relative z-10">
            <div>
              <label className="block mb-2 text-lg font-semibold">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/10 focus:outline-none placeholder-gray-400 focus:ring-4 focus:ring-white/30 focus:shadow-lg transition"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/10 focus:outline-none placeholder-gray-400 focus:ring-4 focus:ring-white/30 focus:shadow-lg transition"
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">Message</label>
              <textarea
                className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/10 focus:outline-none placeholder-gray-400 focus:ring-4 focus:ring-white/30 focus:shadow-lg transition"
                rows={5}
                placeholder="How can we help you accelerate your tech journey?"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl shadow-2xl border border-white/20 transition duration-200 transform hover:scale-105 text-lg backdrop-blur-md animate-glow ring-2 ring-white/30 ring-offset-2 ring-offset-black">
              Send Message
            </button>
          </form>
          <p className="mt-6 text-center text-gray-300 text-base relative z-10">
            We typically respond within 24 hours. Your innovation journey starts here!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 py-8 border-t border-white/10 text-gray-400 text-base bg-black/30 backdrop-blur-lg">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <FaEnvelope className="mr-1" />
          <span>contact@srscafe.com</span>
        </div>
        <span className="text-center md:text-left flex-1">
          Seamless workspace access, fast internet, and 24/7 availability for coders, designers, and thinkers.
        </span>
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
          @keyframes float-slow {
            0%,100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-30px) scale(1.05); }
          }
          .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
          @keyframes float-medium {
            0%,100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.03); }
          }
          .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
          @keyframes float-fast {
            0%,100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-40px) scale(1.08); }
          }
          .animate-float-fast { animation: float-fast 10s ease-in-out infinite; }
          @keyframes pulse-logo {
            0%,100% { filter: drop-shadow(0 0 8px #fff3); }
            50% { filter: drop-shadow(0 0 24px #fff8); }
          }
          .animate-pulse-logo { animation: pulse-logo 2.5s infinite; }
          @keyframes wiggle {
            0%,100% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
          }
          .animate-wiggle { animation: wiggle 2s infinite; }
          @keyframes float-icon {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-float-icon { animation: float-icon 3s ease-in-out infinite; }
          .animate-float-icon-delay { animation: float-icon 3s ease-in-out infinite 1.5s; }
          @keyframes glow {
            0%,100% { box-shadow: 0 0 0px #fff2; }
            50% { box-shadow: 0 0 24px #fff6, 0 0 48px #fff3; }
          }
          .animate-glow { animation: glow 2.5s infinite; }
          @keyframes pulse-slow {
            0%,100% { opacity: 0.12; }
            50% { opacity: 0.22; }
          }
          .animate-pulse-slow { animation: pulse-slow 5s infinite; }
        `}
      </style>
    </div>
  );
}