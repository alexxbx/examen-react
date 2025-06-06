import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!userId || !token) {
            setError('Vous devez être connecté pour accéder au chat');
            return;
        }

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/chat/${userId}/messages`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(response.data);
            } catch (err) {
                setError('Erreur lors du chargement des messages');
                console.error(err);
            }
        };

        fetchMessages();
    }, [userId, token]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:8000/api/chat/${userId}/messages`,
                { message: newMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessages(prev => [...prev, response.data.userMessage, response.data.botMessage]);
            setNewMessage('');
            setError('');
        } catch (err) {
            setError('Erreur lors de l\'envoi du message');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* En-tête du chat */}
                        <div className="bg-blue-600 text-white p-4">
                            <h1 className="text-xl font-semibold">Chat avec l'assistant IA</h1>
                        </div>

                        {/* Zone des messages */}
                        <div className="h-[600px] overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 ${message.isFromUser
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-800'
                                            }`}
                                    >
                                        <p className="text-sm">{message.message}</p>
                                        <span className="text-xs opacity-75 mt-1 block">
                                            {formatDate(message.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Zone de saisie */}
                        <form onSubmit={handleSubmit} className="border-t p-4 bg-gray-50">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Écrivez votre message..."
                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !newMessage.trim()}
                                    className={`px-6 py-2 rounded-lg font-semibold text-white ${loading || !newMessage.trim()
                                            ? 'bg-blue-300 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {loading ? 'Envoi...' : 'Envoyer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;