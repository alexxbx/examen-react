import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [rgpdAccepted, setRgpdAccepted] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push('8 caractères minimum');
        if (!/[A-Z]/.test(password)) errors.push('une majuscule');
        if (!/[a-z]/.test(password)) errors.push('une minuscule');
        if (!/[0-9]/.test(password)) errors.push('un chiffre');
        if (!/[!@#$%^&*]/.test(password)) errors.push('un caractère spécial (!@#$%^&*)');
        return errors;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'password') {
            const errors = validatePassword(value);
            setPasswordError(errors.length > 0 ? `Le mot de passe doit contenir : ${errors.join(', ')}` : '');
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!rgpdAccepted) {
            setMessage('❌ Vous devez accepter les conditions RGPD pour continuer.');
            return;
        }

        const passwordErrors = validatePassword(form.password);
        if (passwordErrors.length > 0) {
            setMessage('❌ Le mot de passe ne respecte pas les critères de sécurité.');
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            await axios.post('https://examen-symfony.onrender.com/api/register', form);
            setMessage('✅ Utilisateur créé avec succès !');
            setForm({ username: '', email: '', password: '' });
            navigate('/Login');
        } catch (err) {
            setMessage("❌ Erreur lors de l'inscription.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Inscription</h2>
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
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
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
                        {passwordError && (
                            <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                        )}
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                checked={rgpdAccepted}
                                onChange={(e) => setRgpdAccepted(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700">
                                J'accepte les conditions d'utilisation et la politique de confidentialité
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !rgpdAccepted}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                            ${!rgpdAccepted ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                    >
                        {loading ? 'Enregistrement...' : "S'inscrire"}
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 text-center text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Déjà inscrit ?{' '}
                        <button
                            onClick={() => navigate('/Login')}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Se connecter
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
