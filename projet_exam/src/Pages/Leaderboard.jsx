import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import axios from 'axios';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        axios.get('https://examen-symfony.onrender.com/api/lessons-leaderboard')
            .then(res => setLeaderboard(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4E1C1]">
                <h1 className="text-4xl font-bold text-center text-[#2F4858] mb-12">Classement par leçons terminées</h1>
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                    <table className="min-w-full bg-white rounded shadow">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Rang</th>
                                <th className="py-2 px-4 border-b">Joueur</th>
                                <th className="py-2 px-4 border-b">Leçons terminées</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((user, idx) => (
                                <tr key={user.userId} className={idx === 0 ? 'bg-yellow-100 font-bold' : ''}>
                                    <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
                                    <td className="py-2 px-4 border-b">{user.username}</td>
                                    <td className="py-2 px-4 border-b text-center">{user.lessonsCompleted}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;