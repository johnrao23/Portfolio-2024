import React from "react"
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

const About: React.FC = () => {
    return (
        <div>
            <NavBar />
            <h1>About Me content</h1>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <Footer />
        </div>
    );
};

export default About;