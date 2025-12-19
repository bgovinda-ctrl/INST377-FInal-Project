# Global Earthquake Alert System
## Description
The Global Earthquake Alert System is a full-stack web application designed to provide real-time earthquake information and alert subscriptions for users worldwide. The system retrieves live seismic data from the United States Geological Survey (USGS) Earthquake API, processes and normalizes the data through a backend REST API, and presents it through an intuitive web interface. Users can view recent earthquake events and subscribe to alerts based on location and magnitude thresholds. The goal of this project is to increase awareness of seismic activity and provide a foundation for scalable alerting and visualization features.This project follows a modern web architecture using a React frontend, a Node.js and Express backend, and Supabase for managing user subscription data. The application is deployed on Vercel, enabling serverless backend functions and fast frontend delivery.
 
## Link to Vercel

## Target Browsers
Google Chrome
Microsoft Edge
## Links
- [Developer Manual](https://github.com/bgovinda-ctrl/INST377-FInal-Project/blob/main/README.md)
# Developer Manual
## Installation & Setup
Prerequisites
- Node.js (v18 or higher)
- npm or yarn		
- Git
Clone Repository
git clone https://github.com:bgovinda-ctrl/INST377-FInal-Project.git
cd global-earthquake-alert-system
Install Dependencies
**Backend**
cd backend
npm install
**Frontend**
cd frontend
npm install

## Running the Application
**Start Backend Server**
cd backend
npm start
**Backend runs at:**
http://localhost:3001
**Start Frontend Server**
cd frontend
npm start
**Frontend runs at:**
http://localhost:3000

## Running Tests
Basic automated tests are available for backend API endpoints to validate request handling and response structure. These tests help ensure that core backend functionality continues to operate as expected during development.

Basic tests are available for API endpoints.
cd backend
npm test

## API Documentation
**Base Path: /api**
**GET /earthquakes**
**Description:** Fetches recent earthquake data from the USGS API and returns a normalized list
**POST /subscriptions/subscribe**
**Description:** Creates a new earthquake alert subscription.

## Known Bugs & Limitations
- 	No user authentication
- 	Alert delivery is currently mocked
- 	Limited automated testing
- 	String-based geographic filtering

### Future Development
- Interactive map visualization (Leaflet/Mapbox)
- AI-based earthquake trend prediction
- Real email/SMS alert delivery
- User authentication and profiles
- Improved geospatial filtering

### Documentation Location
/docs

