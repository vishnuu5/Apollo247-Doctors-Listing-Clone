import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page")) || 1;
    const limit = Number.parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Extract filter parameters
    const genderFilters = searchParams.getAll("gender");
    const experienceFilters = searchParams.getAll("experience");
    const availabilityFilters = searchParams.getAll("availability");
    const languageFilters = searchParams.getAll("language");
    const feeFilters = searchParams.getAll("fee");

    // Build filter query
    const filter = {};

    if (genderFilters.length > 0) {
      filter.gender = { $in: genderFilters };
    }

    if (experienceFilters.length > 0) {
      // Handle experience ranges
      const experienceConditions = [];

      experienceFilters.forEach((range) => {
        if (range === "0-5") {
          experienceConditions.push({ experience: { $gte: 0, $lte: 5 } });
        } else if (range === "5-10") {
          experienceConditions.push({ experience: { $gt: 5, $lte: 10 } });
        } else if (range === "10+") {
          experienceConditions.push({ experience: { $gt: 10 } });
        }
      });

      if (experienceConditions.length > 0) {
        filter.$or = experienceConditions;
      }
    }

    if (languageFilters.length > 0) {
      filter.languages = { $in: languageFilters };
    }

    if (feeFilters.length > 0) {
      // Handle fee ranges
      const feeConditions = [];

      feeFilters.forEach((range) => {
        if (range === "0-500") {
          feeConditions.push({ fee: { $gte: 0, $lte: 500 } });
        } else if (range === "500-1000") {
          feeConditions.push({ fee: { $gt: 500, $lte: 1000 } });
        } else if (range === "1000+") {
          feeConditions.push({ fee: { $gt: 1000 } });
        }
      });

      if (feeConditions.length > 0) {
        filter.$or = filter.$or
          ? [...filter.$or, ...feeConditions]
          : feeConditions;
      }
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Get doctors with pagination
    const doctors = await db
      .collection("doctors")
      .find(filter)
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination
    const totalDoctors = await db.collection("doctors").countDocuments(filter);
    const totalPages = Math.ceil(totalDoctors / limit);

    return NextResponse.json({
      doctors,
      currentPage: page,
      totalPages,
      totalDoctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
