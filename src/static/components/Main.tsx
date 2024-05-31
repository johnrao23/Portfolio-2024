import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Container } from "./Container";
import { Button } from "./Button";
import { GitHubIcon, GalaxyIcon, LinkedInIcon, XIcon } from "./SocialIcons";
import { BriefcaseIcon, ArrowDownIcon, MailIcon } from "./MiscIcons";
import { kallijaxLogo, samsLogo, tsLogo, wekLogo } from "./WorkLogos";
import JRThreeImg from "../assets/3dsite.png";
import FairbnbImg from "../assets/fairbnb.png";
import LNImg from "../assets/LucasNoahPic.jpeg";
import NYCImg from "../assets/NYC.png";
import SDImg from "../assets/DeskSetup.webp";
import resumePDF from "../assets/Resume2024.pdf";
import { Card } from "./Card";

const Main: React.FC = () => {
  function SocialLink({
    icon: Icon,
    to,
    ariaLabel,
    ...iconProps
  }: React.ComponentPropsWithoutRef<typeof Link> & {
    icon: React.ComponentType<{ className?: string }>;
    to: string;
    ariaLabel: string;
  }) {
    return (
      <Link to={to} className="group -m-1 p-1" aria-label={ariaLabel}>
        <Icon
          {...iconProps}
          className={clsx(
            "h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300",
            iconProps.className,
          )}
        />
      </Link>
    );
  }

  function ContactEmail() {
    return (
      <form
        action="/thank-you"
        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <MailIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Get in touch!</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          I'd be thrilled to connect and explore potential opportunities for
          collaboration together!
        </p>
        <div className="mt-6 flex">
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
          />
          <Button type="submit" className="ml-4 flex-none">
            Connect
          </Button>
        </div>
      </form>
    );
  }
  const LogoComponents: {
    [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  } = {
    "Wek Law": wekLogo,
    Kallijax: kallijaxLogo,
    "Terp Solutions": tsLogo,
    "Sam's Club": samsLogo,
  };

  interface RoleProps {
    role: {
      company: string;
      title: string;
      logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      start: string | { label: string; dateTime: string };
      end: string | { label: string; dateTime: string };
    };
  }

  function Role({ role }: RoleProps) {
    const LogoComponent = LogoComponents[role.company];
    let startLabel =
      typeof role.start === "string" ? role.start : role.start.label;
    let startDate =
      typeof role.start === "string" ? role.start : role.start.dateTime;

    let endLabel = typeof role.end === "string" ? role.end : role.end.label;
    let endDate = typeof role.end === "string" ? role.end : role.end.dateTime;

    return (
      <li className="flex gap-4">
        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          {LogoComponent && <LogoComponent className="h-7 w-7" />}
        </div>
        <dl className="flex flex-auto flex-wrap gap-x-2">
          <dt className="sr-only">Company</dt>
          <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {role.company}
          </dd>
          <dt className="sr-only">Role</dt>
          <dd className="text-xs text-zinc-500 dark:text-zinc-400">
            {role.title}
          </dd>
          <dt className="sr-only">Date</dt>
          <dd
            className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
            aria-label={`${startLabel} until ${endLabel}`}
          >
            <time dateTime={startDate}>{startLabel}</time>{" "}
            <span aria-hidden="true">—</span>{" "}
            <time dateTime={endDate}>{endLabel}</time>
          </dd>
        </dl>
      </li>
    );
  }

  function Resume() {
    const handleDownload = () => {
      window.open(resumePDF, "_blank");
    };

    let resume = [
      {
        company: "Wek Law",
        title: "Web Developer",
        logo: wekLogo,
        start: "2024",
        end: {
          label: "Present",
          dateTime: new Date().getFullYear().toString(),
        },
      },
      {
        company: "Kallijax",
        title: "Web Designer",
        logo: kallijaxLogo,
        start: "2018",
        end: "2023",
      },
      {
        company: "Terp Solutions",
        title: "Marketing Specialist",
        logo: tsLogo,
        start: "2019",
        end: "2020",
      },
      {
        company: "Sam's Club",
        title: "Marketing Manager",
        logo: samsLogo,
        start: "2016",
        end: "2019",
      },
    ];

    return (
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Work</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {resume.map((role, roleIndex) => (
            <Role key={roleIndex} role={role} />
          ))}
        </ol>
        <Button
          onClick={handleDownload}
          variant="secondary"
          className="group mt-6 w-full"
        >
          Download CV
          <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        </Button>
      </div>
    );
  }

  function Photos() {
    const rotations = [
      "rotate-2",
      "-rotate-2",
      "rotate-2",
      "rotate-2",
      "-rotate-2",
    ];
    const images = [SDImg, FairbnbImg, JRThreeImg, NYCImg, LNImg];
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const firstChild = container.firstChild as HTMLElement;
        const childWidth = firstChild.offsetWidth;
        const scrollTo = childWidth * 2.3;
        container.scrollLeft =
          scrollTo - container.offsetWidth / 2 + childWidth / 2;
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
              className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl ${
                rotations[index % rotations.length]
              }`}
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

  function SpeakingSection({
    title,
    description,
    event,
    cta,
    href,
  }: {
    title: string;
    description: string;
    event: string;
    cta: string;
    href: string;
  }) {
    return (
      <Card as="article">
        <Card.Title as="h3" href={href}>
          {title}
        </Card.Title>
        <Card.Eyebrow decorate>{event}</Card.Eyebrow>
        <Card.Description>{description}</Card.Description>
        <Card.Cta>{cta}</Card.Cta>
      </Card>
    );
  }

  function Speaking() {
    return (
      <div className="space-y-20">
        <SpeakingSection
          href="https://www.weklaw.com"
          title="Web Developer at Weisser, Elazar & Kantor, PLLC"
          description="Designed and developed a comprehensive website from scratch using Next.js, styled with Tailwind UI for a modern and responsive user experience."
          event="2024"
          cta="Visit website"
        />
        <SpeakingSection
          href="https://www.getfairbnb.com"
          title="Fairbnb"
          description="Developed a pseudo property rental application with React and Tailwind CSS, integrated Firebase Authentication for secure user management, and enhanced user interaction by integrating the ChatGPT API."
          event="Personal Project"
          cta="Explore Fairbnb"
        />
        <SpeakingSection
          href="https://www.bullvsbeartrading.com"
          title="Bull vs Bear Trading"
          description="Created a pseudo stock trading application with a React frontend and Node.js backend, using MongoDB for database management and Redux for global state management."
          event="Personal Project"
          cta="Try trading"
        />
      </div>
    );
  }

  return (
    <div>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software developer, founder, and adventure enthusiast.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m John, a software developer based in New York. With a passion for
            creating dynamic web applications, I specialize in frontend
            development and hope to continue contributing to impactful projects
            with a passionate team.
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
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <Speaking />
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <ContactEmail />
            <Resume />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Main;
