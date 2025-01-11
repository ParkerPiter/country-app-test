const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./db');
const Country = require('./schema/Country');
const CountryInfo = require('./schema/CountryInfo');
const ProgressBar = require('progress');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

connectDB();

const populateDatabase = async () => {
    try {
        const countryCount = await Country.countDocuments();
        const countryInfoCount = await CountryInfo.countDocuments();

        if (countryCount > 0 && countryInfoCount > 0) {
            console.log('Database already populated');
            return;
        }

        const countriesResponse = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        const countries = countriesResponse.data;

        const bar1 = new ProgressBar('Saving countryCode and name [:bar] :percent :etas', { total: countries.length });
        for (const country of countries) {
            if (country.countryCode) {
                const existingCountry = await Country.findOne({ countryCode: country.countryCode });
                if (!existingCountry) {
                    await Country.create({
                        name: country.name,
                        countryCode: country.countryCode
                    });
                }
            }
            bar1.tick();
        }
        
        const flagsResponse = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');
        const countriesWithFlags = flagsResponse.data.data;
        const bar2 = new ProgressBar('Saving flags [:bar] :percent :etas', { total: countriesWithFlags.length });

        for (const country of countriesWithFlags) {
            if (country.name) {
                const existingCountry = await Country.findOne({ name: country.name });
                if (existingCountry && !existingCountry.flag) {
                    existingCountry.flag = country.flag;
                    await existingCountry.save();
                }
            }
            bar2.tick();
        }

        const bar3 = new ProgressBar('Guardando region, capital y borders [:bar] :percent :etas', { total: countries.length });

        for (const country of countries) {
            const countryInfoResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${country.countryCode}`);
            const countryInfo = countryInfoResponse.data;

            const borders = countryInfo.borders.map(border => ({
                commonName: border.commonName,
                region: border.region
            }));

            const existingCountryInfo = await CountryInfo.findOne({ countryCode: country.countryCode });
            if (!existingCountryInfo) {
                const countryDoc = await Country.findOne({ countryCode: country.countryCode });
                if (countryDoc) {
                    await CountryInfo.create({
                        countryCode: country.countryCode,
                        region: countryInfo.region,
                        borders: borders,
                        country: countryDoc._id
                    });
                }
            }
            bar3.tick();
        }
        const populationResponse = await axios.get('https://countriesnow.space/api/v0.1/countries/population');
        const countriesWithPopulation = populationResponse.data.data;

        const bar4 = new ProgressBar('Saving populationCounts [:bar] :percent :etas', { total: countriesWithPopulation.length });

        for (const country of countriesWithPopulation) {
            const countryDoc = await Country.findOne({ name: country.country });
            if (countryDoc && countryDoc.countryCode) {
                const existingCountryInfo = await CountryInfo.findOne({ countryCode: countryDoc.countryCode });
                if (existingCountryInfo && !existingCountryInfo.populationCounts.length) {
                    existingCountryInfo.populationCounts = country.populationCounts;
                    await existingCountryInfo.save();
                }
            }
            bar4.tick();
        }

        console.log('Database populated successfully');
    } catch (error) {
        console.error('Error populating database:', error);
    }
};
populateDatabase();

app.get('/api/countries', async (req, res) => {
    try {
        const countries = await Country.find();
        res.json(countries);
    } catch (error) {
        res.status(500).send('Error fetching data from database');
    }
});

app.get('/api/country/:countryCode', async (req, res) => {
    const { countryCode } = req.params;
    try {
        const countryInfo = await CountryInfo.findOne({ countryCode }).populate('country');
        if (!countryInfo) {
            return res.status(404).send('Country not found');
        }
        res.json(countryInfo);
    } catch (error) {
        res.status(500).send('Error fetching data from database');
    }
});

app.get('/api/countries/flags', async (req, res) => {
    try {
        const countriesWithFlags = await Country.find({ flag: { $exists: true } });
        res.json(countriesWithFlags);
    } catch (error) {
        res.status(500).send('Error fetching data from database');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});