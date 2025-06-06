import React from 'react'
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

function Review() {
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="p-8 max-w-lg w-full">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Révision des Cours</h1>

                    {/* Bouton Flashcard centré */}
                    <div className="flex justify-center mb-6">
                        <button onClick={() => navigate('/Flashcards')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                            Flashcard
                        </button>
                    </div>

                    {/* Hiragana à la ligne */}
                    <div className="flex flex-wrap gap-2 items-center mt-2">
                        <span className="font-semibold text-gray-700">Hiragana :</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split('').map((char, idx) => (
                            <button key={`hiragana-${idx}`} className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-1 px-2 rounded">
                                {char}
                            </button>
                        ))}
                    </div>
                    {/* Katakana */}
                    <div className="flex flex-wrap gap-2 mb-2 items-center">
                        <span className="font-semibold text-gray-700">Katakana :</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split('').map((char, idx) => (
                            <button key={`katakana-${idx}`} className="bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-2 rounded">
                                {char}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review