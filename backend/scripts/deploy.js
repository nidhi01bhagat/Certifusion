async function main() {
    const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    const registry = await CertificateRegistry.deploy();
    await registry.waitForDeployment();
    console.log("CertificateRegistry deployed to:", registry.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
