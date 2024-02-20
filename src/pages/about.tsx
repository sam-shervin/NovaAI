import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

function AboutUs() {
    let items = [
        {
            id: 1,
            name: "Boochi",
            designation: "UI/UX Designer",
            image: "/boogitha.png",
        },
        {
            id: 2,
            name: "Sainy Mishra",
            designation: "API Developer",
            image: "/sainy.jpeg",
        },
        {
            id: 3,
            name: "Sam Shervin S",
            designation: "ML Engineer",
            image: "/sam.jpeg",
        },
        {
            id: 4,
            name: "Varsha Krishnan",
            designation: "Web Developer",
            image: "/varsha.png",
        },
    ];

    return (
        <>
            <section className="flex flex-row items-center justify-center mb-10 w-full pt-24">
                <AnimatedTooltip items={items} />
            </section>
        </>
    );
}

export default AboutUs;
