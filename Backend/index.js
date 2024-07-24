const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const hospitalRoutes = require('./routes/hospitalRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));

app.use('/api/v1/hospitals', hospitalRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Hospital Management API');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
