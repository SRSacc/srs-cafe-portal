import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/SRSLogoWhite.svg";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const pricingData = {
  workers: [
    {
      name: "Full Access",
      prices: {
        monthly: "₦24,000/mo",
        halfday_monthly: "₦20,000/mo (Half-Day)",
        biweekly: "₦13,000/2wks",
        biweekly_halfday: "₦11,000/2wks (Half-Day)",
        weekly: "₦8,000/wk",
        weekly_halfday: "₦6,000/wk (Half-Day)",
        daily: "₦1,800/day",
        halfday: "₦1,000/half-day"
      },
      features: ["24/7 Access", "High-Speed WiFi", "Conducive Workspace"],
      highlight: true,
    },
    {
      name: "Day Only",
      prices: {
        monthly: "₦20,000/mo",
        halfday_monthly: "₦20,000/mo (Half-Day)",
        biweekly: "₦11,000/2wks",
        biweekly_halfday: "₦11,000/2wks (Half-Day)",
        weekly: "₦8,000/wk",
        weekly_halfday: "₦6,000/wk (Half-Day)",
        daily: "₦1,800/day",
        halfday: "₦1,000/half-day"
      },
      features: ["8am - 6pm Access", "High-Speed WiFi", "Conducive Workspace"],
      highlight: false,
    },
    {
      name: "Night Only",
      prices: {
        monthly: "₦20,000/mo",
        halfday_monthly: "₦20,000/mo (Half-Day)",
        biweekly: "₦11,000/2wks",
        biweekly_halfday: "₦11,000/2wks (Half-Day)",
        weekly: "₦8,000/wk",
        weekly_halfday: "₦6,000/wk (Half-Day)",
        daily: "₦1,800/day",
        halfday: "₦1,000/half-day"
      },
      features: ["6pm - 8am Access", "High-Speed WiFi", "Conducive Workspace"],
      highlight: false,
    }
  ],
  regulars: [
    {
      name: "Full Access",
      prices: {
        monthly: "₦26,000/mo",
        halfday_monthly: "₦24,000/mo (Half-Day)",
        biweekly: "₦15,000/2wks",
        biweekly_halfday: "₦13,000/2wks (Half-Day)",
        weekly: "₦9,000/wk",
        weekly_halfday: "₦7,000/wk (Half-Day)",
        daily: "₦2,000/day",
        halfday: "₦1,200/half-day"
      },
      features: ["24/7 Access", "High-Speed WiFi", "Conducive Workspace"],
      highlight: true,
    },
    {
      name: "Day Only",
      prices: {
        monthly: "₦24,000/mo",
        halfday_monthly: "₦24,000/mo (Half-Day)",
        biweekly: "₦13,000/2wks",
        biweekly_halfday: "₦13,000/2wks (Half-Day)",
        weekly: "₦9,000/wk",
        weekly_halfday: "₦7,000/wk (Half-Day)",
        daily: "₦2,000/day",
        halfday: "₦1,200/half-day"
      },
      features: ["8am - 6pm Access", "High-Speed WiFi", "Conducive Workspace"],
      highlight: false,
    },
    {
      name: "Night Only",
      prices: {
        monthly: "₦24,000/mo",
        halfday_monthly: "₦24,000/mo (Half-Day)",
        biweekly: "₦13,000/2wks",
        biweekly_halfday: "₦13,000/2wks (Half-Day)",
        weekly: "₦9,000/wk",
        weekly_halfday: "₦7,000/wk (Half-Day)",
        daily: "₦2,000/day",
        halfday: "₦1,200/half-day"
      },
      features: ["6pm - 8am Access", "High-Speed WiFi", "Conducive Workspace"],
      highlight: false,
    }
  ]
};

const faqs = [
  {
    question: "What is included in the Full Access plan?",
    answer: "Full Access gives you 24/7 entry , high-speed WiFi, Steady power supply and access to all our facilities.",
  },
  {
    question: "Can I switch between Day and Night plans?",
    answer: "Yes, you can upgrade or switch your plan at any time. Just contact our receptionist.",
  },
  {
    question: "Are there discounts for long-term subscriptions?",
    answer: "Yes! We offer special rates for quarterly and annual subscriptions. Ask at the front desk for details.",
  },
  {
    question: "Do we open on Sunday's?",
    answer: "YES!, we are open 7 days a week.",
  },
];

