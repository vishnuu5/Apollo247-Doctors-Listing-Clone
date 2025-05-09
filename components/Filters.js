"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Filters({ onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    experience: true,
    availability: true,
    language: true,
    fee: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    onFilterChange(filterType, value, checked);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-bold text-[#02475b] mb-4">Filters</h2>

      {/* Gender Filter */}
      <div className="mb-4 border-b pb-3">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-[#02475b]"
          onClick={() => toggleSection("gender")}
        >
          Gender
          {expandedSections.gender ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        {expandedSections.gender && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="male"
                onChange={(e) => handleCheckboxChange(e, "gender")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="female"
                onChange={(e) => handleCheckboxChange(e, "gender")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>Female</span>
            </label>
          </div>
        )}
      </div>

      {/* Experience Filter */}
      <div className="mb-4 border-b pb-3">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-[#02475b]"
          onClick={() => toggleSection("experience")}
        >
          Experience
          {expandedSections.experience ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        {expandedSections.experience && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="0-5"
                onChange={(e) => handleCheckboxChange(e, "experience")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>0-5 years</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="5-10"
                onChange={(e) => handleCheckboxChange(e, "experience")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>5-10 years</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="10+"
                onChange={(e) => handleCheckboxChange(e, "experience")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>10+ years</span>
            </label>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="mb-4 border-b pb-3">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-[#02475b]"
          onClick={() => toggleSection("availability")}
        >
          Availability
          {expandedSections.availability ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        {expandedSections.availability && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="today"
                onChange={(e) => handleCheckboxChange(e, "availability")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>Today</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="tomorrow"
                onChange={(e) => handleCheckboxChange(e, "availability")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>Tomorrow</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="weekend"
                onChange={(e) => handleCheckboxChange(e, "availability")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>This Weekend</span>
            </label>
          </div>
        )}
      </div>

      {/* Language Filter */}
      <div className="mb-4 border-b pb-3">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-[#02475b]"
          onClick={() => toggleSection("language")}
        >
          Language
          {expandedSections.language ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        {expandedSections.language && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="english"
                onChange={(e) => handleCheckboxChange(e, "language")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>English</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="hindi"
                onChange={(e) => handleCheckboxChange(e, "language")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>Hindi</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="tamil"
                onChange={(e) => handleCheckboxChange(e, "language")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>Tamil</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="telugu"
                onChange={(e) => handleCheckboxChange(e, "language")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>Telugu</span>
            </label>
          </div>
        )}
      </div>

      {/* Fee Filter */}
      <div className="mb-4">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-[#02475b]"
          onClick={() => toggleSection("fee")}
        >
          Consultation Fee
          {expandedSections.fee ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        {expandedSections.fee && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="0-500"
                onChange={(e) => handleCheckboxChange(e, "fee")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>₹0 - ₹500</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="500-1000"
                onChange={(e) => handleCheckboxChange(e, "fee")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>₹500 - ₹1000</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value="1000+"
                onChange={(e) => handleCheckboxChange(e, "fee")}
                className="rounded text-[#fc9916] focus:ring-[#fc9916]"
              />
              <span>₹1000+</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
