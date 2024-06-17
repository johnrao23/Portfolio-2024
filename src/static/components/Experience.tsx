import { Card } from "./Card";
import { Section } from "./Section";
import { SimpleLayout } from "./SimpleLayout";

function ExperienceSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  );
}

function Appearance({
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

export default function Experience() {
  return (
    <SimpleLayout
      title="A Journey of Growth and Innovation: Embracing the Future of Technology"
      intro="As a software engineer, I have been on a path marked by continuous growth and innovation. From my initial projects to my recent work with Weisser, Elazar & Kantor, PLLC, I have honed my skills in developing dynamic web applications. My passion for technology and design drives me to create impactful digital experiences, and I am eager to continue developing my skills in software engineering."
    >
      <div className="space-y-20">
        <ExperienceSection title="Professional Experience">
          <Appearance
            href="https://weklaw.vercel.app"
            title="Web Developer at Weisser, Elazar & Kantor, PLLC"
            description="Designed and developed a comprehensive website using Next.js and Tailwind UI, integrated accessibility compliance, multi-language support, and live chat features. Utilized Google Analytics and Firebase/Firestore to enhance user engagement and manage user information."
            event="2024"
            cta="Visit website"
          />
          <Appearance
            href="#"
            title="Web Development Specialist at Kallijax"
            description="Led the creation of e-commerce websites, collaborated closely with software engineers and company executives, and established a business specializing in comprehensive digital marketing and web development."
            event="2018 to 2022"
            cta="Learn more"
          />
        </ExperienceSection>
        <ExperienceSection title="Projects">
          <Appearance
            href="https://www.johnrao.com"
            title="Interactive 3D Portfolio"
            description="Built a 3D interactive portfolio with Three.js and Ammo.js for real-time physics detection. Designed with a mobile-first approach and incorporated joystick functionality for mobile devices."
            event="Personal Project"
            cta="View project"
          />
          <Appearance
            href="https://www.getfairbnb.com"
            title="Fairbnb"
            description="Developed a pseudo property rental application with React and Tailwind CSS. Integrated Firebase Authentication and Firestore for secure user management and used Zustand for state management."
            event="Personal Project"
            cta="Explore Fairbnb"
          />
          <Appearance
            href="https://www.bullvsbeartrading.com"
            title="Bull vs Bear Trading"
            description="Created a pseudo stock trading application with a React frontend and Node.js backend. Utilized MongoDB for database management and Redux for global state management."
            event="Personal Project"
            cta="Try trading"
          />
        </ExperienceSection>
        <ExperienceSection title="Education">
          <Appearance
            href="#"
            title="Binghamton University"
            description="Bachelor of Science in Financial Economics. Served as President of Enactus and was appointed CEO, leading the team to top 3% nationwide and winning regional and national competitions."
            event="Binghamton, NY"
            cta="View credentials"
          />
          <Appearance
            href="#"
            title="The Odin Project"
            description="Completed a self-paced, open-source coding curriculum to acquire full-stack programming skills, applied in real-world projects focusing on HTML/CSS, JavaScript, and React."
            event="Online"
            cta="Learn more"
          />
        </ExperienceSection>
      </div>
    </SimpleLayout>
  );
}
