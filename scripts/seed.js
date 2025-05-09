const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// Check if .env.local exists and read USE_MOCK_DATA
let useMockData = false;
try {
  const envPath = path.join(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    const mockDataMatch = envContent.match(/USE_MOCK_DATA=(.+)/);
    if (mockDataMatch && mockDataMatch[1].trim() === "true") {
      useMockData = true;
    }
  }
} catch (error) {
  console.log("Could not read .env.local file:", error.message);
}

// Get MongoDB URI from environment or use default
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/apollo247clone";
const MONGODB_DB = process.env.MONGODB_DB || "apollo247clone";

const sampleDoctors = [
  {
    name: "Dr. Rajesh Kumar",
    specialization: "General Physician",
    specialities: ["General Medicine", "Diabetes", "Hypertension"],
    gender: "male",
    experience: 12,
    about:
      "Dr. Rajesh Kumar is a highly experienced General Physician with expertise in managing chronic conditions like diabetes and hypertension. He has been practicing for over 12 years and is known for his patient-centric approach.",
    languages: ["english", "hindi"],
    location: "Delhi",
    fee: 800,
    rating: 4.8,
    recommendations: 124,
    nextAvailable: "2:30 PM",
    image: "/boy.png?height=128&width=128",
  },
  {
    name: "Dr. Priya Sharma",
    specialization: "Internal Medicine",
    specialities: ["Internal Medicine", "Infectious Diseases", "Critical Care"],
    gender: "female",
    experience: 8,
    about:
      "Dr. Priya Sharma is an Internal Medicine specialist with a focus on infectious diseases and critical care. She has 8 years of experience and is committed to providing comprehensive care to her patients.",
    languages: ["english", "hindi", "tamil"],
    location: "Mumbai",
    fee: 1200,
    rating: 4.9,
    recommendations: 98,
    nextAvailable: "4:15 PM",
    image: "/girl.png?height=128&width=128",
  },
  {
    name: "Dr. Suresh Patel",
    specialization: "General Physician",
    specialities: [
      "General Medicine",
      "Respiratory Diseases",
      "Preventive Healthcare",
    ],
    gender: "male",
    experience: 15,
    about:
      "Dr. Suresh Patel is a senior General Physician with 15 years of experience. He specializes in respiratory diseases and preventive healthcare. He is known for his thorough approach to diagnosis and treatment.",
    languages: ["english", "gujarati", "hindi"],
    location: "Ahmedabad",
    fee: 900,
    rating: 4.7,
    recommendations: 156,
    nextAvailable: "10:00 AM",
    image: "/boy.png?height=128&width=128",
  },
  {
    name: "Dr. Ananya Reddy",
    specialization: "Internal Medicine",
    specialities: ["Internal Medicine", "Gastroenterology", "Endocrinology"],
    gender: "female",
    experience: 6,
    about:
      "Dr. Ananya Reddy is an Internal Medicine specialist with additional expertise in gastroenterology and endocrinology. She has 6 years of experience and is dedicated to providing personalized care.",
    languages: ["english", "telugu", "hindi"],
    location: "Hyderabad",
    fee: 750,
    rating: 4.6,
    recommendations: 87,
    nextAvailable: "3:45 PM",
    image: "/girl.png?height=128&width=128",
  },
  {
    name: "Dr. Vikram Singh",
    specialization: "General Physician",
    specialities: ["General Medicine", "Cardiology", "Geriatric Medicine"],
    gender: "male",
    experience: 20,
    about:
      "Dr. Vikram Singh is a highly experienced General Physician with 20 years of practice. He has special interest in cardiology and geriatric medicine. He is known for his compassionate approach to patient care.",
    languages: ["english", "hindi", "punjabi"],
    location: "Chandigarh",
    fee: 1100,
    rating: 4.9,
    recommendations: 210,
    nextAvailable: "11:30 AM",
    image: "/boy.png?height=128&width=128",
  },
  {
    name: "Dr. Meera Joshi",
    specialization: "Internal Medicine",
    specialities: ["Internal Medicine", "Rheumatology", "Immunology"],
    gender: "female",
    experience: 10,
    about:
      "Dr. Meera Joshi is an Internal Medicine specialist with expertise in rheumatology and immunology. With 10 years of experience, she is dedicated to helping patients with autoimmune and inflammatory conditions.",
    languages: ["english", "marathi", "hindi"],
    location: "Pune",
    fee: 950,
    rating: 4.8,
    recommendations: 132,
    nextAvailable: "5:00 PM",
    image: "/girl.png?height=128&width=128",
  },
  {
    name: "Dr. Arjun Nair",
    specialization: "General Physician",
    specialities: ["General Medicine", "Pulmonology", "Sleep Medicine"],
    gender: "male",
    experience: 9,
    about:
      "Dr. Arjun Nair is a General Physician with special interest in pulmonology and sleep medicine. With 9 years of experience, he is committed to helping patients with respiratory and sleep disorders.",
    languages: ["english", "malayalam", "hindi"],
    location: "Kochi",
    fee: 850,
    rating: 4.7,
    recommendations: 105,
    nextAvailable: "1:15 PM",
    image: "/boy.png?height=128&width=128",
  },
  {
    name: "Dr. Kavita Desai",
    specialization: "Internal Medicine",
    specialities: [
      "Internal Medicine",
      "Nephrology",
      "Hypertension Management",
    ],
    gender: "female",
    experience: 11,
    about:
      "Dr. Kavita Desai is an Internal Medicine specialist with expertise in nephrology and hypertension management. With 11 years of experience, she provides comprehensive care for kidney diseases and related conditions.",
    languages: ["english", "gujarati", "hindi"],
    location: "Surat",
    fee: 1000,
    rating: 4.8,
    recommendations: 118,
    nextAvailable: "4:30 PM",
    image: "/girl.png?height=128&width=128",
  },
  {
    name: "Dr. Rahul Verma",
    specialization: "General Physician",
    specialities: [
      "General Medicine",
      "Infectious Diseases",
      "Travel Medicine",
    ],
    gender: "male",
    experience: 7,
    about:
      "Dr. Rahul Verma is a General Physician specializing in infectious diseases and travel medicine. With 7 years of experience, he provides preventive care and treatment for various infectious conditions.",
    languages: ["english", "hindi"],
    location: "Jaipur",
    fee: 700,
    rating: 4.6,
    recommendations: 92,
    nextAvailable: "12:00 PM",
    image: "/girl.png?height=128&width=128",
  },
  {
    name: "Dr. Sunita Rao",
    specialization: "Internal Medicine",
    specialities: ["Internal Medicine", "Diabetology", "Preventive Healthcare"],
    gender: "female",
    experience: 14,
    about:
      "Dr. Sunita Rao is an Internal Medicine specialist with expertise in diabetology and preventive healthcare. With 14 years of experience, she is dedicated to helping patients manage diabetes and maintain overall health.",
    languages: ["english", "kannada", "hindi"],
    location: "Bangalore",
    fee: 1050,
    rating: 4.9,
    recommendations: 145,
    nextAvailable: "2:00 PM",
    image: "/girl.png?height=128&width=128",
  },
];

