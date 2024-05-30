// Define the structure for billboard textures
interface BillboardTextures {
  terpSolutionsTexture: string;
  bullVsBearTexture: string;
  fairbnbTexture: string;
  wekLawTexture: string;
}

// Define billboard textures with updated paths
let billboardTextures: BillboardTextures = {
  terpSolutionsTexture: "/assets/terpSolutions.png",
  bullVsBearTexture: "/assets/bvbbillboard.png",
  fairbnbTexture: "/assets/fairbnb.png",
  wekLawTexture: "/assets/wekLawBillboard.png",
};

// Define the structure for box textures
interface BoxTexture {
  StaticSite: string;
  Github: string;
  twitter: string;
  LinkedIn: string;
  mail: string;
  globe: string;
  reactIcon: string;
  allSkills: string;
  lensFlareMain: string;
  lucasNoah: string;
  familyText: string;
  writing: string;
}

// Define box textures with updated paths
let boxTexture: BoxTexture = {
  StaticSite: "/assets/johnraoLogo.png",
  Github: "/assets/githubLogo.png",
  twitter: "/assets/twitterLogo.png",
  LinkedIn: "/assets/linkedInLogo.png",
  mail: "/assets/envelope.png",
  globe: "/assets/thunder.png",
  reactIcon: "/assets/react.png",
  allSkills: "/assets/allSkills.png",
  lensFlareMain: "/assets/lensflare0.png",
  lucasNoah: "/assets/LucasNoahPic.jpeg",
  familyText: "/assets/Family.png",
  writing: "/assets/writing.png",
};

// Define material textures with updated paths
let stoneTexture: string = "/assets/stone.png";
let woodTexture: string = "/assets/woodTexture.jpg";

// Define the structure and values for input text
interface InputText {
  terpSolutionsText: string;
  activities: string;
  bullVsBearText: string;
  fairbnbText: string;
  wekLawText: string;
  staticPortfolio: string;
}

// Define input text with updated paths
let inputText: InputText = {
  terpSolutionsText: "/assets/terp-solutions-text.png",
  activities: "/assets/activities_text.png",
  bullVsBearText: "/assets/bvb-text.png",
  fairbnbText: "/assets/fairbnb-text.png",
  wekLawText: "/assets/weklaw-text.png",
  staticPortfolio: "/assets/static-portfolio.png",
};

// Define SVG with updated paths
interface SVG {
  reactLogo: string;
}

// let SVG: SVG = {
//   reactLogo: "/assets/svg/react-svg.svg",
// };

// Define URLs
interface URL {
  terpsolutions: string;
  johnrao: string;
  bullVsBearTrading: string;
  getFairbnb: string;
  wekLawURL: string;
  gitHub: string;
  twitter: string;
  LinkedIn: string;
  email: string;
  githubBullVsBear: string;
  wekLaw: string;
}

let URL: URL = {
  terpsolutions: "https://web.archive.org/web/20200302001846/https://terpsolutions.com/",
  johnrao: "https://johnrao.com/static",
  bullVsBearTrading: "https://www.bullvsbeartrading.com",
  getFairbnb: "https://www.getfairbnb.com",
  wekLawURL: "https://www.weklaw.com/",
  gitHub: "https://github.com/johnrao23/Portfolio-2024",
  twitter: "https://twitter.com/0xRao",
  LinkedIn: "https://www.linkedin.com/in/john-rao",
  email: "mailto:johnrao23@gmail.com",
  githubBullVsBear: "https://github.com/johnrao23/bull-vs-bear-trading",
  wekLaw: "https://www.weklaw.com/",
};

// Export all defined structures
export {
  billboardTextures,
  boxTexture,
  inputText,
  URL,
  stoneTexture,
  woodTexture,
};
