"use client";

import React, { useEffect } from "react";

interface Props {
    speedFactor?: number;
    backgroundColor?: string;
    starColor?: [number, number, number];
    starCount?: number;
}

export default function Starfield(props: Props) {
    const {
        speedFactor = 0.05,
        backgroundColor = "black",
        starColor = [255, 255, 255],
        starCount = 5000,
    } = props;

    useEffect(() => {
        const canvas = document.getElementById(
            "starfield",
        ) as HTMLCanvasElement;

        if (canvas) {
            const c = canvas.getContext("2d");

            if (c) {
                let w = window.innerWidth;
                let h = window.innerHeight;

                const setCanvasExtents = () => {
                    canvas.width = w;
                    canvas.height = h;
                };

                setCanvasExtents();

                window.onresize = () => {
                    setCanvasExtents();
                };

                const makeStars = (count: number) => {
                    const out = [];
                    for (let i = 0; i < count; i++) {
                        const s = {
                            x: Math.random() * 1600 - 800,
                            y: Math.random() * 900 - 450,
                            z: Math.random() * 1000,
                        };
                        out.push(s);
                    }
                    return out;
                };

                let stars = makeStars(starCount);

                const clear = () => {
                    c.fillStyle = backgroundColor;
                    c.fillRect(0, 0, canvas.width, canvas.height);
                };

                const putPixel = (
                    x: number,
                    y: number,
                    brightness: number,
                    size: number,
                ) => {
                    const blur = 10;
                    const rgb =
                        "rgba(" +
                        starColor[0] +
                        "," +
                        starColor[1] +
                        "," +
                        starColor[2] +
                        "," +
                        brightness +
                        ")";
                    c.shadowColor = rgb;
                    c.shadowBlur = blur * brightness;
                    c.beginPath();
                    c.arc(x, y, size, 0, Math.PI * 2);
                    c.closePath();
                    c.fill();
                };

                let prevTime: number;
                const init = (time: number) => {
                    prevTime = time;
                    requestAnimationFrame(tick);
                };

                const tick = (time: number) => {
                    //moveStars(elapsed * speedFactor);

                    clear();

                    const cx = w / 2;
                    const cy = h / 2;

                    const count = stars.length;
                    for (var i = 0; i < count; i++) {
                        const star = stars[i];

                        const x = cx + star.x / (star.z * 0.001);
                        const y = cy + star.y / (star.z * 0.001);

                        if (x < 0 || x >= w || y < 0 || y >= h) {
                            continue;
                        }

                        const d = star.z / 350.0;
                        const b = 2 - d * d;

                        putPixel(x, y, b, 4);
                    }

                    requestAnimationFrame(tick);
                };

                requestAnimationFrame(init);

                // add window resize listener:
                window.addEventListener("resize", function () {
                    w = window.innerWidth;
                    h = window.innerHeight;
                    setCanvasExtents();
                });

                let prevX = 0;
                let prevY = 0;
                let sensitivity = 0.1;
                let vx = 0; // X-axis velocity
                let vy = 0; // Y-axis velocity
                const friction = 0.9999; // Friction factor

                const handleMouseMove = (event: MouseEvent) => {
                    const dx = event.clientX - prevX;
                    const dy = event.clientY - prevY;

                    vx = dx * sensitivity;
                    vy = dy * sensitivity;

                    prevX = event.clientX;
                    prevY = event.clientY;
                };

                const updateStars = () => {
                    for (let i = 0; i < stars.length; i++) {
                        const star = stars[i];
                        star.x += vx;
                        star.y += vy;

                        vx *= friction;
                        vy *= friction;
                    }
                };

                document.addEventListener("mousemove", handleMouseMove);

                // Update stars every frame
                const update = () => {
                    updateStars();
                    requestAnimationFrame(update);
                };

                update();

                // Clean up the event listener when the component unmounts
                return () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                };
            } else {
                console.error("Could not get 2d context from canvas element");
            }
        } else {
            console.error('Could not find canvas element with id "starfield"');
        }

        return () => {
            window.onresize = null;
        };
    }, [starColor, backgroundColor, speedFactor, starCount]);

    return (
        <canvas
            id="starfield"
            style={{
                padding: 0,
                margin: 0,
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 0,
                opacity: 1,
                pointerEvents: "none",
                mixBlendMode: "screen",
            }}
        ></canvas>
    );
}
