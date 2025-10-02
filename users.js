const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Outreach", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Schema & Model
const signupSchema = new mongoose.Schema({
  username: String,
  password: String,
  dob: String,
});

const Signup = mongoose.model("signups", signupSchema);

// Route to handle signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password, dob } = req.body;

    // Check if username exists
    const existingUser = await Signup.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    const newUser = new Signup({ username, password, dob });
    await newUser.save();

    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error signing up user" });
  }
});

// NEW: Endpoint to get all users (for frontend duplicate check)
app.get("/users", async (req, res) => {
  try {
    const users = await Signup.find({}, { username: 1, password: 1 , _id: 0 }); // only get usernames
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching users" });
  }
});



// fetching the locations:
const locations = new mongoose.Schema({
  id: Number,
  location: String
});

const Location = mongoose.model("Location" , locations);
app.get('/api/locations', async (req, res) => {
  const locs = await Location.find();// Fetch all locations.
  res.json(locs);
})          // api just suggests that it is a backend route and has nothing to do with the frontend URL.

// fetching vendors:
const vendors = new mongoose.Schema({
  locationId: Number,
  name: String,
  description: String,
  location: String,
  latitude: String,
  longitude: String
});

const Vendors = mongoose.model("vendors" , vendors);
app.get('/api/location/:id', async (req, res) => {
  const loc = await Vendors.find({locationId : req.params.id});
  res.json(loc);
}) 


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
