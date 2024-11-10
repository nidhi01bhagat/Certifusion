// client/src/components/IssueCertificate.js
import React, { useState } from "react";
import { getBlockchain } from "../Blockchain";
import './IssueCertificate.css'; // Import the CSS file

const IssueCertificate = () => {
    const [hash, setHash] = useState("");
    const [status, setStatus] = useState("");

    const issueCertificate = async () => {
        const { certificateContract } = await getBlockchain();
        try {
            // Check if the hash is a valid hex string of 64 characters (without "0x")
            if (!/^[0-9a-fA-F]{64}$/.test(hash)) {
                setStatus("Error: Hash must be a valid hex string of 64 characters.");
                return;
            }

            // Prepend '0x' to the hash
            const hashBytes32 = "0x" + hash;

            const tx = await certificateContract.issueCertificate(hashBytes32);
            await tx.wait();
            setStatus("Certificate Issued Successfully!");
        } catch (error) {
            setStatus("Error Issuing Certificate.");
            console.error(error);
        }
    };

    return (
        <div className="container"> {/* Add the container class for styling */}
            <h3>Issue Certificate</h3>
            <input
                type="text"
                placeholder="Enter Certificate Hash (64 hex characters)"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
            />
            <button onClick={issueCertificate}>Issue Certificate</button>
            <p className="status">{status}</p> {/* Apply status class for styling */}
        </div>
    );
};

export default IssueCertificate;
