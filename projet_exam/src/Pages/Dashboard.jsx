import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserSection from '../Components/Dashboard/UserSection';
import LessonSection from '../Components/Dashboard/LessonSection';
import ExerciseSection from '../Components/Dashboard/ExerciseSection';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Token:', token);
        console.log('User ID:', id);

        if (!token) {
            console.log('Pas de token trouvé');
            setError("Token manquant");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Vérifier d'abord dans le localStorage
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                if (!userData.roles || !userData.roles.includes('ROLE_ADMIN')) {
                    console.log('Utilisateur non admin (localStorage)');
                    setError("Accès réservé aux administrateurs");
                    setLoading(false);
                    navigate('/');
                    return;
                }

                console.log('Utilisateur admin, récupération des données...');
                const [usersRes, lessonsRes, exercisesRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/users', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/ld+json'
                        }
                    }),
                    axios.get('http://localhost:8000/api/lessons', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/ld+json'
                        }
                    }),
                    axios.get('http://localhost:8000/api/exercises', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/ld+json'
                        }
                    }),
                ]);

                // Gestion des utilisateurs
                console.log('Réponse brute des utilisateurs:', usersRes.data);
                const usersData = usersRes.data.member || [];
                console.log('Données utilisateurs formatées:', usersData);
                setUsers(usersData);

                // Gestion des leçons
                console.log('Réponse brute des leçons:', lessonsRes.data);
                const lessonsData = lessonsRes.data.member || [];
                console.log('Données leçons formatées:', lessonsData);
                setLessons(lessonsData);

                // Gestion des exercices
                console.log('Réponse brute des exercices:', exercisesRes.data);
                const exercisesData = exercisesRes.data.member || [];
                console.log('Données exercices formatées:', exercisesData);
                setExercises(exercisesData);
            } catch (err) {
                console.error('Erreur lors du chargement des données:', err);
                setError("Erreur lors du chargement des données : " + (err.response?.data?.message || err.message));
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, navigate, id]);

    const handleAddUser = async (newUser) => {
        try {
            const res = await axios.post('http://localhost:8000/api/register', newUser, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers([...users, res.data]);
            return true;
        } catch (err) {
            setError('Erreur ajout utilisateur');
            return false;
        }
    };

    const handleAddLesson = async (newLesson) => {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/lessons',
                newLesson,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/ld+json',
                        'Accept': 'application/ld+json'
                    }
                }
            );
            setLessons(prev => [...prev, res.data]);
            return true;
        } catch (err) {
            setError(err.response?.data?.hydra?.description || 'Erreur serveur. Contactez l\'admin.');
            return false;
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user.id !== userId));
            return true;
        } catch (err) {
            setError('Erreur suppression utilisateur');
            return false;
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        try {
            await axios.delete(`http://localhost:8000/api/lessons/${lessonId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLessons(lessons.filter(lesson => lesson.id !== lessonId));
            return true;
        } catch (err) {
            setError('Erreur suppression leçon');
            return false;
        }
    };

    const handleUpdateUser = async (userId, formData) => {
        try {
            await axios.patch(`http://localhost:8000/api/users/${userId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user => user.id === userId ? { ...user, ...formData } : user));
            return true;
        } catch (err) {
            setError('Erreur modification utilisateur');
            return false;
        }
    };

    const handleUpdateLesson = async (lessonId, formData) => {
        try {
            await axios.put(`http://localhost:8000/api/lessons/${lessonId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLessons(lessons.map(lesson => lesson.id === lessonId ? { ...lesson, ...formData } : lesson));
            return true;
        } catch (err) {
            setError('Erreur modification leçon');
            return false;
        }
    };

    const handleAddExercise = async (newExercise) => {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/exercises',
                newExercise,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/ld+json',
                        'Accept': 'application/ld+json'
                    }
                }
            );
            setExercises(prev => [...prev, res.data]);
            return true;
        } catch (err) {
            setError('Erreur ajout exercice');
            return false;
        }
    };

    const handleDeleteExercise = async (exerciseId) => {
        try {
            await axios.delete(`http://localhost:8000/api/exercises/${exerciseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
            return true;
        } catch (err) {
            setError('Erreur suppression exercice');
            return false;
        }
    };

    const handleUpdateExercise = async (exerciseId, formData) => {
        try {
            await axios.put(`http://localhost:8000/api/exercises/${exerciseId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExercises(exercises.map(exercise => exercise.id === exerciseId ? { ...exercise, ...formData } : exercise));
            return true;
        } catch (err) {
            setError('Erreur modification exercice');
            return false;
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Admin</h1>

            <UserSection
                users={users}
                onAddUser={handleAddUser}
                onDeleteUser={handleDeleteUser}
                onUpdateUser={handleUpdateUser}
            />

            <LessonSection
                lessons={lessons}
                onAddLesson={handleAddLesson}
                onDeleteLesson={handleDeleteLesson}
                onUpdateLesson={handleUpdateLesson}
            />

            <ExerciseSection
                exercises={exercises}
                lessons={lessons}
                onAddExercise={handleAddExercise}
                onDeleteExercise={handleDeleteExercise}
                onUpdateExercise={handleUpdateExercise}
            />
        </div>
    );
}

export default Dashboard;