import React, { useState } from 'react';
import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';

function App() {
    const [flashcards, setFlashcards] = useState([]);

    const fetchFlashcards = () => {
       try{
        axios.get('https://fashing-card-hh47.vercel.app/flashcards')
        .then(response => setFlashcards(response.data))
        .catch(error => console.error('Error fetching flashcards:', error));
       }catch(error){
        console.log('error');
        
       }
    };

    return (
        <div className='bg-black h-screen text-white flex flex-col items-center'>
            <h1 className='text-2xl'>Flashcard Dashboard</h1>
            <FlashcardForm fetchFlashcards={fetchFlashcards} />
            <FlashcardList flashcards={flashcards} />
        </div>
    );
}

export default App;
