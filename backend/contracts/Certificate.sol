// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    
    struct Certificate {
        bytes32 hash;          // Hash of the certificate data
        address issuer;        // Address of the issuer
        uint256 issueDate;     // Timestamp of issuance
        bool revoked;          // Flag indicating if the certificate is revoked
    }

    address public owner;
    mapping(bytes32 => Certificate) public certificates;
    mapping(address => bool) public admins;  // To manage access control

    event CertificateIssued(bytes32 indexed hash, address indexed issuer, uint256 issueDate);
    event CertificateRevoked(bytes32 indexed hash, address indexed issuer);
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender] == true || msg.sender == owner, "Not an admin or owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true; // Initial owner is also an admin
    }

    // Function to add an admin
    function addAdmin(address _admin) public onlyOwner {
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    // Function to remove an admin
    function removeAdmin(address _admin) public onlyOwner {
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    // Issue a certificate by storing its hash and metadata
    function issueCertificate(bytes32 hash) public onlyAdmin {
        require(certificates[hash].issuer == address(0), "Certificate already exists");
        
        certificates[hash] = Certificate({
            hash: hash,
            issuer: msg.sender,
            issueDate: block.timestamp,
            revoked: false
        });
        
        emit CertificateIssued(hash, msg.sender, block.timestamp);
    }

    // Verify if a certificate exists and is not revoked
    function verifyCertificate(bytes32 hash) public view returns (bool) {
        return certificates[hash].issuer != address(0) && !certificates[hash].revoked;
    }

    // Revoke a certificate
    function revokeCertificate(bytes32 hash) public {
        require(certificates[hash].issuer == msg.sender, "Only the issuer can revoke this certificate");
        
        certificates[hash].revoked = true;
        
        emit CertificateRevoked(hash, msg.sender);
    }

    // Retrieve certificate details
    function getCertificateDetails(bytes32 hash) public view returns (address, uint256, bool) {
        require(certificates[hash].issuer != address(0), "Certificate does not exist");
        
        Certificate memory cert = certificates[hash];
        return (cert.issuer, cert.issueDate, cert.revoked);
    }
}
