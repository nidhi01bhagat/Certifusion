// client/src/components/VerifyCertificate.js
import React, { useState } from "react";
import { getBlockchain } from "../Blockchain";
import './VerifyCertificate.css'; // Import the CSS file

const VerifyCertificate = () => {
    const [hash, setHash] = useState("");
    const [status, setStatus] = useState("");

    const verifyCertificate = async () => {
        const { certificateContract } = await getBlockchain();
        try {
            // Check if the hash is a valid hex string of 64 characters (without "0x")
            if (!/^[0-9a-fA-F]{64}$/.test(hash)) {
                setStatus("Error: Hash must be a valid hex string of 64 characters.");
                return;
            }

            // Prepend '0x' to the hash
            const hashBytes32 = "0x" + hash;

            const isValid = await certificateContract.verifyCertificate(hashBytes32);
            setStatus(isValid ? "Certificate is valid!" : "Certificate is invalid or revoked.");
        } catch (error) {
            setStatus("Error Verifying Certificate.");
            console.error(error);
        }
    };

    return (
        <div className="container"> {/* Add the container class for styling */}
            <h3>Verify Certificate</h3>
            <input
                type="text"
                placeholder="Enter Certificate Hash (64 hex characters)"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
            />
            <button onClick={verifyCertificate}>Verify Certificate</button>
            <p className="status">{status}</p> {/* Apply status class for styling */}
        </div>
    );
};

export default VerifyCertificate;
