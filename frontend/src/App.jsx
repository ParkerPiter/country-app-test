import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryCode" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;