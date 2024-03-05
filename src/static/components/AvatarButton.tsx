import React from "react";
import { useNavigate } from "react-router-dom";
import AvatarImg from "../assets/AvatarImg.jpg";

const AvatarButton = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/static")
    }

    return (
        <div className="p-2">
            <button 
                onClick={handleClick} 
                className="flex items-center justify-center bg-transparent p-0 w-16 h-16 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 scale-100 hover:scale-105 transition-all duration-200"
            >
                <img src={AvatarImg} alt="JR Avatar" className="w-full h-full transform scale-125 rounded-full" />
            </button>
        </div>
    )
}

export default AvatarButton;