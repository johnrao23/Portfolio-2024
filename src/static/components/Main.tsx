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
        ...props
        }: React.ComponentPropsWithoutRef<typeof Link> & {
        icon: React.ComponentType<{ className?: string }>
        }) {
            
        return (
            <Link className="group -m-1 p-1" {...props}>
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
            <h1>Main Content</h1>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <Link to="/static/about" style={{ textDecoration: 'none' }}>
                <button>About Page</button>
            </Link>
            <Footer />
        </div>
    );
};

export default Main;
