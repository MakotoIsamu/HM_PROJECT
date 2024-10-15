const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = "your_secret_key"; // Replace with a secure secret key

app.use(express.json());

// Enable CORS for your frontend
app.use(cors({
    origin: 'https://hm-project-kappa.vercel.app',
    credentials: true
}));

// MongoDB connection using Mongoose
mongoose.connect('mongodb+srv://Dhruv:hmclonewebsite@cluster0.5noh9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// User schema and model for MongoDB
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Middleware to verify the token (authorization)
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
};
  

// Register route (authentication)
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id, username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });
  
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Login route (authentication)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });
  
      const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Logout route
app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

// Check authentication status
app.get('/api/auth/check-auth', verifyToken, (req, res) => {
    res.json({ isAuthenticated: true, user: { id: req.user.userId, username: req.user.username } });
});

// Check admin status (you'll need to implement admin logic)
app.get('/api/auth/check-admin', verifyToken, (req, res) => {
    // Implement your admin check logic here
    const isAdmin = false; // This should be based on your admin logic
    res.json({ isAdmin });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
