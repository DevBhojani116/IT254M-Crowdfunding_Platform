require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");


const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  }
};
