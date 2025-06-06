import React, { useState, useEffect } from 'react';
import {
    DndContext,
    useDraggable,
    useDroppable,
    DragOverlay,
} from '@dnd-kit/core';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'fr': require('date-fns/locale/fr')
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const MultipleChoice = ({ question, options, onAnswer }) => (
    <div>
        <p className="mb-4 text-lg font-semibold">{question}</p>
        <div className="flex flex-col gap-2">
            {options.map((option, index) => (
                <button
                    key={index}
                    className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
                    onClick={() => onAnswer(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

const FillInTheBlank = ({ question, answer, onAnswer }) => {
    const [input, setInput] = useState('');

    return (
        <div>
            <p className="mb-4 text-lg font-semibold">{question.replace('____', '_____')}</p>
            <input
                className="border px-2 py-1 rounded"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                className="ml-2 px-3 py-1 bg-green-100 hover:bg-green-200 rounded"
                onClick={() => onAnswer(input)}
            >
                Valider
            </button>
        </div>
    );
};

const DraggableItem = ({ id }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className="p-3 bg-pink-300 rounded shadow-lg">Sakura</div>
        </div>
    );
};

const DroppableZone = ({ id, children }) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`w-48 h-48 border-4 border-dashed rounded flex items-center justify-center transition-all duration-200 ${isOver ? 'border-green-500' : 'border-gray-400'
                }`}
        >
            {children || 'Dépose ici'}
        </div>
    );
};

const DragDrop = ({ onAnswer }) => {
    const [activeId, setActiveId] = useState(null);
    const [dropped, setDropped] = useState(false);

    const handleDragEnd = (event) => {
        const { over } = event;
        setActiveId(null);
        if (over && over.id === 'drop-zone-1') {
            setDropped(true);
        }
    };

    const validateAnswer = () => {
        if (dropped) {
            onAnswer('success');
        } else {
            onAnswer('fail');
        }
    };

    return (
        <DndContext
            onDragStart={({ active }) => setActiveId(active.id)}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-10 items-start mt-4">
                <DraggableItem id="drag-1" />
                <DroppableZone id="drop-zone-1">
                    {dropped && <span>Sakura</span>}
                </DroppableZone>
            </div>

            <DragOverlay>
                {activeId ? (
                    <div className="p-3 bg-pink-300 rounded shadow-lg">Sakura</div>
                ) : null}
            </DragOverlay>

            <button
                className="mt-4 px-4 py-2 bg-green-300 hover:bg-green-400 rounded"
                onClick={validateAnswer}
            >
                Valider
            </button>
        </DndContext>
    );
};


const getNextReviewDate = (repetition, interval, easeFactor) => {
    if (repetition === 1) return 1;
    if (repetition === 2) return 3;
    return Math.round(interval * easeFactor);
};

const scheduleNotification = (title, body, delayMs) => {
    if ('Notification' in window && Notification.permission === 'granted') {
        setTimeout(() => {
            new Notification(title, { body });
        }, delayMs);
    }
};

const Quiz = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [resultMessage, setResultMessage] = useState('');
    const [reviewPlan, setReviewPlan] = useState([]);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const steps = [
        {
            type: 'multiple',
            question: "Que signifie '見る' ?",
            options: ['Boire', 'Manger', 'Voir', 'Écrire'],
            answer: 'Voir',
        },
        {
            type: 'fill',
            question: 'Je ____ du thé.',
            answer: 'bois',
        },
        {
            type: 'drag',
        },
    ];

    const handleAnswer = (userAnswer) => {
        const step = steps[currentStep];
        let correct = false;

        if (step.answer && userAnswer.trim().toLowerCase() === step.answer.toLowerCase()) {
            correct = true;
        } else if (step.type === 'drag') {
            correct = userAnswer === 'success';
        }

        const cardId = `step-${currentStep}`;
        const existing = reviewPlan.find(c => c.id === cardId);
        let repetition = existing ? existing.repetition : 0;
        let interval = existing ? existing.interval : 0;
        let easeFactor = existing ? existing.easeFactor : 2.5;

        if (correct) {
            repetition += 1;
            interval = getNextReviewDate(repetition, interval, easeFactor);
            easeFactor = Math.max(1.3, easeFactor - 0.15 + 0.1 * (5 - 0));
        } else {
            repetition = 0;
            interval = 1;
            easeFactor = Math.max(1.3, easeFactor - 0.2);
        }

        const nextReviewDate = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);
        const delayMs = nextReviewDate.getTime() - Date.now();
        scheduleNotification(`Révision : ${cardId}`, `C'est le moment de réviser ${cardId}`, delayMs);

        const updatedCard = { id: cardId, repetition, interval, easeFactor, nextReviewDate };
        setReviewPlan((prev) => [...prev.filter(c => c.id !== cardId), updatedCard]);

        setResultMessage(correct ? 'Bonne réponse !' : 'Mauvaise réponse.');
        setTimeout(() => {
            setCurrentStep(currentStep + 1);
            setResultMessage('');
        }, 1500);
    };

    const current = steps[currentStep];

    const events = reviewPlan.map((card) => ({
        title: `Révision : ${card.id}`,
        start: new Date(card.nextReviewDate),
        end: new Date(card.nextReviewDate),
    }));

    return (

        <div className="p-6 bg-white rounded shadow max-w-xl mx-auto mt-10">
            <div className="w-full bg-gray-200 h-2 rounded mt-4">
                <div className="h-full bg-blue-500 rounded" style={{ width: `${(currentStep / steps.length) * 100}%` }}></div>
            </div>

            {current ? (
                <>
                    {current.type === 'multiple' && (
                        <MultipleChoice
                            question={current.question}
                            options={current.options}
                            onAnswer={handleAnswer}
                        />
                    )}
                    {current.type === 'fill' && (
                        <FillInTheBlank
                            question={current.question}
                            answer={current.answer}
                            onAnswer={handleAnswer}
                        />
                    )}
                    {current.type === 'drag' && <DragDrop onAnswer={handleAnswer} />}
                    {resultMessage && (
                        <p className={`mt-4 font-semibold ${resultMessage.includes('Bonne') ? 'text-green-600' : 'text-red-600'}`}>
                            {resultMessage}
                        </p>
                    )}
                </>
            ) : (
                <div>
                    <p className="text-center text-xl font-bold">Quiz terminé !</p>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Plan de révision :</h3>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 400 }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;