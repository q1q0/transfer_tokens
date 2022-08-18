const { ethers } = require("hardhat");
require('dotenv').config()
async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Token = await ethers.getContractFactory("ClassToken");
    const token = await Token.deploy();
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });


// testUSDC 0x06B2194017C08a03218a674EF7Ad8A702aae791b
// testBUSD 0x31537B7157f0c26106F123c89d4b332F2d781FFB