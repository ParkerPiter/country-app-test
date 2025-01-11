# Country App

Country App is a web application that displays information about different countries, including their flag, region, capital, borders and population data. The application is built with React on the frontend and Node.js on the backend.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud)

## Installation

### Backend

1. Clone the repository:

   ```sh
   git clone https://github.com/ParkerPiter/country-app-test.git
   cd country-app/backend

2. Install dependencies:

    npm install

3. Configure the environment variables:

    Create an .env file in the backend folder with the following content:
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=data_base_name

4. Starts the server:

    npm start

    The server is listen in http://localhost:3001

    and the routes are:
    http://localhost:3001/api/countries
    http://localhost:3001/api/country/:countryCode

### Frontend

1. Navigate to the frontend folder:

    cd ../frontend

2. Install dependencies: 

    npm install

3. Start the React application:

    npm start

    The application will run at http://localhost:3000.

## Use

1. Open your browser and navigate to http://localhost:3000.
    
2. You will see a list of countries. Click on any country to see more details about it.

## Structure

country-app/
├── backend/
│   ├── db.js
│   ├── index.js
│   ├── models/
│   │   ├── Country.js
│   │   └── CountryInfo.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── PopulationChart.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── CountryDetails.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   └── reportWebVitals.js
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md

## Dependencies

### Backend
- express
- cors
- axios
- mongoose
- dotenv
- progress

### Frontend

- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- chart.js
- react-chartjs-2