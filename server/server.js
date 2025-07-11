import dotenv from 'dotenv';
import connectToDB from './config/db.config';
import app from './app';

dotenv.config();
connectToDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})