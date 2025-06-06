import React from 'react'
import { useState } from 'react';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);

        // Simulate chatbot response
        const chatbotResponse = await getChatbotResponse(input);
        setMessages((prev) => [...prev, { sender: 'chatbot', text: chatbotResponse }]);

        setInput('');
    };

    const getChatbotResponse = async (message) => {
        // Simulate a response for now
        if (message.toLowerCase().includes('grammaire')) {
            return 'En japonais, la grammaire est très structurée. Avez-vous une question spécifique ?';
        } else if (message.toLowerCase().includes('cours')) {
            return 'Je peux vous aider avec des concepts de cours en japonais. Que voulez-vous savoir ?';
        } else {
            return 'Désolé, je ne comprends pas. Pouvez-vous reformuler ?';
        }
    };

    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="font-sans">
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`fixed bottom-5 right-5 px-4 py-2 rounded-full shadow-lg ${isChatOpen ? 'bg-red-500' : 'bg-blue-500 '
                    } text-white border-none cursor-pointer`}
            >
                {isChatOpen ? '✖' : '💬'}
            </button>

            {isChatOpen && (
                <div className="fixed bottom-20 right-5 w-80 bg-white border border-gray-300 rounded shadow-lg p-3 z-10">
                    <h2 className="text-xl font-bold mb-3">Chatbot Japonais</h2>
                    <div className="border border-gray-300 rounded p-3 h-72 overflow-y-scroll mb-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`my-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'
                                    }`}
                            >
                                <strong>
                                    {msg.sender === 'user' ? 'Vous' : 'Chatbot'}:
                                </strong>{' '}
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Tapez votre message..."
                            className="flex-grow px-3 py-2 mr-2 rounded border border-gray-300"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-4 py-2 rounded bg-blue-500 text-white border-none cursor-pointer"
                        >
                            Envoyer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot