// const express = require("express");
// const cors = require("cors");
// const Axios = require("axios");
// const app = express();
// const PORT = 8000;

// app.use(cors());
// app.use(express.json());

// app.post("/compile", (req, res) => {
//     // getting the required data from the request
//     let code = req.body.code;
//     let language = req.body.language;
//     let input = req.body.input;

//     let languageMap = {
//         "c": { language: "c", version: "10.2.0" },
//         "cpp": { language: "c++", version: "10.2.0" },
//         "python": { language: "python", version: "3.10.0" },
//         "java": { language: "java", version: "15.0.2" }
//     };

//     if (!languageMap[language]) {
//         return res.status(400).send({ error: "Unsupported language" });
//     }

//     let data = {
//         "language": languageMap[language].language,
//         "version": languageMap[language].version,
//         "files": [
//             {
//                 "name": "main",
//                 "content": code
//             }
//         ],
//         "stdin": input
//     };

//     let config = {
//         method: 'post',
//         url: 'https://emkc.org/api/v2/piston/execute',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data: data
//     };

//     // calling the code compilation API
//     Axios(config)
//         .then((response) => {
//             res.json(response.data.run);  // Send the run object directly
//             console.log(response.data);
//         }).catch((error) => {
//             console.log(error);
//             res.status(500).send({ error: "Something went wrong" });
//         });
// });

// app.listen(process.env.PORT || PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
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

    let startTime = process.hrtime(); // Start the timer

    // Calling the code compilation API
    Axios(config)
        .then((response) => {
            let endTime = process.hrtime(startTime); // End the timer
            let executionTime = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds

            res.json({
                ...response.data.run,
                executionTime // Include execution time in the response
            });
            console.log(`Execution Time: ${executionTime}ms`);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: "Something went wrong" });
        });
});


app.post("/submit", (req, res) => {
    let code = req.body.code;
    let language = req.body.language;

    let languageMap = {
        "c": { language: "c", version: "10.2.0" },
        "cpp": { language: "c++", version: "10.2.0" },
        "python": { language: "python", version: "3.10.0" },
        "java": { language: "java", version: "15.0.2" }
    };

    if (!languageMap[language]) {
        return res.status(400).send({ error: "Unsupported language" });
    }

    const testCases = [
        { input: "1", expectedOutput: "1\n" },
        { input: "2", expectedOutput: "2\n" },
        { input: "3", expectedOutput: "3\n" },
        { input: "4", expectedOutput: "4\n" },
        { input: "5", expectedOutput: "5\n" },
        { input: "6", expectedOutput: "6\n" },
        { input: "7", expectedOutput: "7\n" },
        { input: "8", expectedOutput: "8\n" },
        { input: "9", expectedOutput: "9\n" },
        { input: "10", expectedOutput: "10\n" },
        { input: "11", expectedOutput: "11\n" },
    ];

    let promises = testCases.map((testCase) => {
        let data = {
            "language": languageMap[language].language,
            "version": languageMap[language].version,
            "files": [
                {
                    "name": "main",
                    "content": code
                }
            ],
            "stdin": testCase.input
        };

        let config = {
            method: 'post',
            url: 'https://emkc.org/api/v2/piston/execute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return Axios(config).then((response) => {
            return {
                passed: response.data.run.stdout.trim() === testCase.expectedOutput.trim(),
                output: response.data.run.stdout,
                error: response.data.run.stderr
            };
        }).catch((error) => {
            console.log(error);
            return { passed: false, error: "Something went wrong" };
        });
    });

    Promise.all(promises).then(results => {
        const allPassed = results.every(result => result.passed);
        if (allPassed) {
            res.json({ success: true, message: "Question Solved!" });
        } else {
            res.json({ success: false, message: "Incorrect Answer", details: results });
        }
    });
});


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
app.post("/submit", (req, res) => {
    let code = req.body.code;
    let language = req.body.language;

    let languageMap = {
        "c": { language: "c", version: "10.2.0" },
        "cpp": { language: "c++", version: "10.2.0" },
        "python": { language: "python", version: "3.10.0" },
        "java": { language: "java", version: "15.0.2" }
    };

    if (!languageMap[language]) {
        return res.status(400).send({ error: "Unsupported language" });
    }

    const testCases = [
        { input: "1", expectedOutput: "1\n" },
        { input: "2", expectedOutput: "2\n" },
        { input: "3", expectedOutput: "3\n" },
        { input: "4", expectedOutput: "4\n" },
        { input: "5", expectedOutput: "5\n" },
        { input: "6", expectedOutput: "6\n" },
        { input: "7", expectedOutput: "7\n" },
        { input: "8", expectedOutput: "8\n" },
        { input: "9", expectedOutput: "9\n" },
        { input: "10", expectedOutput: "10\n" },
        { input: "11", expectedOutput: "11\n" },
    ];

    let promises = testCases.map((testCase) => {
        let data = {
            "language": languageMap[language].language,
            "version": languageMap[language].version,
            "files": [
                {
                    "name": "main",
                    "content": code
                }
            ],
            "stdin": testCase.input
        };

        let config = {
            method: 'post',
            url: 'https://emkc.org/api/v2/piston/execute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        let startTime = process.hrtime(); // Start the timer

        return Axios(config).then((response) => {
            let endTime = process.hrtime(startTime); // End the timer
            let executionTime = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds

            return {
                passed: response.data.run.stdout.trim() === testCase.expectedOutput.trim(),
                output: response.data.run.stdout,
                error: response.data.run.stderr,
                executionTime // Include execution time in the result
            };
        }).catch((error) => {
            console.log(error);
            return { passed: false, error: "Something went wrong" };
        });
    });

    Promise.all(promises).then(results => {
        const allPassed = results.every(result => result.passed);
        if (allPassed) {
            res.json({ success: true, message: "Question Solved!", results });
        } else {
            res.json({ success: false, message: "Incorrect Answer", details: results });
        }
    });
});
