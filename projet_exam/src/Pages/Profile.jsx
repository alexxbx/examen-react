import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Achievements from '../Components/Achievements';

function Profile() {
    const [user, setUser] = useState(null);
    const [progressions, setProgressions] = useState([]);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('Utilisateur non trouvé.');
            return;
        }
        if (!token) {
            setError('Non connecté.');
            return;
        }

        const fetchData = async () => {
            try {
                // Récupérer les informations de l'utilisateur
                const userRes = await axios.get(`https://examen-symfony.onrender.com/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(userRes.data);
                setEditedUser({
                    username: userRes.data.username,
                    email: userRes.data.email,
                    password: ''
                });

                // Récupérer les leçons avec leur statut de déverrouillage
                const lessonsRes = await axios.get(`https://examen-symfony.onrender.com/api/user/${userId}/lessons-unlocked`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProgressions(lessonsRes.data);
            } catch (err) {
                setError('Erreur lors de la récupération des données.');
                console.error(err);
            }
        };

        fetchData();
    }, [setError, setUser, setEditedUser, setProgressions]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser({
            username: user.username,
            email: user.email,
            password: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        try {
            const updateData = {
                username: editedUser.username,
                email: editedUser.email
            };

            // N'inclure le mot de passe que s'il a été modifié
            if (editedUser.password) {
                updateData.password = editedUser.password;
            }

            await axios.patch(`https://examen-symfony.onrender.com/api/users/${userId}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(prev => ({
                ...prev,
                ...updateData
            }));
            setIsEditing(false);
            setError('');
        } catch (err) {
            setError('Erreur lors de la modification des données.');
            console.error(err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (error) return <p>{error}</p>;
    if (!user) return <p>Chargement...</p>;

    return (
        <div className='min-h-screen bg-gray-100'>
            <Header />
            <div className='container mx-auto px-4 py-8'>
                <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                    <h2 className='text-2xl font-bold mb-4'>Profil</h2>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={editedUser.username}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe (optionnel)</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={editedUser.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                >
                                    Enregistrer
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <p className='mb-2'><strong>Nom d'utilisateur :</strong> {user.username}</p>
                            <p className='mb-2'><strong>Email :</strong> {user.email}</p>
                            <p className='mb-4'><strong>Inscrit le :</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleEdit}
                                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={logout}
                                    className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
                                >
                                    Déconnexion
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className='bg-white rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-bold mb-4'>Progression</h2>
                    <div className='space-y-4'>
                        {progressions.map((progression) => (
                            <div
                                key={progression.id}
                                className={`p-4 rounded-lg border ${progression.completed
                                    ? 'bg-green-50 border-green-200'
                                    : progression.isUnlocked
                                        ? 'bg-blue-50 border-blue-200'
                                        : 'bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <h3 className='font-semibold'>{progression.title}</h3>
                                <p className='text-sm text-gray-600'>
                                    {progression.completed
                                        ? '✅ Complétée'
                                        : progression.isUnlocked
                                            ? '🔓 Débloquée'
                                            : '🔒 Verrouillée'}
                                </p>
                                {progression.isUnlocked && !progression.completed && (
                                    <button
                                        onClick={() => navigate(`/lessons/${progression.id}`)}
                                        className='mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
                                    >
                                        Commencer
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <Achievements userId={parseInt(localStorage.getItem('userId'))} />
            </div>
        </div>
    );
}

export default Profile;
