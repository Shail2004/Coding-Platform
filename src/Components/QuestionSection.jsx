import React from 'react';
import '../Style/QuestionSection.css'; 

function QuestionSection(props) {
    return (
        <div className="question-section">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <div className="example-section">
                <h4>Example Input:</h4>
                <pre>{props.exampleInput}</pre>
                <h4>Example Output:</h4>
                <pre>{props.exampleOutput}</pre>
            </div>
        </div>
    );
}

export default QuestionSection;
