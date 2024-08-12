import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('https://fashing-card-hh47.vercel.app/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const deleteFlashcard = (id) => {
    axios.delete(`https://fashing-card-hh47.vercel.app/flashcards/${id}`)
      .then(() => setFlashcards(flashcards.filter(fc => fc._id !== id)))
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl mt-5 mb-4">Flashcards</h1>
      {flashcards.length > 0 && (
        <div className="flip-card relative h-64 w-full max-w-sm mx-auto cursor-pointer">
          <div className="flip-card-inner h-full w-full transition-transform transform-gpu duration-700">
            <div className="flip-card-front absolute inset-0 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center items-center">
              <h1 className="text-center text-2xl"><strong>{flashcards[currentIndex].question}</strong></h1>
            </div>
            <div className="flip-card-back  inset-0 shadow-lg rounded-lg p-4 transform rotate-y-180">
              <div className="text-pretty overflow-y-scroll scroll-smooth  ">
                <strong>{flashcards[currentIndex].answer}</strong>
                <div>
                <button className="mt-4 bg-black absolute bottom-1 right-28 text-white rounded-lg px-4 py-2 "
                    onClick={() => deleteFlashcard(flashcards[currentIndex]._id)}>
                    Delete
              </button>    
                </div>
              </div>
                        
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          className="bg-white text-black rounded-lg px-4 py-2"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="bg-white text-black rounded-lg px-4 py-2"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardList;
