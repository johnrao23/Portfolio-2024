import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Container } from "./Container";
import {
  XIcon,
  GitHubIcon,
  GalaxyIcon,
  LinkedInIcon,
  MailIcon,
} from "./SocialIcons";
import AvatarImg from "../assets/AvatarImg.jpg";
import CartoonAvi from "../assets/CartoonAvi.webp";

const About: React.FC = () => {
  function SocialLink({
    className,
    to,
    children,
    icon: Icon,
  }: {
    className?: string;
    to: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
  }) {
    return (
      <li className={clsx(className, "flex")}>
        <Link
          to={to}
          className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
        >
          <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
          <span className="ml-4">{children}</span>
        </Link>
      </li>
    );
  }

  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <img
                src={CartoonAvi}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m John Rao. I live in New York, where I design the future.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I've always had a fascination with technology from a young age,
                though I never imagined myself working in tech. Growing up, my
                environment steered me towards a career in business, so I
                pursued a degree in Financial Economics and embarked on a
                business career. However, I never felt truly satisfied.
              </p>
              <p>
                It wasn't until a close friend, who had also started in
                business, transitioned to a career in software engineering and
                encouraged me to give it a try. He provided me with resources to
                begin learning HTML, CSS, and JavaScript, and I quickly fell in
                love with coding. The idea that I could change the world through
                technology as a software engineer ignited a newfound passion in
                me.
              </p>
              <p>
                During the early stages of my business career, I realized that
                finance and marketing didn't challenge me in the way I craved. I
                yearned to make a deeper impact on the world with a more diverse
                set of skills. This led me to start my own business, Kallijax,
                LLC, focusing on providing marketing and web development
                services to startups. This venture allowed me to immerse myself
                in the tech world, gain connections with web developers, and
                learn more about their work.
              </p>
              <p>
                Determined to transition fully into tech, I dedicated myself to
                learning web development full-time. This journey led me to my
                first official role as a web developer, where I designed and
                developed a website from scratch for a major law firm in
                Florida. This achievement solidified my passion for my new
                career path.
              </p>
              <p>
                Today, I am driven and motivated by the possibilities that a
                career in tech offers. I always wanted to do something I loved
                in life, and becoming a software engineer has been a dream come
                true. I'm excited to see how far this path will take me and the
                impact I can make along the way.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                to="https://www.linkedin.com/in/john-rao"
                icon={LinkedInIcon}
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                to="https://github.com/johnrao23"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                to="https://twitter.com/0xRao"
                icon={XIcon}
                className="mt-4"
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                to="mailto:johnrao23@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                johnrao23@gmail.com
              </SocialLink>
              <SocialLink
                to="https://www.johnrao.com"
                icon={GalaxyIcon}
                className="mt-4"
              >
                Check out my 3D Site
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
