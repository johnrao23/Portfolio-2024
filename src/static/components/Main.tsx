import React from "react";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import NavBar from "./NavBar";
import { Footer } from "./Footer";
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "./SocialIcons";
import JRThreeImg from "../assets/3dsite.png";
import image2 from './photos/image-2.jpg';
import image3 from './photos/image-3.jpg';
import image4 from './photos/image-4.jpg';
import image5 from './photos/image-5.jpg';

const Main: React.FC = () => {

    function SocialLink({
        icon: Icon,
        to, // Changed from `...props` to specifically destructuring `to`
        ariaLabel
        }: React.ComponentPropsWithoutRef<typeof Link> & {
        icon: React.ComponentType<{ className?: string }>,
        to: string, // Specify `to` prop explicitly
        ariaLabel: string
        }) {

        return (
            <Link to={to} className="group -m-1 p-1" aria-label={ariaLabel}> // Changed `href` to `to` and added `aria-label`
                <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
            </Link>
        )
    }

    function Photos() {
        const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];
        const images = [JRThreeImg, image2, image3, image4, image5];

        return (
          <div className="mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={clsx(
                    'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                    rotations[index % rotations.length],
                  )}
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
            <NavBar />
            <div className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        Software designer, founder, and amateur astronaut.
                    </h1>
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        I’m Spencer, a software designer and entrepreneur based in New York
                        City. I’m the founder and CEO of Planetaria, where we develop
                        technologies that empower regular people to explore space on their
                        own terms.
                    </p>
                    <div className="mt-6 flex gap-6">
                        <SocialLink
                            to="https://twitter.com"
                            ariaLabel="Follow on Twitter"
                            icon={TwitterIcon}
                        />
                        <SocialLink
                            to="https://instagram.com"
                            ariaLabel="Follow on Instagram"
                            icon={InstagramIcon}
                        />
                        <SocialLink
                            to="https://github.com"
                            ariaLabel="Follow on GitHub"
                            icon={GitHubIcon}
                        />
                        <SocialLink
                            to="https://linkedin.com"
                            ariaLabel="Follow on LinkedIn"
                            icon={LinkedInIcon}
                        />
                    </div>
                </div>
            </div>
            <Photos />
            <Link to="/static/about" style={{ textDecoration: 'none' }}>
                <button>About Page</button>
            </Link>
            <Footer />
        </div>
    );
};

export default Main;
