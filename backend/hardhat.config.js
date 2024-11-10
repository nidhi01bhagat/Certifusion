require("@nomicfoundation/hardhat-toolbox");

YOUR_PRIVATE_KEY = ''

module.exports = {
    solidity: "0.8.27",
    networks: {
        nibiru: {
            url: "https://evm-rpc.devnet-3.nibiru.fi",
            accounts: [YOUR_PRIVATE_KEY] // Use a private key from your MetaMask
        }
    }
};
