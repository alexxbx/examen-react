import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/login_check', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);
            setMessage('✅ Connexion réussie !');
            navigate('/profile');
        } catch (err) {
            setMessage('❌ Identifiants incorrects.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Nom d'utilisateur"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Se connecter
                    </button>
                </form>

                {message && (
                    <div
                        className={`mt-4 text-center text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {message}
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Pas encore de compte ?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            S'inscrire
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
