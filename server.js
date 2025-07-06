import express from 'express';
import dotenv from 'dotenv'; 

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 3000;

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});