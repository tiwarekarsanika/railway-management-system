import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config(); 
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(morgan('dev'));

// app.use(cookieParser());

// Routes
// app.use('/api', routes);

export default app;