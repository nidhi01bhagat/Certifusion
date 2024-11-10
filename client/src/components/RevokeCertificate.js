// client/src/components/RevokeCertificate.js
import React, { useState } from "react";
import { getBlockchain } from "../Blockchain";
import './RevokeCertificate.css'; // Import the CSS file

const RevokeCertificate = () => {
    const [hash, setHash] = useState("");
    const [status, setStatus] = useState("");

    const revokeCertificate = async () => {
        const { certificateContract } = await getBlockchain();
        try {
            // Check if the hash is a valid hex string of 64 characters (without "0x")
            if (!/^[0-9a-fA-F]{64}$/.test(hash)) {
                setStatus("Error: Hash must be a valid hex string of 64 characters.");
                return;
            }

            // Prepend '0x' to the hash
            const hashBytes32 = "0x" + hash;

            const tx = await certificateContract.revokeCertificate(hashBytes32);
            await tx.wait();
            setStatus("Certificate Revoked Successfully!");
        } catch (error) {
            setStatus("Error Revoking Certificate.");
            console.error(error);
        }
    };

    return (
        <div className="container"> {/* Add the container class for styling */}
            <h3>Revoke Certificate</h3>
            <input
                type="text"
                placeholder="Enter Certificate Hash (64 hex characters)"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
            />
            <button onClick={revokeCertificate}>Revoke Certificate</button>
            <p className="status">{status}</p> {/* Apply status class for styling */}
        </div>
    );
};

export default RevokeCertificate;
