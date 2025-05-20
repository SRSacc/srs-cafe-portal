import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/SRSLogoWhite.svg";
import { FaUsers, FaLightbulb, FaCode, FaHeart, FaInstagram, FaTwitter, FaEnvelope} from "react-icons/fa";

export default function About() {
    // const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-black text-white font-sans flex flex-col overflow-x-hidden">
      {/* Navigation Bar (copied from LandingPage.jsx) */}
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
      <section className="relative z-10 flex flex-col items-center justify-center px-8 py-16 text-center animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent drop-shadow mb-6">About SRS Café</h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">Where innovation meets community. Discover our mission, our journey, and the passionate team behind the future of tech workspaces.</p>
      </section>

      {/* Mission & Vision */}
      <section className="relative z-10 py-12 px-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-white/10 rounded-2xl p-8 shadow-lg backdrop-blur-lg border border-white/10 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent">Our Mission</h2>
          <p className="text-gray-200">Empowering creators, coders, and entrepreneurs with a space that inspires productivity, collaboration, and growth.</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-8 shadow-lg backdrop-blur-lg border border-white/10 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent">Our Vision</h2>
          <p className="text-gray-200">To be the launchpad for the next generation of tech leaders, fostering a vibrant, inclusive, and innovative community.</p>
        </div>
      </section>

      {/* Why SRS Café Section */}
      <section className="relative z-10 py-12 px-8 max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent">Why SRS Café?</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="bg-white/10 rounded-xl p-6 shadow-lg border border-white/10 animate-fade-in-up w-full md:w-1/3">
            <span className="block text-lg font-bold text-gray-100 mb-2">Cutting-Edge Space</span>
            <p className="text-gray-300">A modern, inspiring environment designed for creators, coders, and innovators to thrive.</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow-lg border border-white/10 animate-fade-in-up w-full md:w-1/3">
            <span className="block text-lg font-bold text-gray-100 mb-2">Community-Driven</span>
            <p className="text-gray-300">Connect with like-minded individuals and be part of a vibrant, supportive tech community.</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow-lg border border-white/10 animate-fade-in-up w-full md:w-1/3">
            <span className="block text-lg font-bold text-gray-100 mb-2">Always Evolving</span>
            <p className="text-gray-300">We're new, we're growing, and we're committed to bringing the best to our members every day.</p>
          </div>
        </div>
      </section>

      {/* Team Showcase */}
      <section className="relative z-10 py-12 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 rounded-2xl p-8 shadow-lg border border-white/10 flex flex-col items-center animate-fade-in-up">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" className="w-20 h-20 rounded-full border-2 border-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-100 mb-1">Akosa Sharon</h3>
            <span className="text-gray-400 mb-2">Founder & CEO</span>
            <div className="flex gap-3">
              <a href="#" className="hover:text-gray-200 transition text-xl"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-200 transition text-xl"><FaTwitter /></a>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 shadow-lg border border-white/10 flex flex-col items-center animate-fade-in-up">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" className="w-20 h-20 rounded-full border-2 border-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-100 mb-1">Tochukwu Tejo</h3>
            <span className="text-gray-400 mb-2">Cafe Manager</span>
            <div className="flex gap-3">
              <a href="#" className="hover:text-gray-200 transition text-xl"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-200 transition text-xl"><FaTwitter /></a>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 shadow-lg border border-white/10 flex flex-col items-center animate-fade-in-up">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Team Member" className="w-20 h-20 rounded-full border-2 border-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-100 mb-1">Nicodemus Chidera</h3>
            <span className="text-gray-400 mb-2"> Manager </span>
            <div className="flex gap-3">
              <a href="#" className="hover:text-gray-200 transition text-xl"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-200 transition text-xl"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative z-10 py-12 px-8 max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-white/10 rounded-2xl p-6 shadow-lg border border-white/10 animate-fade-in-up">
            <FaUsers className="text-4xl text-gray-300 mb-2" />
            <span className="font-bold text-gray-100">Community</span>
          </div>
          <div className="flex flex-col items-center bg-white/10 rounded-2xl p-6 shadow-lg border border-white/10 animate-fade-in-up">
            <FaLightbulb className="text-4xl text-gray-300 mb-2" />
            <span className="font-bold text-gray-100">Innovation</span>
          </div>
          <div className="flex flex-col items-center bg-white/10 rounded-2xl p-6 shadow-lg border border-white/10 animate-fade-in-up">
            <FaCode className="text-4xl text-gray-300 mb-2" />
            <span className="font-bold text-gray-100">Excellence</span>
          </div>
          <div className="flex flex-col items-center bg-white/10 rounded-2xl p-6 shadow-lg border border-white/10 animate-fade-in-up">
            <FaHeart className="text-4xl text-gray-300 mb-2" />
            <span className="font-bold text-gray-100">Passion</span>
          </div>
        </div>
      </section>

      {/* Footer (copied from LandingPage.jsx) */}
      <footer className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 py-8 border-t border-white/10 text-gray-400 text-base bg-black/30 backdrop-blur-lg">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="mr-1"><FaEnvelope /></span>
          <span>contact@srscafe.com</span>
        </div>
        <div className="flex gap-4">
          <a href="https://instagram.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition text-xl"><FaInstagram /></a>
          <a href="https://twitter.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition text-xl"><FaTwitter /></a>
        </div>
        <span>&copy; {new Date().getFullYear()} SRS Café. All rights reserved.</span>
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}