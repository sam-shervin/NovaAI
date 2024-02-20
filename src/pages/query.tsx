import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

const Query = () => {
    const [animationData, setAnimationData] = useState(null);
    const [textAreaValue, setTextAreaValue] = useState("");
    const [responseData, setResponseData] = useState({});
    let login = false;
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
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://192.168.23.127:3001/${textAreaValue}`,
                {
                    headers: {
                        "User-Agent": "My Custom User Agent",
                    },
                },
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleButtonClick = () => {
        fetchData();
    };

    const handleTextAreaChange = (event: any) => {
        setTextAreaValue(event.target.value);
    };
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center">
                <div className="gradient-btn border-blue-500 border font-bold py-2 px-6 rounded-3xl mt-6 w-[760px] h-[338px] backdrop-blur-sm bg-[#08282c53]">
                    {/* Your content input box goes here */}
                    <textarea
                        className="p-12 w-full h-full resize-none"
                        style={{
                            border: "none",
                            outline: "none",
                            background: "transparent",
                        }}
                        onChange={handleTextAreaChange}
                        placeholder={
                            "Sketch your Day:\nBusy Hustle, Blissful Breaks, and Repeat"
                        }
                    ></textarea>
                </div>
                <button
                    className="gradient-btn border text-white font-bold py-2 px-6 rounded-3xl mt-6 flex items-center border-blue-500"
                    onClick={handleButtonClick}
                >
                    Craft your perfect schedule
                </button>
            </div>
        </div>
    );
};

export default Query;
