import React, { useState } from 'react';
import axios from 'axios';
import DottedButton from './DottedButton';
import BasicAlerts from './BasicAlerts';


const FlashcardForm = ({ fetchFlashcards }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://fashing-card-hh47.vercel.app/flashcards', { question, answer })
        .then(() => {
            fetchFlashcards();
            setQuestion('');
            setAnswer('');
            
        }).catch(error => console.error('Error adding flashcard:', error));
        setTimeout(function(){
            window.location.reload();
        }, 1000);
        

        

        
    };  
    
    return (
        <form className="flex flex-col md:flex-row text-center gap-4 md:gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full">
            <input
                className="text-black rounded-lg pl-4 w-full md:w-96 h-12"
                type="text"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <input
                className="text-black rounded-lg pl-4 w-full md:w-96 h-12"
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
        </div>
        <div className="mt-4 md:mt-0">
            <DottedButton type="submit">Add Flashcard</DottedButton>
        </div>
    </form>
    
        
    );
};

export default FlashcardForm;
