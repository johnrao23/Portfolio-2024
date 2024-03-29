import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { Container } from "./Container";
import { GitHubIcon, GalaxyIcon, LinkedInIcon, XIcon } from "./SocialIcons";
import JRThreeImg from "../assets/3dsite.png";
import FairbnbImg from "../assets/fairbnb.png";
import LNImg from "../assets/LucasNoahPic.jpeg";
import NYCImg from "../assets/NYC.png"
import SDImg from "../assets/DeskSetup.webp"

const Main: React.FC = () => {

    function SocialLink({
        icon: Icon,
        to,
        ariaLabel,
        ...iconProps
        }: React.ComponentPropsWithoutRef<typeof Link> & {
        icon: React.ComponentType<{ className?: string }>,
        to: string,
        ariaLabel: string
        }) {

        return (
            <Link to={to} className="group -m-1 p-1" aria-label={ariaLabel}>
                <Icon {...iconProps} className={clsx("h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300", iconProps.className)} />
            </Link>
        )
    }

    function Photos() {
        const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];
        const images = [SDImg, FairbnbImg, JRThreeImg, NYCImg, LNImg];
        const containerRef = useRef<HTMLDivElement>(null);
    
        useEffect(() => {
            if (containerRef.current) {
                const container = containerRef.current;
                const firstChild = container.firstChild as HTMLElement;
                const childWidth = firstChild.offsetWidth;
                const scrollTo = childWidth * 2.3;
                container.scrollLeft = scrollTo - (container.offsetWidth / 2) + (childWidth / 2);
            }
        }, []);
    
        return (
            <div className="mt-16 sm:mt-20">
                <div
                    ref={containerRef}
                    className="flex flex-nowrap justify-start sm:justify-center gap-5 overflow-x-auto py-4 sm:gap-8 -my-4 sm:overflow-hidden"
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl ${rotations[index % rotations.length]}`}
                        >
                            <img
                                src={image}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <Container className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        Software designer, founder, and adventure enthusiast.
                    </h1>
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        I’m John, a software designer and entrepreneur based in New York. 
                        I’m the founder and CEO of Kallijax, where we develop
                        technologies that empower people to explore the world on their
                        own terms.
                    </p>
                    <div className="mt-6 flex gap-6">
                        <SocialLink
                            to="https://www.johnrao.com"
                            ariaLabel="Check out my 3d site"
                            icon={GalaxyIcon}
                        />
                        <SocialLink
                            to="https://www.linkedin.com/in/john-rao"
                            ariaLabel="Follow on LinkedIn"
                            icon={LinkedInIcon}
                        />
                        <SocialLink
                            to="https://github.com/johnrao23"
                            ariaLabel="Follow on GitHub"
                            icon={GitHubIcon}
                        />
                        <SocialLink
                            to="https://twitter.com/0xRao"
                            ariaLabel="Follow on Twitter"
                            icon={XIcon}
                        />
                    </div>
                </div>
            </Container>
            <Photos />
        </div>
    );
};

export default Main;
