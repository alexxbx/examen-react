import React, { useState } from 'react';

function ExerciseSection({ exercises, lessons, onAddExercise, onDeleteExercise, onUpdateExercise }) {
    const [editingExerciseId, setEditingExerciseId] = useState(null);
    const [formData, setFormData] = useState({});
    const [newExercise, setNewExercise] = useState({
        question: '',
        type: 'qcm',
        options: '',
        answer: '',
        lesson: ''
    });

    console.log('Exercises dans ExerciseSection:', exercises);
    console.log('Lessons dans ExerciseSection:', lessons);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNewExerciseChange = (e) => {
        setNewExercise({ ...newExercise, [e.target.name]: e.target.value });
    };

    const handleAddExercise = async () => {
        const success = await onAddExercise(newExercise);
        if (success) {
            setNewExercise({ question: '', type: 'qcm', options: '', answer: '', lesson: '' });
        }
    };

    const handleUpdateExercise = async (exerciseId) => {
        const success = await onUpdateExercise(exerciseId, formData);
        if (success) {
            setEditingExerciseId(null);
            setFormData({});
        }
    };

    return (
        <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Exercices</h2>

            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="font-semibold mb-2">Ajouter un exercice</h3>
                <div className="flex flex-col gap-2">
                    <input
                        name="question"
                        className="border p-2"
                        placeholder="Question"
                        value={newExercise.question}
                        onChange={handleNewExerciseChange}
                    />
                    <select
                        name="type"
                        className="border p-2"
                        value={newExercise.type}
                        onChange={handleNewExerciseChange}
                    >
                        <option value="qcm">QCM</option>
                        <option value="texte">Texte libre</option>
                    </select>
                    <textarea
                        name="options"
                        className="border p-2"
                        placeholder="Options (une par ligne pour QCM)"
                        value={newExercise.options}
                        onChange={handleNewExerciseChange}
                        rows="4"
                    />
                    <input
                        name="answer"
                        className="border p-2"
                        placeholder="Réponse"
                        value={newExercise.answer}
                        onChange={handleNewExerciseChange}
                    />
                    <select
                        name="lesson"
                        className="border p-2"
                        value={newExercise.lesson}
                        onChange={handleNewExerciseChange}
                    >
                        <option value="">Sélectionner une leçon</option>
                        {Array.isArray(lessons) && lessons.map(lesson => (
                            <option key={lesson.id} value={lesson.id}>
                                {lesson.title}
                            </option>
                        ))}
                    </select>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAddExercise}
                    >
                        Ajouter
                    </button>
                </div>
            </div>

            <ul className="space-y-4">
                {Array.isArray(exercises) && exercises.length > 0 ? (
                    exercises.map(exercise => (
                        <li key={exercise.id} className="bg-white shadow p-4 rounded-lg">
                            {editingExerciseId === exercise.id ? (
                                <div className="space-y-2">
                                    <input
                                        name="question"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.question}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="type"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.type}
                                        onChange={handleChange}
                                    >
                                        <option value="qcm">QCM</option>
                                        <option value="texte">Texte libre</option>
                                    </select>
                                    <textarea
                                        name="options"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.options}
                                        onChange={handleChange}
                                        rows="4"
                                    />
                                    <input
                                        name="answer"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.answer}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="lesson"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.lesson?.id || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Sélectionner une leçon</option>
                                        {Array.isArray(lessons) && lessons.map(lesson => (
                                            <option key={lesson.id} value={lesson.id}>
                                                {lesson.title}
                                            </option>
                                        ))}
                                    </select>
                                    <textarea
                                        name="cours"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.cours}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Explication / Cours (optionnel)"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleUpdateExercise(exercise.id)}
                                        >
                                            Valider
                                        </button>
                                        <button
                                            className="bg-gray-400 text-white px-4 py-2 rounded"
                                            onClick={() => setEditingExerciseId(null)}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="font-semibold">{exercise.question}</h3>
                                        <p className="text-gray-600 mt-2">
                                            Type: {exercise.type}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Options: {exercise.options}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Réponse: {exercise.answer}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Leçon: {exercise.lesson?.title || 'Non assignée'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Explication : {exercise.cours}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 mt-2 md:mt-0">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => setEditingExerciseId(exercise.id)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() => onDeleteExercise(exercise.id)}
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
                        Aucun exercice trouvé
                    </li>
                )}
            </ul>
        </section>
    );
}

export default ExerciseSection; 
