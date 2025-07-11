import dotenv from 'dotenv';
dotenv.config();
import connectToDB from './config/db.config.js';
import app from './app.js';

connectToDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})