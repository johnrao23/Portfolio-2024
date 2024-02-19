import React from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom"; // Import Link

const Main: React.FC = () => {
    return (
        <div>
            <NavBar />
            <h1>Main Content</h1>
            <h2>This will be a long page with navbar jumping to page sections</h2>
            <Link to="/static/about" style={{ textDecoration: 'none' }}>
                <button>About Page</button>
            </Link>
            <Footer />
        </div>
    );
};

export default Main;
