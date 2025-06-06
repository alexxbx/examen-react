import { useEffect, useRef, useState } from "react";

export default function SakuraRain() {
    const containerRef = useRef(null);
    const intervalRef = useRef(null);
    const [isRaining, setIsRaining] = useState(true);

    useEffect(() => {
        if (!containerRef.current || !isRaining) return;

        intervalRef.current = setInterval(() => {
            const petal = document.createElement("img");
            petal.src = "https://cdn-icons-png.flaticon.com/512/7096/7096433.png";
            petal.className =
                "w-6 h-6 absolute animate-sakura-fall pointer-events-none";
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.top = `-40px`;
            petal.style.animationDuration = `${5 + Math.random() * 5}s`;
            containerRef.current.appendChild(petal);

            setTimeout(() => {
                petal.remove();
            }, 12000);
        }, 300);

        return () => clearInterval(intervalRef.current);
    }, [isRaining]);

    const stopRain = () => {
        clearInterval(intervalRef.current);
        setIsRaining(false);
    };

    const startRain = () => {
        setIsRaining(true);
    };

    return (
        <>
            <div
                ref={containerRef}
                className="fixed inset-0 z-10 pointer-events-none overflow-hidden"
            ></div>
            <div className="fixed bottom-4 right-4 z-50 flex gap-2">
                {isRaining ? (
                    <button
                        onClick={stopRain}
                        className="bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600 transition"
                    >
                        Stop Sakura 🌸
                    </button>
                ) : (
                    <button
                        onClick={startRain}
                        className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition"
                    >
                        Relancer 🌸
                    </button>
                )}
            </div>
        </>
    );
}