export default function Pricing() {
  const [category, setCategory] = useState("workers");
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-10 px-4">
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
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent animate-fade-in-up">
          Choose Your Perfect Workspace Plan
        </h1>
        <p className="mt-4 text-lg text-gray-300 animate-fade-in-up">
          Flexible subscriptions for <span className="font-semibold">Our Workers</span> and <span className="font-semibold">Regular Workers</span>. Enjoy a modern, inspiring environment at SRS Café.
        </p>
      </div>

      {/* Category Toggle */}
      <div className="flex justify-center mb-10 gap-4 animate-fade-in-up">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border border-white/10 backdrop-blur-lg ${category === "workers" ? "bg-white/10 text-white shadow-lg" : "bg-transparent text-gray-400"}`}
          onClick={() => setCategory("workers")}
        >
          Our Workers
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border border-white/10 backdrop-blur-lg ${category === "regulars" ? "bg-white/10 text-white shadow-lg" : "bg-transparent text-gray-400"}`}
          onClick={() => setCategory("regulars")}
        >
          Regular Workers
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-16 animate-fade-in-up">
        {pricingData[category].map((plan, idx) => (
          <div
            key={plan.name}
            className={`relative bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-xs shadow-xl flex flex-col items-center transition-transform duration-300 hover:scale-105 ${plan.highlight ? "ring-2 ring-gray-200" : ""}`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-200 via-gray-400 to-white text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                Best Value
              </span>
            )}
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gray-100 via-gray-400 to-white bg-clip-text text-transparent">
              {plan.name}
            </h2>
            <div className="mb-4 w-full">
              <ul className="space-y-1">
                <li className="flex justify-between text-gray-200"><span>Monthly:</span><span>{plan.prices.monthly}</span></li>
                <li className="flex justify-between text-gray-200"><span>Bi-Weekly:</span><span>{plan.prices.biweekly}</span></li>
                <li className="flex justify-between text-gray-200"><span>Weekly:</span><span>{plan.prices.weekly}</span></li>
                <li className="flex justify-between text-gray-200"><span>Daily:</span><span>{plan.prices.daily}</span></li>
                <li className="flex justify-between text-gray-200"><span>Half-Day:</span><span>{plan.prices.halfday}</span></li>
              </ul>
            </div>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-gray-200">
                  <FaCheckCircle className="text-green-400" /> {feature}
                </li>
              ))}
            </ul>
            <button className="mt-auto px-6 py-2 rounded-full bg-gradient-to-r from-gray-200 via-gray-400 to-white text-black font-semibold shadow-lg hover:scale-105 transition-transform">
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* Feature Highlights */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up">
        <div className="flex flex-col items-center bg-white/10 border border-white/10 rounded-2xl p-4">
          <span className="text-2xl font-bold">24/7</span>
          <span className="text-gray-300 text-sm mt-1">Access</span>
        </div>
        <div className="flex flex-col items-center bg-white/10 border border-white/10 rounded-2xl p-4">
          <span className="text-2xl font-bold">WiFi</span>
          <span className="text-gray-300 text-sm mt-1">High-Speed</span>
        </div>
        <div className="flex flex-col items-center bg-white/10 border border-white/10 rounded-2xl p-4">
          <span className="text-2xl font-bold">Power Supply</span>
          <span className="text-gray-300 text-sm mt-1">Steady</span>
        </div>
        <div className="flex flex-col items-center bg-white/10 border border-white/10 rounded-2xl p-4">
          <span className="text-2xl font-bold">Workspace</span>
          <span className="text-gray-300 text-sm mt-1">Conducive</span>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto mb-10 animate-fade-in-up">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-200 via-gray-400 to-white bg-clip-text text-transparent">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.question} className="bg-white/10 border border-white/10 rounded-xl p-4">
              <button
                className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-100 focus:outline-none"
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                {openFAQ === idx ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>
              {openFAQ === idx && (
                <div className="mt-2 p-4 rounded-lg bg-black/70 border border-gray-300 shadow-lg text-lg font-bold italic text-white tracking-wide animate-fade-in-up">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}