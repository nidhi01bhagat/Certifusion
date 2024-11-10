import './GenerateCertificate.css';
import React, { useState } from "react";
import jsPDF from "jspdf";
import CryptoJS from "crypto-js";

const GenerateCertificate = () => {
    const [name, setName] = useState("");
    const [certificateName, setCertificateName] = useState("");
    const [grade, setGrade] = useState("");
    const [dateIssued, setDateIssued] = useState("");
    const [validUntil, setValidUntil] = useState("");
    const [hash, setHash] = useState("");

    const handleGenerate = () => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("Certificate of Achievement", 20, 30); // Title
        doc.setFontSize(16);
        doc.text(`This certifies that`, 20, 60);
        doc.setFontSize(20);
        doc.text(name, 20, 70); // Name
        doc.setFontSize(16);
        doc.text(`has successfully completed the course`, 20, 90);
        doc.text(certificateName, 20, 100); // Certificate name
        doc.text(`Grade: ${grade}`, 20, 120); // Grade
        doc.text(`Date Issued: ${dateIssued}`, 20, 140); // Date Issued
        doc.text(`Valid Until: ${validUntil}`, 20, 160); // Valid Until

        const pdfData = doc.output('blob');
        const reader = new FileReader();
        reader.onloadend = () => {
            const arrayBuffer = reader.result;
            const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
            const sha256Hash = CryptoJS.SHA256(wordArray).toString();
            setHash(sha256Hash);
            doc.save("certificate.pdf"); // Save the PDF
        };
        reader.readAsArrayBuffer(pdfData);
    };

    return (
        <div className="container">
            <h3>Generate Certificate</h3>
            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Certificate Name"
                value={certificateName}
                onChange={(e) => setCertificateName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Date Issued"
                value={dateIssued}
                onChange={(e) => setDateIssued(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Valid Until"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
            />
            <button onClick={handleGenerate}>Generate Certificate</button>
            {hash && (
                <div className="hash-display">
                    <h4>SHA-256 Hash:</h4>
                    <p className="display">{hash}</p>
                </div>
            )}
        </div>
    );
};

export default GenerateCertificate;