// Function to create a mock data file
async function createMockDataFile() {
  try {
    // Create a data directory if it doesn't exist
    const dataDir = path.join(__dirname, "../data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Write the mock data to a JSON file
    const mockDataPath = path.join(dataDir, "mockDoctors.json");
    fs.writeFileSync(mockDataPath, JSON.stringify(sampleDoctors, null, 2));

    console.log(`Mock data created successfully at ${mockDataPath}`);
    console.log(
      "You can use this data in your application by setting USE_MOCK_DATA=true in .env.local"
    );

    return true;
  } catch (error) {
    console.error("Error creating mock data file:", error);
    return false;
  }
}

async function seedDatabase() {
  // If using mock data, create a mock data file instead
  if (useMockData) {
    console.log("Using mock data mode. Creating mock data file...");
    await createMockDataFile();
    return;
  }

  let client = null;

  try {
    // Try to connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(MONGODB_DB);

    // Check if collection exists and has data
    const count = await db.collection("doctors").countDocuments();

    if (count === 0) {
      // Insert sample doctors
      const result = await db.collection("doctors").insertMany(sampleDoctors);
      console.log(`${result.insertedCount} doctors inserted successfully`);
    } else {
      console.log("Doctors collection already has data, skipping seed");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    console.log(
      "\nMongoDB connection failed. Would you like to create mock data instead? (Y/n)"
    );

    // Read user input
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("", async (answer) => {
      readline.close();
      if (answer.toLowerCase() !== "n") {
        // Create mock data file
        await createMockDataFile();

        // Update .env.local to use mock data
        try {
          const envPath = path.join(__dirname, "../.env.local");
          let envContent = "";

          if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, "utf8");
            // Replace USE_MOCK_DATA line if it exists
            if (envContent.includes("USE_MOCK_DATA=")) {
              envContent = envContent.replace(
                /USE_MOCK_DATA=(.+)/,
                "USE_MOCK_DATA=true"
              );
            } else {
              // Add USE_MOCK_DATA=true if it doesn't exist
              envContent += "\nUSE_MOCK_DATA=true";
            }
          } else {
            // Create new .env.local file
            envContent = "USE_MOCK_DATA=true\n";
          }

          fs.writeFileSync(envPath, envContent);
          console.log("\n.env.local updated to use mock data");
        } catch (err) {
          console.error("Error updating .env.local:", err);
          console.log(
            "\nPlease manually set USE_MOCK_DATA=true in your .env.local file"
          );
        }
      }
    });
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    if (!useMockData) {
      console.log("Seeding completed");
    }
  })
  .catch((err) => console.error("Seeding failed:", err));
