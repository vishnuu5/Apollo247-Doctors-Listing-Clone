import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

// Use environment variables or fallback to default values
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/apollo247clone";
const MONGODB_DB = process.env.MONGODB_DB || "apollo247clone";

// Check if we should use mock data
const useMockData = process.env.USE_MOCK_DATA === "true";

// Load mock data if needed
let mockDoctors = [];
if (useMockData) {
  try {
    const mockDataPath = path.join(process.cwd(), "data", "mockDoctors.json");
    if (fs.existsSync(mockDataPath)) {
      const mockDataRaw = fs.readFileSync(mockDataPath, "utf8");
      mockDoctors = JSON.parse(mockDataRaw);
    } else {
      console.warn("Mock data file not found. Using empty array.");
    }
  } catch (error) {
    console.error("Error loading mock data:", error);
  }
}

// Mock database implementation
class MockDB {
  constructor() {
    this.collections = {
      doctors: {
        find: (filter = {}) => {
          // Simple filter implementation
          let results = [...mockDoctors];

          if (filter.gender && filter.gender.$in) {
            results = results.filter((doc) =>
              filter.gender.$in.includes(doc.gender)
            );
          }

          if (filter.languages && filter.languages.$in) {
            results = results.filter(
              (doc) =>
                doc.languages &&
                doc.languages.some((lang) =>
                  filter.languages.$in.includes(lang)
                )
            );
          }

          if (filter.$or) {
            // Handle experience ranges
            const experienceFilters = filter.$or.filter((f) => f.experience);
            if (experienceFilters.length > 0) {
              results = results.filter((doc) => {
                return experienceFilters.some((f) => {
                  if (
                    f.experience.$gte !== undefined &&
                    f.experience.$lte !== undefined
                  ) {
                    return (
                      doc.experience >= f.experience.$gte &&
                      doc.experience <= f.experience.$lte
                    );
                  } else if (
                    f.experience.$gt !== undefined &&
                    f.experience.$lte !== undefined
                  ) {
                    return (
                      doc.experience > f.experience.$gt &&
                      doc.experience <= f.experience.$lte
                    );
                  } else if (f.experience.$gt !== undefined) {
                    return doc.experience > f.experience.$gt;
                  }
                  return false;
                });
              });
            }

            // Handle fee ranges
            const feeFilters = filter.$or.filter((f) => f.fee);
            if (feeFilters.length > 0) {
              results = results.filter((doc) => {
                return feeFilters.some((f) => {
                  if (f.fee.$gte !== undefined && f.fee.$lte !== undefined) {
                    return doc.fee >= f.fee.$gte && doc.fee <= f.fee.$lte;
                  } else if (
                    f.fee.$gt !== undefined &&
                    f.fee.$lte !== undefined
                  ) {
                    return doc.fee > f.fee.$gt && doc.fee <= f.fee.$lte;
                  } else if (f.fee.$gt !== undefined) {
                    return doc.fee > f.fee.$gt;
                  }
                  return false;
                });
              });
            }
          }

          return {
            sort: () => ({
              skip: (n) => ({
                limit: (limit) => ({
                  toArray: async () => {
                    // Sort by rating descending
                    results.sort((a, b) => b.rating - a.rating);
                    return results.slice(n, n + limit);
                  },
                }),
              }),
            }),
          };
        },
        countDocuments: async (filter = {}) => {
          // Simple implementation that returns the total count
          // In a real implementation, we would apply the same filters as in find()
          return mockDoctors.length;
        },
        insertOne: async (doc) => {
          const newDoc = {
            _id: `mock${Date.now()}`,
            ...doc,
          };
          mockDoctors.push(newDoc);
          return { insertedId: newDoc._id };
        },
        insertMany: async (docs) => {
          const insertedIds = [];
          for (const doc of docs) {
            const newDoc = {
              _id: `mock${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 9)}`,
              ...doc,
            };
            mockDoctors.push(newDoc);
            insertedIds.push(newDoc._id);
          }
          return { insertedCount: docs.length, insertedIds };
        },
      },
    };
  }

  collection(name) {
    return (
      this.collections[name] || {
        find: () => ({
          sort: () => ({
            skip: () => ({ limit: () => ({ toArray: async () => [] }) }),
          }),
        }),
        countDocuments: async () => 0,
        insertOne: async () => ({ insertedId: null }),
        insertMany: async () => ({ insertedCount: 0, insertedIds: [] }),
      }
    );
  }
}

// Check if we have a cached connection
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If using mock data, return mock database
  if (useMockData) {
    console.log("Using mock database");
    return { db: new MockDB(), client: { close: () => {} } };
  }

  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // If no cached connection, create a new one
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(MONGODB_DB);

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    console.log("Falling back to mock database");
    return { db: new MockDB(), client: { close: () => {} } };
  }
}
