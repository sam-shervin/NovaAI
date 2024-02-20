import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

const Header = ({ login }: { login: any }) => {
    const [animationData, setAnimationData] = useState(null);

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
            <div className="flex items-center fixed top-0 left-0 mt-[-10px] ml-2">
                <Lottie options={defaultOptions} height={100} width={100} />
                <div className="text-white mt-4 ml-2 text-4xl">NOVA</div>
            </div>
            <div className="fixed top-5 right-5">
                {login ? (
                    <img
                        src="/hat.png"
                        alt="Description of the image"
                        width={50}
                        height={50}
                    />
                ) : null}
            </div>
        </>
    );
};

export default Header;
