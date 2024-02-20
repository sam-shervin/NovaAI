import "@/styles/globals.css";
import "@/styles/App.css";
import type { AppProps } from "next/app";
import Starfield from "@/components/background/stars";
import Header from "@/components/ui/header";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header login={false} />
            <Starfield
                starCount={900}
                starColor={[255, 255, 255]}
                speedFactor={0.05}
                backgroundColor="rgba(0,0,30,240)"
            />
            <Component {...pageProps} />
        </>
    );
}
