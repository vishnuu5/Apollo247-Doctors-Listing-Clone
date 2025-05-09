import Image from "next/image";
import { Star, Clock, ThumbsUp, MapPin } from "lucide-react";

export default function DoctorCard({ doctor }) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Doctor Image and Basic Info */}
        <div className="md:w-1/4 p-4 flex flex-col items-center border-b md:border-b-0 md:border-r">
          <div className="relative h-32 w-32 rounded-full overflow-hidden mb-3">
            <Image
              src={doctor.image || "/placeholder.svg?height=128&width=128"}
              alt={doctor.name}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <h3 className="font-bold text-[#02475b] text-center">
            {doctor.name}
          </h3>
          <p className="text-gray-600 text-sm text-center">
            {doctor.specialization}
          </p>
          <p className="text-gray-600 text-sm text-center">
            {doctor.experience} years exp
          </p>

          <div className="flex items-center mt-2">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="md:w-2/4 p-4">
          <div className="mb-3">
            <h4 className="font-semibold text-[#02475b]">About</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{doctor.about}</p>
          </div>

          <div className="mb-3">
            <h4 className="font-semibold text-[#02475b]">Specialities</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {doctor.specialities?.map((speciality, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700"
                >
                  {speciality}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{doctor.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mt-1">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{doctor.recommendations} recommendations</span>
          </div>
        </div>

        {/* Appointment and Fees */}
        <div className="md:w-1/4 p-4 bg-gray-50">
          <div className="mb-4">
            <h4 className="font-semibold text-[#02475b]">Next Available</h4>
            <div className="flex items-center mt-1 text-sm">
              <Clock className="h-4 w-4 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">
                Today, {doctor.nextAvailable}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-[#02475b]">Consultation Fee</h4>
            <p className="text-sm font-medium mt-1">₹{doctor.fee}</p>
          </div>

          <button className="w-full bg-[#fc9916] hover:bg-[#e88c13] text-white font-medium py-2 px-4 rounded-md transition duration-200">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
