import React, { useEffect, useState } from 'react';
import { useParams,  Link } from 'react-router-dom';
import PopulationChart from '../components/PopulationGraph';
import axios from 'axios';

function CountryDetails() {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/country/${countryCode}`)
      .then(response => {
        setCountryInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching country details:', error);
      });
  }, [countryCode]);

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{countryInfo.country.name}</h1>
      {countryInfo.country.flag && (
        <img src={countryInfo.country.flag} alt={`${countryInfo.country.name} flag`} className="mb-4 w-60" />
      )}
      <p><strong>Region:</strong> {countryInfo.region}</p>
      <p><strong>Borders:</strong></p>
      <ul>
        {countryInfo.borders.map((border, index) => (
          <li key={index}>- {border.commonName}</li>
        ))}
      </ul>
      <p><strong>Population Counts:</strong></p>
      <PopulationChart populationCounts={countryInfo.populationCounts} />
        <Link to="/">
          <button className='bg-gray-400 rounded-3xl border-transparent text-white pl-4 pr-4 pt-1 pb-1'>Back</button>
        </Link>
    </div>
  );
}

export default CountryDetails;