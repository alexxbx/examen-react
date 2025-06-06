import React from 'react'
import Header from '../Components/Header';

function Leaderboard() {
    return (
        <div >
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4E1C1]">
                <h1 className="text-4xl font-bold text-center text-[#2F4858] mb-12">Leaderboard</h1>
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;