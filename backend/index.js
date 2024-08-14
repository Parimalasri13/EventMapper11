const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose


const app = express();
const PORT = 3003;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(cors({
    origin: 'https://eventmapper11.netlify.app/', // Allow only this origin
    methods: 'GET,POST',           // Allow only these methods
    allowedHeaders: 'Content-Type,Authorization' // Allow only these headers
}));


// MongoDB Atlas connection string
// = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';
const dbURI = 'mongodb+srv://parimala:12345@cluster0.nigrjnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Connect to MongoDB Atlas
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Failed to connect to MongoDB Atlas', err));



// Define a User schema and model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('Useer', userSchema);


const eventSchema = new mongoose.Schema({
    ques: { type: String, required: true },
    link: { type: String, required: true },
    events: [
        {
            name: { type: String },
            date: { type: String },
            link: { type: String },
            location: { type: String }
        }
    ]
}, { collection: 'eventsdatas' });

const EventData = mongoose.model('EventData', eventSchema);

// Define the '/data' POST endpoint
app.post('/data', async (req, res) => {
    console.log("Data endpoint hit");
    const { input } = req.body; // The input could be a domain name like "AI"
    console.log("Input received:", input);

    try {
        // Attempt to find events for the provided domain name
        const domainData = await EventData.findOne({ ques: input }); // Use findOne to get a single document
        console.log("Found domain data:", domainData);

        if (domainData) {
            res.json({ success: true, events: domainData.events });
        } else {
            res.status(404).json({ success: false, message: `No matching domain found for ${input}` });
        }
    } catch (err) {
        console.error("Error finding event/domain:", err.message);
        res.status(500).send('Server Error');
    }
});


// Secret key for JWT
const SECRET_KEY = 'your_secret_key';





app.post('/register', async (req, res) => {
    console.log("Register endpoint hit");
    const { username, email, password, confirmPassword } = req.body;
    // Validate the input
    if (!username || !email || !password || !confirmPassword) {
        console.error("Missing required fields");
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error("User already exists");
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword , confirmPassword: hashedPassword});
        console.log("New User Object:", newUser);
        await newUser.save();

        console.log("User registered successfully");
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Login route


app.post('/login', async (req, res) => {
    console.log("Login endpoint hit");
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", password);

    if (!email || !password) {
        console.error("Missing email or password");
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        console.log("Found user:", user);
        if (!user) {
            console.error("User not found");
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);
        if (!isMatch) {
            console.error("Password does not match");
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        console.log("Generated token:", token);
        res.status(200).json({ token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: 'Server error' });
    }
});




// app.post('/data', async (req, res) => {
//     console.log("Data endpoint hit");
//     const { input } = req.body; // The input could be a domain name like "AI"
//     console.log("Input received:", input);

//     try {
//         if (input === 'Event') {
//             // Fetch all events if input is 'Event'
//             const events = await EventsData.find(); 
//             console.log("Found events:", events);

//             if (events.length > 0) {
//                 res.json({ success: true, events });
//             } else {
//                 res.json({ success: false, message: 'No matching event found' });
//             }
//         } else {
//             // Attempt to find events for the provided domain name
//             const domainData = await EventsData.findOne({ ques: input });
//             console.log("Found domain data:", domainData);

//             if (domainData) {
//                 res.json({ success: true, events: domainData.events });
//             } else {
//                 res.status(404).json({ success: false, message: `No matching domain found for ${input}` });
//             }
//         }
//     } catch (err) {
//         console.error("Error finding event/domain:", err.message);
//         res.status(500).send('Server Error');
//     }
// });







// Protected route example
app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: 'Protected content', user: decoded });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});










