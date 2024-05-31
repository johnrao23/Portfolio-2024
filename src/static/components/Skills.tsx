import { Card } from "./Card";
import { Section } from "./Section";
import { SimpleLayout } from "./SimpleLayout";

function SkillsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  );
}

function Skill({
  title,
  description,
  examples,
}: {
  title: string;
  description: string;
  examples: string[];
}) {
  return (
    <Card as="article">
      <Card.Title as="h3">{title}</Card.Title>
      <Card.Description>
        {description}
        <ul className="list-disc ml-5 mt-2">
          {examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      </Card.Description>
    </Card>
  );
}

export default function Skills() {
  return (
    <SimpleLayout
      title="Showcasing Technical Expertise through Real-World Applications"
      intro="Throughout my journey as a software engineer, I have acquired and honed a diverse set of technical skills. From frontend and backend development to creating interactive 3D experiences, I have applied these skills across various projects to deliver impactful digital solutions. Here are some highlights of my technical skills and projects."
    >
      <div className="space-y-20">
        <SkillsSection title="Technical Skills">
          <Skill
            title="Frontend Development"
            description="Expertise in building dynamic and responsive user interfaces."
            examples={[
              "Used React and Next.js to develop complex UIs for web applications.",
              "Styled components using Tailwind CSS and Bootstrap for consistent design.",
              "Implemented state management with Redux and Zustand for efficient application state handling.",
            ]}
          />
          <Skill
            title="Backend Development"
            description="Skilled in developing and maintaining server-side applications."
            examples={[
              "Developed RESTful APIs with Node.js and Express to handle client-server communication.",
              "Managed databases using MongoDB, ensuring efficient data storage and retrieval.",
              "Utilized Firebase for backend services including authentication and real-time databases.",
            ]}
          />
          <Skill
            title="3D Graphics and Interactive Design"
            description="Proficient in creating interactive 3D web experiences."
            examples={[
              "Built a 3D portfolio using Three.js and Ammo.js for real-time physics detection.",
              "Designed with a mobile-first approach, incorporating joystick functionality for mobile devices.",
            ]}
          />
        </SkillsSection>
        <SkillsSection title="Project Highlights">
          <Skill
            title="Web Developer at WEK Law"
            description="Designed and developed a comprehensive website for Weisser, Elazar & Kantor, PLLC."
            examples={[
              "Built from scratch using Next.js and styled with Tailwind UI for a modern and responsive user experience.",
              "Integrated essential functionalities such as accessibility compliance, multi-language support using Crowdin and i18n, and live chat features to enhance user engagement.",
              "Implemented Google Analytics to measure user engagement and utilized Firebase/Firestore to manage user information.",
            ]}
          />
          <Skill
            title="Fairbnb"
            description="A pseudo property rental application with advanced features."
            examples={[
              "Developed user interfaces with React and Tailwind CSS for a seamless user experience.",
              "Integrated Firebase Authentication for secure user login and management.",
              "Implemented state management using Zustand for optimized performance.",
              "Enhanced user interaction by integrating the ChatGPT API, allowing users to ask and receive answers to any questions.",
            ]}
          />
          <Skill
            title="Bull vs Bear Trading"
            description="A stock trading application with comprehensive functionalities."
            examples={[
              "Developed a full-stack application with a React frontend and Node.js backend.",
              "Utilized MongoDB for storing and managing user and stock data.",
              "Implemented Redux for global state management ensuring consistent application state.",
            ]}
          />
        </SkillsSection>
      </div>
    </SimpleLayout>
  );
}
