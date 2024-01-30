// Define the structure for billboard textures
interface BillboardTextures {
  terpSolutionsTexture: string;
  bullVsBearTexture: string;
  fairbnbTexture: string;
  scanAndGoTexture: string;
}

// Define billboard textures with updated paths
let billboardTextures: BillboardTextures = {
  terpSolutionsTexture: "/assets/png/terpSolutions.png",
  bullVsBearTexture: "/assets/png/bvbbillboard.png",
  fairbnbTexture: "/assets/png/fairbnb.png",
  scanAndGoTexture: "/assets/png/SaG-billboard.png",
};

// Define the structure for box textures
interface BoxTexture {
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
  Github: "/assets/png/githubLogo.png",
  twitter: "/assets/png/twitterLogo.png",
  LinkedIn: "/assets/png/linkedInLogo.png",
  mail: "/assets/png/envelope.png",
  globe: "/assets/png/thunder.png",
  reactIcon: "/assets/png/react.png",
  allSkills: "/assets/png/allSkills.png",
  lensFlareMain: "/assets/png/lensflare0.png",
  lucasNoah: "/assets/jpg/LucasNoahPic.jpeg",
  familyText: "/assets/png/Family.png",
  writing: "/assets/png/writing.png",
};

// Define material textures with updated paths
let stoneTexture: string = "/assets/png/stone.png";
let woodTexture: string = "/assets/jpg/woodTexture.jpg";

// Define the structure and values for input text
interface InputText {
  terpSolutionsText: string;
  activities: string;
  bullVsBearText: string;
  fairbnbText: string;
  scanAndGoText: string;
  staticPortfolio: string;
}

// Define input text with updated paths
let inputText: InputText = {
  terpSolutionsText: "/assets/png/terp-solutions-text.png",
  activities: "/assets/png/activities_text.png",
  bullVsBearText: "/assets/png/bvb-text.png",
  fairbnbText: "/assets/png/fairbnb-text.png",
  scanAndGoText: "/assets/png/SaG-text.png",
  staticPortfolio: "/assets/png/static-portfolio.png",
};

// Define SVG with updated paths
interface SVG {
  reactLogo: string;
}

let SVG: SVG = {
  reactLogo: "/assets/svg/react-svg.svg",
};

// Define URLs
interface URL {
  terpsolutions: string;
  johnrao: string;
  bullVsBearTrading: string;
  getFairbnb: string;
  samsClubURL: string;
  gitHub: string;
  twitter: string;
  LinkedIn: string;
  email: string;
  githubBullVsBear: string;
  samsClub: string;
}

let URL: URL = {
  terpsolutions: "https://web.archive.org/web/20200302001846/https://terpsolutions.com/",
  johnrao: "https://johnrao.com",
  bullVsBearTrading: "https://www.bullvsbeartrading.com",
  getFairbnb: "https://www.getfairbnb.com",
  samsClubURL: "https://www.samsclub.com/",
  gitHub: "https://github.com/johnrao23/Portfolio-2022",
  twitter: "https://twitter.com/0xRao",
  LinkedIn: "https://www.linkedin.com/in/john-rao",
  email: "mailto:johnrao23@gmail.com",
  githubBullVsBear: "https://github.com/johnrao23/bull-vs-bear-trading",
  samsClub: "https://www.samsclub.com/",
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
