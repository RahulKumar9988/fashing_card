import React, { useState } from 'react';
import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';

function App() {
    const [flashcards, setFlashcards] = useState([]);

    const fetchFlashcards = () => {
        axios.get('https://fashing-card-hh47.vercel.app/flashcards') 
            .then(response => setFlashcards(response.data))
            .catch(error => console.error('Error fetching flashcards:', error));
    };

    return (
        <div className='bg-black h-screen text-white flex flex-col items-center mt-7'>
            <div className='flex gap-10 '>
                <img className='rounded-3xl h-10 ' src="./logo.jpg" alt="" />
                <h1 className='text-xl font-semibold mb-5 md:text-4xl'>Flashcard Dashboard</h1>
                
            </div>
            
            <FlashcardForm fetchFlashcards={fetchFlashcards} />
            <FlashcardList flashcards={flashcards} />
            
        </div>
    );
}

export default App;
