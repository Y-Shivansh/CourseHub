import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js'
const app = express();
// const corsOption = {
//     origin: [],
// }


app.use(express.json());
// app.use(cors(corsOption));
app.use(cors());
app.get('/health', (req, res)=> {
    res.status(200).json({ status: 'UP' });
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);

export default app;