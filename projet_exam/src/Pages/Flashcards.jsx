import React from 'react'
import Header from '../Components/Header'
import Flashcard from '../Components/FlashCard'

function Flashcards() {
    return (
        <div>
            <Header />
            <div className='p-6 min-h-screen bg-gray-100 flex items-center justify-center'>
                <Flashcard />
            </div>
        </div>
    )
}

export default Flashcards