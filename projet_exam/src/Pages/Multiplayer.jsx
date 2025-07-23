import React, { useState, useEffect, useCallback } from 'react'
import Header from '../Components/Header'
import axios from 'axios'

function Multiplayer() {
    const [waitingGames, setWaitingGames] = useState([])
    const [userGames, setUserGames] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    // Configuration d'axios avec le token
    const api = axios.create({
        baseURL: 'https://examen-symfony.onrender.com',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    // Récupérer les parties en attente
    const fetchWaitingGames = useCallback(async () => {
        try {
            const response = await api.get('/api/game-sessions/waiting')
            setWaitingGames(response.data)
        } catch (err) {
            setError('Erreur lors de la récupération des parties en attente')
            console.error(err)
        }
    }, [api])

    // Récupérer les parties de l'utilisateur
    const fetchUserGames = useCallback(async () => {
        try {
            const response = await api.get(`/api/game-sessions/user/${userId}`)
            setUserGames(response.data)
        } catch (err) {
            setError('Erreur lors de la récupération de vos parties')
            console.error(err)
        }
    }, [api, userId])

    // Créer une nouvelle partie
    const createGame = async () => {
        setLoading(true)
        try {
            const response = await api.post('/api/game-sessions')
            // Rafraîchir la liste des parties en attente
            await fetchWaitingGames()
            return response.data
        } catch (err) {
            setError('Erreur lors de la création de la partie')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Rejoindre une partie
    const joinGame = async (gameId) => {
        setLoading(true)
        try {
            const response = await api.post(`/api/game-sessions/${gameId}/join`)
            // Rafraîchir les listes
            await Promise.all([fetchWaitingGames(), fetchUserGames()])
            return response.data
        } catch (err) {
            setError('Erreur lors de la tentative de rejoindre la partie')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Charger les données au montage du composant
    useEffect(() => {
        fetchWaitingGames();
        fetchUserGames();
    }, [userId, token, fetchWaitingGames, fetchUserGames]);

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Créer/Rejoindre une partie */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h1 className="font-bold text-2xl text-center mb-4">Mode Multiplayer</h1>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={createGame}
                                disabled={loading}
                                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                {loading ? 'Création...' : 'Créer une partie'}
                            </button>
                        </div>
                    </div>

                    {/* Section Parties en attente */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="font-bold text-xl mb-4">Parties en attente</h2>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="space-y-4">
                            {waitingGames.map(game => (
                                <div key={game.id} className="border p-4 rounded flex justify-between items-center">
                                    <div>
                                        <p>Hôte: {game.host.username}</p>
                                        <p className="text-sm text-gray-500">Créée le: {new Date(game.createdAt).toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => joinGame(game.id)}
                                        disabled={loading}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
                                    >
                                        Rejoindre
                                    </button>
                                </div>
                            ))}
                            {waitingGames.length === 0 && (
                                <p className="text-gray-500 text-center">Aucune partie en attente</p>
                            )}
                        </div>
                    </div>

                    {/* Section Vos parties */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="font-bold text-xl mb-4">Vos parties</h2>
                        <div className="space-y-4">
                            {userGames.map(game => (
                                <div key={game.id} className="border p-4 rounded">
                                    <p>Statut: {game.status}</p>
                                    <p>Hôte: {game.host.username}</p>
                                    {game.guest && <p>Invité: {game.guest.username}</p>}
                                    {game.hostScore !== null && (
                                        <p>Score: {game.hostScore} - {game.guestScore}</p>
                                    )}
                                    {game.winner && (
                                        <p>Gagnant: {game.winner.username}</p>
                                    )}
                                </div>
                            ))}
                            {userGames.length === 0 && (
                                <p className="text-gray-500 text-center">Vous n'avez pas encore de parties</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Multiplayer