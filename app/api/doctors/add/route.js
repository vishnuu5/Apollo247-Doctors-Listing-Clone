import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const doctorData = await request.json();

    // Validate required fields
    const requiredFields = ["name", "specialization", "experience", "fee"];
    for (const field of requiredFields) {
      if (!doctorData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Add default values for optional fields
    const doctor = {
      ...doctorData,
      rating: doctorData.rating || 0,
      recommendations: doctorData.recommendations || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Insert doctor
    const result = await db.collection("doctors").insertOne(doctor);

    return NextResponse.json({
      success: true,
      message: "Doctor added successfully",
      doctorId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return NextResponse.json(
      { error: "Failed to add doctor" },
      { status: 500 }
    );
  }
}
