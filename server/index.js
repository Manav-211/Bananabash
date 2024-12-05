const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const axios = require("axios"); 
const UserModel = require("./model/User");
const path = require('path');
const nodemailer = require('nodemailer');




dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } 
}));






app.use('/music', express.static(path.join(__dirname, 'music')));



app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await UserModel.find()
            .select("name highestScore") // Selecting both name and highestScore
            .sort({ highestScore: -1 })  // Sorting by highest score in descending order
            .limit(10);  // Limiting to top 10 users for the leaderboard
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Failed to fetch leaderboard." });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.post('/api/submit-score', async (req, res) => {
    const { userId, score } = req.body;

    if (!userId || typeof score !== 'number') {
        return res.status(400).json({ message: "User ID and score are required." });
    }

    try {
        const user = await UserModel.findById(userId);

        if (user) {
            // Only update if the new score is higher
            if (score > user.highestScore) {
                user.highestScore = score;
                await user.save();
                res.status(200).json({ message: "Score updated successfully." });
            } else {
                res.status(200).json({ message: "Score not updated; not higher than highest score." });
            }
        } else {
            res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        console.error("Error updating score:", error);
        res.status(500).json({ message: "Failed to update score." });
    }
});

// API route to get the music file URL
app.get('/api/music', (req, res) => {
    try {
        res.json({ url: 'http://localhost:3001/music/banana_bash.mp3' });
    } catch (error) {
        console.error("Error serving music file:", error);
        res.status(500).json({ message: "Failed to fetch music file" });
    }
});

// Route to fetch banana data
app.get('/api/banana', async (req, res) => {
    try {
        const response = await axios.get("http://marcconrad.com/uob/banana/api.php");
        console.log("API Response:", response.data); // Debug: Check if data is correct
        res.json(response.data); // Return the JSON data with number and image URL
    } catch (error) {
        console.error("Error fetching from API:", error);
        res.status(500).json({ message: "Failed to fetch data", error: error.message });
    }
});
app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "Failed to logout" });
            } else {
                res.status(200).json("Logout successful");
            }
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});



app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.user = { id: user._id, name: user.name, email: user.email };
                console.log(user.name);

                // Send Welcome Email
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'manavpradeepkumar@gmail.com', // Use your email
                        pass: 'daqi oobj pira kohk' // Use your app password
                    }
                });

                const mailOptions = {
                    from: 'bananabash33@gmail.com',
                    to: user.email,
                    subject: 'Welcome to Banana Bash!',
                    text: `Hi ${user.name},\n\nWelcome to Banana Bash! We're excited to have you join our family of banana-loving gamers.\n\nGet ready to bash some bananas and climb the leaderboard!\n\nBest regards,\nThe Banana Bash Team`,
                    html: `<h1>Welcome to Banana Bash, ${user.name}!</h1>
                           <p>We're thrilled to have you as part of our banana family.</p>
                           <p>Get ready to enjoy the game and aim for the top spot on the leaderboard!</p>
                           <p>🍌 Happy Bashing! 🍌</p>
                           <p>- The Banana Bash Team</p>`
                };

                try {
                    await transporter.sendMail(mailOptions);
                    console.log('Welcome email sent successfully!');
                } catch (error) {
                    console.error("Error sending welcome email:", error);
                }

                res.json("Success");
            } else {
                res.status(401).json("Password doesn't match");
            }
        } else {
            res.status(404).json("No Records found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json("Not authenticated");
    }
});
