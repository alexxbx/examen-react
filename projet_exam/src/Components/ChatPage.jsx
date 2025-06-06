import React, { useState } from 'react';

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { sender: 'Alice', text: 'Salut !' },
        { sender: 'Bob', text: 'Hey, comment ça va ?' },
    ]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [isNamed, setIsNamed] = useState(false);

    const sendMessage = () => {
        if (input.trim() === '') return;
        const newMessage = { sender: username, text: input.trim() };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
            {!isNamed ? (
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Entrez votre pseudo pour commencer</h2>
                    <input
                        className="border px-3 py-2 rounded"
                        type="text"
                        placeholder="Votre pseudo"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => username.trim() && setIsNamed(true)}
                    >
                        Rejoindre le chat
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4">Discussion en ligne</h2>
                    <div className="h-64 overflow-y-auto border rounded p-4 mb-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`mb-2 ${msg.sender === username ? 'text-right' : 'text-left'}`}
                            >
                                <span className="font-semibold">{msg.sender}</span> : {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border px-3 py-2 rounded"
                            placeholder="Écrire un message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Envoyer
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatPage;
