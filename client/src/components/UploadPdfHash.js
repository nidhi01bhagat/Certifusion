// client/src/components/UploadPdfHash.js
import React, { useState } from "react";
import CryptoJS from "crypto-js";
import './UploadPdfHash.css'; // Import the CSS file

const UploadPdfHash = () => {
    const [hash, setHash] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onloadend = () => {
                const arrayBuffer = reader.result;
                const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
                const sha256Hash = CryptoJS.SHA256(wordArray).toString();
                setHash(sha256Hash);
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    return (
        <div className="container"> {/* Add the container class for styling */}
            <h3>Upload PDF to Generate SHA-256 Hash</h3>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            {hash && (
                <div className="hash-output">
                    <h4>SHA-256 Hash:</h4>
                    <p className="display">{hash}</p>
                </div>
            )}
        </div>
    );
};

export default UploadPdfHash;
