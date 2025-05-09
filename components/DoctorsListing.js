"use client";

import { useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";
import Filters from "./Filters";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DoctorsListing() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    gender: [],
    experience: [],
    availability: [],
    language: [],
    fee: [],
  });

  useEffect(() => {
    fetchDoctors();
  }, [currentPage, filters]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      // Build query params
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("limit", 10);

      // Add filters to query params
      Object.entries(filters).forEach(([key, values]) => {
        if (values.length > 0) {
          values.forEach((value) => {
            queryParams.append(key, value);
          });
        }
      });

      const response = await fetch(`/api/doctors?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }

      const data = await response.json();
      setDoctors(data.doctors);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value, isChecked) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (isChecked) {
        // Add the value to the filter array if it doesn't exist
        if (!updatedFilters[filterType].includes(value)) {
          updatedFilters[filterType] = [...updatedFilters[filterType], value];
        }
      } else {
        // Remove the value from the filter array
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      }

      return updatedFilters;
    });

    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#02475b]">
          General Physician & Internal Medicine
        </h1>
        <p className="text-gray-600 mt-2">
          Consult with the best general physicians and internal medicine
          specialists online
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section */}
        <div className="lg:w-1/4">
          <Filters onFilterChange={handleFilterChange} />
        </div>

        {/* Doctors Listing */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fc9916]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 p-4 rounded-md text-red-700">
              {error}
            </div>
          ) : doctors.length === 0 ? (
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-gray-600">
                No doctors found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6">
                {doctors.map((doctor) => (
                  <DoctorCard
                    key={
                      doctor._id ||
                      `doctor-${doctor.name.replace(/\s+/g, "-").toLowerCase()}`
                    }
                    doctor={doctor}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#02475b] hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={`page-${page + 1}`}
                    onClick={() => handlePageChange(page + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page + 1
                        ? "bg-[#02475b] text-white"
                        : "text-[#02475b] hover:bg-gray-100"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#02475b] hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
