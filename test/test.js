const { expect } = require("chai");
const { ethers } = require("hardhat");  
const { expectRevert } = require('@openzeppelin/test-helpers');
const hre = require("hardhat");

describe("NFHoneyBadgers", function () { 
 
  let accounts = [] 
  let contract   


  before(async function()  { 
        acc = await  hre.ethers.getSigners() 
        for (const account of acc){
          accounts.push(account.address) 
        }     

        let factory = await hre.ethers.getContractFactory("NFHoneyBadgers") 
        let contractInstance = await factory.deploy("NFHoneyBadgers","NFHB","https://nfhoneybadgers.com/metadata/") 
        contract   = await contractInstance.deployed()   

  })     

  it("Should reserve 200 tokens for owner" , async function(){
    const [owner, addr1, addr2 ,addr3 ,addr4] = await ethers.getSigners();    

    await contract.connect(owner).reserve(200 , { from: owner.address })   
    let bal = await contract.balanceOf(owner.address) 
    expect(parseInt(bal)).to.equal(200)   

  }) 

  it("Should  mint" , async function(){
    const [owner, addr1, addr2 ,addr3 ,addr4] = await ethers.getSigners();   

    await contract.connect(owner).flipSaleState( { from: owner.address }) 
    await contract.connect(addr1).mint(2 , { from: addr1.address , value : '100000000000000000' })    
    let bal = await contract.balanceOf(addr1.address) 
    expect(parseInt(bal)).to.equal(2) 

   
      
  })   


  it("Should mint 5 and not more than 9" , async function(){
    const [owner, addr1, addr2 ,addr3 ,addr4] = await ethers.getSigners();   

    
    await contract.connect(addr2).mint(5 , { from: addr2.address , value : '250000000000000000' })    
    let bal = await contract.balanceOf(addr2.address) 
    expect(parseInt(bal)).to.equal(5)  

    await contract.connect(addr2).mint(4 , { from: addr2.address , value : '200000000000000000' })    
    let bal2 = await contract.balanceOf(addr2.address) 
    expect(parseInt(bal2)).to.equal(9) 
    
  }) 

  it("Should return correct tokenURI" , async function(){
    const [owner, addr1, addr2 ,addr3 ,addr4] = await ethers.getSigners(); 
    
    let tokenURI =   await contract.tokenURI(1) 
    expect(tokenURI).to.equal("https://nfhoneybadgers.com/metadata/1") 

    let tokenURI2 =   await contract.tokenURI(150) 
    expect(tokenURI2).to.equal("https://nfhoneybadgers.com/metadata/150")
    
  })


});
