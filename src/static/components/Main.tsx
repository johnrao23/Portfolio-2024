import React from "react"
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

const Main: React.FC = () => {
    return (
        <div>
            <NavBar />
            <h1>Main Content</h1>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <Footer />
        </div>
    );
};

export default Main;