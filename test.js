const { expect } = require("chai");
const { ethers } = require("hardhat");  
const { expectRevert } = require('@openzeppelin/test-helpers');
const hre = require("hardhat");

describe("Greeter", function () {  

 
 
  let accounts = [] 
  let contract  

  before(async function()  { 

        acc = await  hre.ethers.getSigners() 
        for (const account of acc){
          accounts.push(account.address) 
        }     
      
        let factory = await hre.ethers.getContractFactory("NFHoneyBadgers") 
        const contractInstance = await factory.deploy("NFHoneyBadgers","NFHB","https://nfhoneybadgers.com/metadata/")
        contract  = await contractInstance.deployed()   
        await contract.addWhitelistUser(accounts.slice(1,4) , accounts.slice(4,7) , accounts.slice(7,10) , {from : accounts[0]} ) 


  })  

  it("Should Show Balances of Account" , async function(){
    let res = (await contract.balanceOf(accounts[0]))   

    console.log(res)
    expect(parseInt(res)).to.equal(0)

  }) 

  it("Should Check if whitelisted or not" , async function(){  

  
    let res1 = await contract.checkInArr(accounts[1])   
    let res2 = (await contract.checkInArr(accounts[4]))  
    let res3 = (await contract.checkInArr(accounts[7]))   

    console.log(res1) 
    expect(parseInt(res1)).to.equal(1)
    expect(parseInt(res2)).to.equal(2)
    expect(parseInt(res3)).to.equal(3)

  }) 


  it("Should Check PreSale Conditions" , async function(){   

          const [owner, addr1, addr2 ,addr3 ,addr4] = await ethers.getSigners();
          await expectRevert(
               contract.connect(addr1).preSaleBuy(1) , 
              'preSaleBuy: Presale is not active.'
          )   
          await contract.connect(owner).flipPresaleState()  

          await expectRevert(
             contract.connect(addr1).preSaleBuy(2) , 
            'preSaleBuy: Only for Whitelist users with specified amount'
          )  
          const price = 0.04 * 10 ** 18
          await expectRevert(
             contract.connect(addr4).preSaleBuy(2,{from:accounts[4] , value : (price * 1).toString()}) , 
            'NFT25k::preSaleBuy: insufficient ethers'
          )   
          await contract.connect(addr4).preSaleBuy(2,{from:accounts[4] , value : (price * 2).toString()}) 
          let res = (await contract.balanceOf(accounts[4]))  
          expect(parseInt(res)).to.equal(2)  

          await contract.connect(owner).flipPresaleState()  
   
  })  


  it("Should Check Mint Conditions" , async function(){   

          let addr = await ethers.getSigners();  

          await expectRevert(
            contract.connect(addr[1]).mint(1) , 
           'Sale must be active to mint Badgers'
           )   

          await contract.connect(addr[0]).flipSaleState()  
        
          const price = 0.05 * 10 ** 18 

          await expectRevert(
            contract.connect(addr[4]).mint(10,{from:accounts[4] , value : (price * 10).toString()}) , 
           'Can only mint 9 tokens at a time'
         ) 
         
         await expectRevert(
          contract.connect(addr[4]).mint(8,{from:accounts[4] , value : (price * 8).toString()}) , 
         'Single Address Can only mint 9 tokens'
         )  

         await expectRevert(
          contract.connect(addr[4]).mint(5,{from:accounts[4] , value : (price * 1).toString()}) , 
         'Insufficent Amt'
         )  

         await contract.connect(addr[4]).mint(2,{from:accounts[4] , value : (price * 2).toString()}) 
          let res = (await contract.balanceOf(accounts[4]))  
          expect(parseInt(res)).to.equal(4)  

    
          
          
        

})


});
