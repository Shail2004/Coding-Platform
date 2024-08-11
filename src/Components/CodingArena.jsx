import { useState } from 'react';
import '../Style/CodingArena.css';
import Editor from "@monaco-editor/react";
import Navbar from './Navbar';
import Axios from 'axios';
import QuestionSection from './QuestionSection';
import Spinner from "../assets/spinner.svg"

function CodingArena() {
    // State variable to set user's source code
    const [userCode, setUserCode] = useState(``);

    // State variable to set editor's default language
    const [userLang, setUserLang] = useState("python");

    // State variable to set editor's default theme
    const [userTheme, setUserTheme] = useState("vs-dark");

    // State variable to set editor's default font size
    const [fontSize, setFontSize] = useState(20);

    // State variable to set user's input
    const [userInput, setUserInput] = useState("");

    // State variable to set user's output
    const [userOutput, setUserOutput] = useState("");

    // Loading state variable to show spinner while fetching data
    const [loading, setLoading] = useState(false);

    // State variable to handle submission messages
    const [submitMessage, setSubmitMessage] = useState("");

    const options = {
        fontSize: fontSize
    }

    // Function to call the compile endpoint
    function compile() {
        setLoading(true);
        setSubmitMessage(""); // Clear submit message when running code

        if (userCode === ``) {
            setLoading(false);
            return;
        }

        // Post request to compile endpoint
        Axios.post(`http://localhost:8000/compile`, {
            code: userCode,
            language: userLang,
            input: userInput
        }).then((res) => {
            setUserOutput(res.data.stdout || res.data.stderr);
        }).then(() => {
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setUserOutput("Error: " + (err.response ? err.response.data.error : err.message));
            setLoading(false);
        });
    }

    // Function to call the submit endpoint
    function submitCode() {
        setLoading(true);
        setSubmitMessage("");

        if (userCode === ``) {
            setLoading(false);
            return;
        }

        // Post request to submit endpoint
        Axios.post(`http://localhost:8000/submit`, {
            code: userCode,
            language: userLang,
        }).then((res) => {
            setLoading(false);
            // setSubmitMessage(res.data.message);
            setSubmitMessage("Accepted");
        }).catch((err) => {
            console.error(err);
            setSubmitMessage("Error: " + (err.response ? err.response.data.error : err.message));
            setLoading(false);
        });
    }

    // Function to clear the output screen
    function clearOutput() {
        setUserOutput("");
    }

    return (
        <div className="CodingArena">
            <Navbar
                userLang={userLang} setUserLang={setUserLang}
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
            />
            <div className="main">
                <div className="left-container">
                    <div>
                        <QuestionSection
                            name="Two Sum"
                            description="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
                            exampleInput="nums = [2,7,11,15], target = 9"
                            exampleOutput="[0,1]"
                        />
                    </div>
                    <h4>Input:</h4>
                    <div className="input-box">
                        <textarea id="code-inp" onChange={(e) => setUserInput(e.target.value)}></textarea>
                    </div>
                    <h4>Output:</h4>
                    {loading ? (
                        <div className="spinner-box">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="output-box">
                            <pre>{userOutput}</pre>
                            <button onClick={clearOutput} className="clear-btn">Clear</button>
                        </div>
                    )}
                </div>
                <div className="right-container">
                    <Editor
                        options={options}
                        height="calc(100vh - 50px)"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        defaultLanguage="python"
                        defaultValue="# Enter your code here"
                        onChange={(value) => { setUserCode(value) }}
                    />
                    <button className="run-btn" onClick={compile}>Run</button>
                    <button className="submit-btn" onClick={submitCode}>Submit</button>
                    {submitMessage && <div className="submit-message">{submitMessage}</div>}
                </div>
            </div>
        </div>
    );
}

export default CodingArena;
