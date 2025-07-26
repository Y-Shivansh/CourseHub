import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js'
import paymentRoutes from './routes/payment.routes.js'
import geminiRoutes from './routes/ai/gemini.routes.js'

const app = express();
const corsOption = {
    origin: ["http://localhost:5173", "https://coursehub-xi.vercel.app"],
    credentials: true
}


app.use(express.json());
app.use(cors(corsOption));
// app.use(cors());

// Status Api
app.get('/health', (req, res)=> {
    res.status(200).json({ status: 'UP' });
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/ai', geminiRoutes);

export default app;