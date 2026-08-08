const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Note: .env file mein MONGO_URI setup honi chahiye, ya yahan direct string daal dein
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/agriTwinDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- SCHEMAS (Database Structure) ---

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true } // Real apps mein hashing use karein
});

const serviceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  serviceType: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Service = mongoose.model('Service', serviceSchema);

// --- API ENDPOINTS ---

// 1. SIGNUP
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already registered!' });

    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    res.status(201).json({ message: 'Signup Successful! You can login now.' });
  } catch (err) {
    res.status(500).json({ message: 'Error in Signup: ' + err.message });
  }
});

// 2. LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    // Login success - return user details for localStorage
    res.status(200).json({
      message: 'Login Successful!',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error in Login' });
  }
});

// 3. SERVICE BOOKING
app.post('/api/services', async (req, res) => {
  try {
    const { userId, userName, userEmail, serviceType, details } = req.body;
    
    const newService = new Service({ 
      userId, userName, userEmail, serviceType, details 
    });
    
    await newService.save();
    res.status(201).json({ message: 'Service requested successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error booking service: ' + err.message });
  }
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});