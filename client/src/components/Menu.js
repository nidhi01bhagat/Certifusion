import './Menu.css'
import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/generate">Generate Certificate</Link>
                </li>
                <li>
                    <Link to="/issue">Issue Certificate</Link>
                </li>
                <li>
                    <Link to="/verify">Verify Certificate</Link>
                </li>
                <li>
                    <Link to="/revoke">Revoke Certificate</Link>
                </li>
                <li>
                    <Link to="/upload-pdf-hash">Generate PDF Hash</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
