const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.by8ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('MongoDB conectado exitosamente');
    } catch (err) {
        console.error('Error conectando a MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;