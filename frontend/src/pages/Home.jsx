import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/countries')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Countries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map(country => (
          <div key={country.countryCode} className="border p-4 rounded-lg shadow-md">
            {country.flag && (
              <img src={country.flag} alt={`${country.name} flag`} className="w-18 h-16 mx-auto mb-4" />
            )}
            <Link to={`/country/${country.countryCode}`} className="text-blue-500 hover:underline text-center block">
              {country.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;