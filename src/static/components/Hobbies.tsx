import { Card } from "./Card";
import { Section } from "./Section";
import { SimpleLayout } from "./SimpleLayout";

function HobbiesSection({
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
  href?: string;
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

export default function Hobbies() {
  return (
    <SimpleLayout
      title="Exploring My Interests and Passions"
      intro="Outside of work, I have a variety of interests that keep me engaged and inspired. I am passionate about learning how cryptocurrency will impact the future and change people's lives. Below are three articles I feel strongly about. As well as crypto, I also enjoy spending time with my beautiful family and playing sports to stay active."
    >
      <div className="space-y-20">
        <HobbiesSection title="Crypto">
          <Appearance
            href="https://www.coindesk.com/learn/what-is-defi/"
            title="The Rise of Decentralized Finance"
            description="This article discusses how decentralized finance (DeFi) is transforming traditional financial systems by leveraging blockchain technology."
            event="CoinDesk, 2023"
            cta="Read article"
          />
          <Appearance
            href="https://hbr.org/2021/05/how-blockchain-is-changing-finance"
            title="How Blockchain is Changing the World"
            description="An insightful look into the various applications of blockchain technology beyond cryptocurrency, including supply chain management and digital identity verification."
            event="Harvard Business Review, 2021"
            cta="Read article"
          />
          <Appearance
            href="https://www.forbes.com/sites/forbesfinancecouncil/2021/02/12/the-future-of-money-cryptocurrency/"
            title="Cryptocurrency: The Future of Money"
            description="Exploring the potential of cryptocurrency to revolutionize the global financial system and its implications for the future of money."
            event="Forbes, 2021"
            cta="Read article"
          />
        </HobbiesSection>
        <HobbiesSection title="Family">
          <Appearance
            href="/static"
            title="Spending Time with My Family"
            description="I have three young boys, ages 5, 3, and 15 months. I love spending time with them and going on vacations and adventures. We often go to the beach and enjoy exploring the world together."
            event="Family Time"
            cta="See more"
          />
        </HobbiesSection>
        <HobbiesSection title="Sports">
          <Appearance
            href="/static"
            title="Passion for Sports"
            description="I love to play basketball and football, and I ride my bike everywhere. I'm a fan of the New York Knicks and the New York Jets, so please be kind to me because my teams always disappoint me every year."
            event="Sports Enthusiast"
            cta="LGKJ"
          />
        </HobbiesSection>
      </div>
    </SimpleLayout>
  );
}
