"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
    placeholders,
    onChange,
    onSubmit
}) {
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

    const intervalRef = useRef(null);
    const startAnimation = () => {
        intervalRef.current = setInterval(() => {
            setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
        }, 3000);
    };
    const handleVisibilityChange = () => {
        if (document.visibilityState !== "visible" && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        } else if (document.visibilityState === "visible") {
            startAnimation();
        }
    };

    useEffect(() => {
        startAnimation();
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [placeholders]);

    const canvasRef = useRef(null);
    const newDataRef = useRef([]);
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
    const [animating, setAnimating] = useState(false);

    const draw = useCallback(() => {
        if (!inputRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 800;
        canvas.height = 800;
        ctx.clearRect(0, 0, 800, 800);
        const computedStyles = getComputedStyle(inputRef.current);

        const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
        ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
        ctx.fillStyle = "#FFF";
        
        // Handle multiline text for canvas
        const lines = value.split('\n');
        lines.forEach((line, index) => {
            ctx.fillText(line, 16, 40 + (index * fontSize * 2.5));
        });

        const imageData = ctx.getImageData(0, 0, 800, 800);
        const pixelData = imageData.data;
        const newData = [];

        for (let t = 0; t < 800; t++) {
            let i = 4 * t * 800;
            for (let n = 0; n < 800; n++) {
                let e = i + 4 * n;
                if (
                    pixelData[e] !== 0 &&
                    pixelData[e + 1] !== 0 &&
                    pixelData[e + 2] !== 0
                ) {
                    newData.push({
                        x: n,
                        y: t,
                        color: [
                            pixelData[e],
                            pixelData[e + 1],
                            pixelData[e + 2],
                            pixelData[e + 3],
                        ],
                    });
                }
            }
        }

        newDataRef.current = newData.map(({ x, y, color }) => ({
            x,
            y,
            r: 1,
            color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
        }));
    }, [value]);

    useEffect(() => {
        draw();
    }, [value, draw]);

    const animate = (start) => {
        const animateFrame = (pos = 0) => {
            requestAnimationFrame(() => {
                const newArr = [];
                for (let i = 0; i < newDataRef.current.length; i++) {
                    const current = newDataRef.current[i];
                    if (current.x < pos) {
                        newArr.push(current);
                    } else {
                        if (current.r <= 0) {
                            current.r = 0;
                            continue;
                        }
                        current.x += Math.random() > 0.5 ? 1 : -1;
                        current.y += Math.random() > 0.5 ? 1 : -1;
                        current.r -= 0.05 * Math.random();
                        newArr.push(current);
                    }
                }
                newDataRef.current = newArr;
                const ctx = canvasRef.current?.getContext("2d");
                if (ctx) {
                    ctx.clearRect(pos, 0, 800, 800);
                    newDataRef.current.forEach((t) => {
                        const { x: n, y: i, r: s, color: color } = t;
                        if (n > pos) {
                            ctx.beginPath();
                            ctx.rect(n, i, s, s);
                            ctx.fillStyle = color;
                            ctx.strokeStyle = color;
                            ctx.stroke();
                        }
                    });
                }
                if (newDataRef.current.length > 0) {
                    animateFrame(pos - 8);
                } else {
                    setValue("");
                    setAnimating(false);
                }
            });
        };
        animateFrame(start);
    };

    const handleKeyDown = (e) => {
        // Allow Shift+Enter for new line, Enter alone submits
        if (e.key === "Enter" && !e.shiftKey && !animating) {
            e.preventDefault();
            vanishAndSubmit();
        }
    };

    const vanishAndSubmit = () => {
        setAnimating(true);
        draw();

        const value = inputRef.current?.value || "";
        if (value && inputRef.current) {
            const maxX = newDataRef.current.reduce((prev, current) => (current.x > prev ? current.x : prev), 0);
            animate(maxX);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        vanishAndSubmit();
        onSubmit && onSubmit(e);
    };

    // Auto-resize textarea
    const handleTextareaResize = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
        }
    }, []);

    useEffect(() => {
        handleTextareaResize();
    }, [value, handleTextareaResize]);

    return (
        <form
            className={cn(
                "w-full relative max-w-xl mx-auto bg-[#161716] min-h-12 rounded-2xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
                value && "rounded-2xl"
            )}
            onSubmit={handleSubmit}>
            <canvas
                className={cn(
                    "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
                    !animating ? "opacity-0" : "opacity-100"
                )}
                ref={canvasRef} />
            <textarea
                onChange={(e) => {
                    if (!animating) {
                        setValue(e.target.value);
                        onChange && onChange(e);
                    }
                }}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                value={value}
                rows={4}
                placeholder=""
                className={cn(
                    "w-full resize-none text-sm sm:text-base z-50 border-none bg-transparent text-white rounded-2xl focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20 py-3 sm:py-4 h-28 overflow-y-auto scrollbar-hide",
                    animating && "text-transparent"
                )}
                style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            />

            <button
                disabled={!value}
                type="submit"
                className="absolute right-4 top-12 z-50 h-8 w-8 rounded-full  disabled:bg-zinc-950 bg-black dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center">
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-300 h-4 w-4">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <motion.path
                        d="M5 12l14 0"
                        initial={{
                            strokeDasharray: "50%",
                            strokeDashoffset: "50%",
                        }}
                        animate={{
                            strokeDashoffset: value ? 0 : "50%",
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "linear",
                        }} />
                    <path d="M13 18l6 -6" />
                    <path d="M13 6l6 6" />
                </motion.svg>
            </button>
            <div
                className="absolute inset-0 flex items-center rounded-2xl pointer-events-none">
                <AnimatePresence mode="wait">
                    {!value && (
                        <motion.p
                            initial={{
                                y: 5,
                                opacity: 0,
                            }}
                            key={`current-placeholder-${currentPlaceholder}`}
                            animate={{
                                y: 0,
                                opacity: 1,
                            }}
                            exit={{
                                y: -15,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "linear",
                            }}
                            className="text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate">
                            {placeholders[currentPlaceholder]}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </form>
    );
}