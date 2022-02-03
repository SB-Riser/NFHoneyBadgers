const hre = require("hardhat"); 


async function main() {
 
  const factory = await hre.ethers.getContractFactory("NFHoneyBadgers");
  const NFHoneyBadgers = await factory.deploy("NFHoneyBadgers","NFHB","https://nfhoneybadgers.com/metadata/");

  await NFHoneyBadgers.deployed();

  console.log("NFHoneyBadgers deployed to:", NFHoneyBadgers.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
