# Developer Manual
## Installation & Setup
Prerequisites
- Node.js (v18 or higher)
- npm or yarn		
- Git
Clone Repository
git clone [https://github.com:bgovinda-ctrl/INST377-FInal-Project.git](https://github.com/bgovinda-ctrl/INST377-FInal-Project)
- cd global-earthquake-alert-system
- Install Dependencies
- **Backend**
<br>&emsp; cd backend
<br>&emsp; npm install
- **Frontend**
<br>&emsp; cd frontend
<br>&emsp; npm install

## Running the Application
**Start Backend Server**
<br> cd backend
<br> npm start
<br>**Backend runs at:**
<br>http://localhost:3001<br>
<br>**Start Frontend Server**
<br> cd frontend
<br> npm start
<br>**Frontend runs at:**
<br>http://localhost:3000

## Running Tests
Basic automated tests are available for backend API endpoints to validate request handling and response structure. These tests help ensure that core backend functionality continues to operate as expected during development.

Basic tests are available for API endpoints.
<br> cd backend
<br> npm test

## API Documentation
<br>**Base Path: /api**
<br>**GET /earthquakes**
<br>**Description:** Fetches recent earthquake data from the USGS API and returns a normalized list
<br>**POST /subscriptions/subscribe**
<br>**Description:** Creates a new earthquake alert subscription.

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


