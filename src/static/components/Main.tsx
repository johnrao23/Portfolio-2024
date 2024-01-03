import React from "react"
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

const Main: React.FC = () => {
    return (
        <div>
            <NavBar />
            <h1>Main Content</h1>
            <Footer />
        </div>
    );
};

export default Main;