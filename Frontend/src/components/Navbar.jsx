// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar bg-base-300 shadow-md">
            <div className="flex-1">
                <span className="btn btn-ghost normal-case text-2xl font-bold">
                    My Todo App
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
