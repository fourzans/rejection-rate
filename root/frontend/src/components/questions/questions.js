import React from 'react';
import QuestionModal from '../question-modal/question-modal';

function Questions() {
    const question = {
        id: '',
        timestamp: Date.now(),
        question: '',
        askee: '',
        status: ''
    }

    const handleAccepted = () => {
        console.log(question);
    }

    const handleRejected = () => {
        console.log(question);
    }

    return (
        <>
            <QuestionModal
                model={question}
                handleAccepted={handleAccepted}
                handleRejected={handleRejected}
            />
        </>
    );
}

export default Questions;