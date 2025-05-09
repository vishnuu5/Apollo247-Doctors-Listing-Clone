# Apollo247 Doctors Listing Clone

This project is a clone of the Apollo247 doctors listing page, built with Next.js and MongoDB. It includes a responsive UI with functional filters, pagination, and backend REST APIs.

![Apollo247 Clone Screenshot](https://github.com/user-attachments/assets/13bc94da-a207-40e8-a8af-b5b580ca8714)

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Functional Filters**: Filter doctors by gender, experience, availability, language, and fees
- **Pagination**: Server-side pagination for doctor listings
- **SEO Optimization**: Proper metadata, sitemap, and robots.txt
- **MongoDB Integration**: Database connection and queries (with mock data fallback)
- **REST APIs**: Backend APIs for listing and adding doctors

## Demo

You can view a live demo of the project at [Click-here](https://apollo247-doctors-listing-clone.vercel.app)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (optional - project can run with mock data)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vishnuu5/Apollo247-Doctors-Listing-Clone.git
cd apollo247-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

# Use mock data instead of MongoDB

USE_MOCK_DATA=true

# MongoDB connection (if available)

# MONGODB_URI=mongodb://127.0.0.1:27017/apollo247clone

# MONGODB_DB=apollo247clone

### 4. Generate mock data

```bash
npm run seed
```

This will create a mock data file at `data/mockDoctors.json` that the application will use when running in mock mode.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Using MongoDB (Optional)

If you want to use a real MongoDB database instead of mock data:

1. Install and start MongoDB on your machine, or create a MongoDB Atlas account
2. Update your `.env.local` file:

```bash
   USE_MOCK_DATA=false
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=apollo247clone
```

3. Run the seed script to populate your database:

```bash
   npm run seed
```

## Project Structure

```bash
apollo247-clone/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   │   └── doctors/        # Doctors API endpoints
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page
│   ├── globals.css         # Global styles
│   ├── robots.js           # Robots.txt generator
│   └── sitemap.js          # Sitemap generator
├── components/             # React components
│   ├── DoctorCard.js       # Doctor card component
│   ├── DoctorsListing.js   # Main listing component
│   ├── Filters.js          # Filters component
│   └── Header.js           # Header component
├── data/                   # Mock data directory
│   └── mockDoctors.json    # Mock doctors data
├── lib/                    # Utility functions
│   └── mongodb.js          # MongoDB connection (with mock fallback)
├── public/                 # Static assets
├── scripts/                # Scripts
│   └── seed.js             # Database seeding script
├── middleware.js           # Next.js middleware
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # Project documentation
```

## API Endpoints

### GET /api/doctors

Fetches a list of doctors with filtering and pagination.

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Number of doctors per page (default: 10)
- `gender`: Filter by gender (can be multiple)
- `experience`: Filter by experience range (can be multiple)
- `availability`: Filter by availability (can be multiple)
- `language`: Filter by language (can be multiple)
- `fee`: Filter by fee range (can be multiple)

**Example:**

```bash
GET /api/doctors?page=1&limit=10&gender=male&experience=5-10&language=english
```

### POST /api/doctors/add

Adds a new doctor to the database.

**Request Body:**

```json
{
  "name": "Dr. John Doe",
  "specialization": "General Physician",
  "specialities": ["General Medicine", "Diabetes"],
  "gender": "male",
  "experience": 8,
  "about": "Dr. John Doe is a General Physician...",
  "languages": ["english", "hindi"],
  "location": "Mumbai",
  "fee": 900,
  "rating": 4.5,
  "recommendations": 120,
  "nextAvailable": "3:30 PM",
  "image": "/placeholder.svg?height=128&width=128"
}
```

## Mock Data Mode

This project includes a mock data mode that allows you to develop without a MongoDB connection:

1. The mock database implementation in `lib/mongodb.js` provides the same API as MongoDB
2. Mock data is stored in `data/mockDoctors.json` and loaded at runtime
3. All filtering and pagination operations work with mock data
4. To switch between mock and real data, change the `USE_MOCK_DATA` environment variable

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Database (optional)
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Apollo247](https://www.apollo247.com/) - Original website design
- [Next.js Documentation](https://nextjs.org/docs) - Next.js documentation
- [MongoDB Documentation](https://docs.mongodb.com/) - MongoDB documentation
