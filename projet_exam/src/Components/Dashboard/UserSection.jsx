import React, { useState } from 'react';

function UserSection({ users, onAddUser, onDeleteUser, onUpdateUser }) {
    const [editingUserId, setEditingUserId] = useState(null);
    const [formData, setFormData] = useState({});
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        roles: 'ROLE_USER',
        password: ''
    });

    console.log('Users dans UserSection:', users);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNewUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = async () => {
        const success = await onAddUser(newUser);
        if (success) {
            setNewUser({ username: '', email: '', roles: 'ROLE_USER', password: '' });
        }
    };

    const handleUpdateUser = async (userId) => {
        const success = await onUpdateUser(userId, formData);
        if (success) {
            setEditingUserId(null);
            setFormData({});
        }
    };

    return (
        <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Utilisateurs</h2>

            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="font-semibold mb-2">Ajouter un utilisateur</h3>
                <div className="flex flex-col gap-2">
                    <input
                        name="username"
                        className="border p-2"
                        placeholder="Nom d'utilisateur"
                        value={newUser.username}
                        onChange={handleNewUserChange}
                    />
                    <input
                        name="email"
                        className="border p-2"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleNewUserChange}
                    />
                    <input
                        name="password"
                        type="password"
                        className="border p-2"
                        placeholder="Mot de passe"
                        value={newUser.password}
                        onChange={handleNewUserChange}
                    />
                    <select
                        name="roles"
                        className="border p-2"
                        value={newUser.roles}
                        onChange={handleNewUserChange}
                    >
                        <option value="ROLE_USER">Utilisateur</option>
                        <option value="ROLE_ADMIN">Administrateur</option>
                    </select>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAddUser}
                    >
                        Ajouter
                    </button>
                </div>
            </div>

            <ul className="space-y-4">
                {Array.isArray(users) && users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id} className="bg-white shadow p-4 rounded-lg">
                            {editingUserId === user.id ? (
                                <div className="space-y-2">
                                    <input
                                        name="username"
                                        className="border p-2 w-full"
                                        defaultValue={user.username}
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="email"
                                        className="border p-2 w-full"
                                        defaultValue={user.email}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="roles"
                                        className="border p-2 w-full"
                                        defaultValue={Array.isArray(user.roles) ? user.roles[0] : user.roles}
                                        onChange={handleChange}
                                    >
                                        <option value="ROLE_USER">Utilisateur</option>
                                        <option value="ROLE_ADMIN">Administrateur</option>
                                    </select>
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleUpdateUser(user.id)}
                                        >
                                            Valider
                                        </button>
                                        <button
                                            className="bg-gray-400 text-white px-4 py-2 rounded"
                                            onClick={() => setEditingUserId(null)}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="font-semibold">{user.username}</h3>
                                        <p className="text-gray-600">{user.email}</p>
                                        <p className="text-sm text-gray-500">
                                            Rôles: {Array.isArray(user.roles) ? user.roles.join(', ') : user.roles}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Créé le: {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 mt-2 md:mt-0">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => setEditingUserId(user.id)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() => onDeleteUser(user.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="bg-white shadow p-4 rounded-lg text-center text-gray-500">
                        Aucun utilisateur trouvé
                    </li>
                )}
            </ul>
        </section>
    );
}

export default UserSection; 