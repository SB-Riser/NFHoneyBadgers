/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-solhint");
require("@nomiclabs/hardhat-web3");

const {
   API_URL,
   PRIVATE_KEY,
   ETHERSCAN_API_KEY, 
   POLYGON_API_KEY
} = process.env;

module.exports = {
   solidity: {
      version: "0.8.7",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    } ,
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`] 
      }, 

      mumbai: {
         
         url: "https://rpc-mumbai.maticvigil.com",
         accounts: [`0x${PRIVATE_KEY}`] 
       }, 
     
   },
   etherscan: {
      
      apiKey: POLYGON_API_KEY
    }
}