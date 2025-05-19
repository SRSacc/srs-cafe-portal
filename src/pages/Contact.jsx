import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Logo from "../assets/SRSLogoWhite.svg";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="SRS Café Logo" className="w-12 h-12 drop-shadow-lg" />
          <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow">
            SRS Café
          </span>
        </div>
        <span className="text-lg font-semibold text-blue-300 hidden md:block">
          Accelerate Your Tech Innovation
        </span>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-8 py-16 gap-16">
        {/* Left: Contact Info */}
        <div className="flex-1 max-w-lg space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up">
            Let's Connect
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light mb-4 animate-fade-in-up">
            Have a question, idea, or just want to say hi? <br />
            Our team is always ready to help you unlock your next big breakthrough.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-400 text-2xl" />
              <span className="text-lg">contact@srscafe.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-cyan-400 text-2xl" />
              <span className="text-lg">+234 800 123 4567</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-purple-400 text-2xl" />
              <span className="text-lg">
                42 Innovation Avenue, Tech City, Nigeria
              </span>
            </div>
          </div>
          <div className="flex gap-6 mt-6">
            <a href="https://instagram.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition text-2xl">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition text-2xl">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/srscafe" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="flex-1 max-w-xl bg-white/10 rounded-3xl shadow-2xl backdrop-blur-2xl border border-white/20 p-10 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-6 text-white">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-lg font-semibold">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none"
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">Message</label>
              <textarea
                className="w-full p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none"
                rows={5}
                placeholder="How can we help you accelerate your tech journey?"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-xl transition duration-200 transform hover:scale-105 text-lg"
            >
              Send Message
            </button>
          </form>
          <p className="mt-6 text-center text-gray-300 text-base">
            We typically respond within 24 hours. Your innovation journey starts here!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row items-center justify-between px-8 py-8 border-t border-white/10 text-gray-400 text-base bg-black/30 backdrop-blur-lg">
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
        `}
      </style>
    </div>
  );
}