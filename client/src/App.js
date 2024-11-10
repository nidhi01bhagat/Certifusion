import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GenerateCertificate from "./components/GenerateCertificate";
import IssueCertificate from "./components/IssueCertificate";
import VerifyCertificate from "./components/VerifyCertificate";
import RevokeCertificate from "./components/RevokeCertificate";
import UploadPdfHash from "./components/UploadPdfHash";
import Menu from "./components/Menu"; // Import the Menu component
import leftImage from '../src/Photo.png'; // Import your left image
import rightImage from '../src/Photo2.png'; // Import your right image

const App = () => {
    return (
        <Router>
            <div>
                <h1 className="nameplate">Certificate Management System</h1>
                <Menu /> {/* Add the Menu component here */}
                
                {/* Container for Images and Function Buttons */}
                <div className="main-container">
                    <img src={leftImage} alt="Left Icon" className="side-image" />
                    
                    {/* Button Container for Certificate Functions */}
                    <div className="function-container">
                    <Link to="/generate">
                            <button className="function-button">Generate Certificate</button>
                        </Link>
                        <Link to="/issue">
                            <button className="function-button">Issue Certificate</button>
                        </Link>
                       
                        <Link to="/revoke">
                            <button className="function-button">Revoke Certificate</button>
                        </Link>
                        
                        <Link to="/upload-pdf-hash">
                            <button className="function-button">Generate PDF Hash</button>
                        </Link>
                        <Link to="/verify">
                            <button className="function-button">Verify Certificate</button>
                        </Link>
                    </div>

                    <img src={rightImage} alt="Right Icon" className="side-image" />
                </div>

                {/* Routes for the different pages */}
                <Routes>
                    <Route path="/" element={<div style={{ display: 'none' }} />} /> {/* Hide the home route image */}
                    <Route path="/issue" element={<IssueCertificate />} />
                    <Route path="/verify" element={<VerifyCertificate />} />
                    <Route path="/revoke" element={<RevokeCertificate />} />
                    <Route path="/generate" element={<GenerateCertificate />} />
                    <Route path="/upload-pdf-hash" element={<UploadPdfHash />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

