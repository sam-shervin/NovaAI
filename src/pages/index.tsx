import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import { FcGoogle } from "react-icons/fc";
import { CSSTransition } from "react-transition-group";
import Router from "next/router";

const App = () => {
    const [animationData, setAnimationData] = useState(null);
    const [showSecondScreen, setShowSecondScreen] = useState(false);

    useEffect(() => {
        const fetchAnimationData = async () => {
            try {
                const response = await fetch(
                    "https://lottie.host/f8d7262c-ca4b-44a9-a184-e712047d14ef/0Fm4CD0NUr.json",
                );
                const data = await response.json();
                setAnimationData(data);
            } catch (error) {
                console.error("Error fetching animation data:", error);
            }
        };

        fetchAnimationData();
        const timer = setTimeout(() => setShowSecondScreen(true), 4000);
        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <>
            <CSSTransition
                in={!showSecondScreen}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <section className="flex items-center justify-center h-screen">
                    <section className="">
                        <Lottie
                            options={defaultOptions}
                            height={286}
                            width={350}
                        />
                        <section className="text-white text-center mt-2 text-4xl">
                            NOVA
                        </section>
                    </section>
                </section>
            </CSSTransition>
            <CSSTransition
                in={showSecondScreen}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <div className="flex flex-col items-center pb-24 justify-center h-screen">
                    <div className="flex items-center">
                        {animationData && (
                            <Lottie
                                options={defaultOptions}
                                height={253}
                                width={200}
                            />
                        )}
                        <div className="text-white text-center mt-4 ml-10 text-4xl ">
                            NOVA
                        </div>
                    </div>
                    <div className="text-white text-center mt-2 mb-2 text-2xl">
                        Plan your day!
                    </div>
                    <div className="text-white text-center mt-2 mb-2 text-2xl">
                        Busy blocks and blank spaces
                    </div>
                    <button
                        onClick={() => Router.push("/query")}
                        className="gradient-btn border-blue-500 border text-white font-bold py-2 px-6 rounded-3xl mt-6 flex items-center"
                    >
                        <FcGoogle className="mr-2" /> Sign in with Google
                    </button>
                </div>
            </CSSTransition>
        </>
    );
};

export default App;
