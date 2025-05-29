// hardhat.config.js

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337, 
    },
    // Add other network configurations here (e.g., for testnets or mainnet)
    // Example for Ropsten:
    // ropsten: {
    //   url: "https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    //   accounts: [`0x${YOUR_PRIVATE_KEY}`],
    // },
  },
  mocha: {
    timeout: 20000,
  },
};
