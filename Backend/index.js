//index.js
// Random Commit

const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

// Import routes
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/codingPlatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);

app.post("/compile", (req, res) => {
    // getting the required data from the request
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    let languageMap = {
        "c": { language: "c", version: "10.2.0" },
        "cpp": { language: "c++", version: "10.2.0" },
        "python": { language: "python", version: "3.10.0" },
        "java": { language: "java", version: "15.0.2" }
    };

    if (!languageMap[language]) {
        return res.status(400).send({ error: "Unsupported language" });
    }

    let data = {
        "language": languageMap[language].language,
        "version": languageMap[language].version,
        "files": [
            {
                "name": "main",
                "content": code
            }
        ],
        "stdin": input
    };

    let config = {
        method: 'post',
        url: 'https://emkc.org/api/v2/piston/execute',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    // calling the code compilation API
    Axios(config)
        .then((response) => {
            res.json(response.data.run);  // Send the run object directly
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: "Something went wrong" });
        });
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
