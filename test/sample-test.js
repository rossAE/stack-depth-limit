const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Testing EVM stack depth limits", function () {
  let stackDepthTest, stackDepthExt, stackDepthExt2, stackDepthAttack, stackDepthAttack2;

  before(async () => {
    const StackDepthTest = await ethers.getContractFactory("StackDepthTest");
    stackDepthTest = await StackDepthTest.deploy();
    await stackDepthTest.deployed();

    const StackDepthExt = await ethers.getContractFactory("StackDepthExt");
    stackDepthExt = await StackDepthExt.deploy();
    await stackDepthExt.deployed();

    stackDepthExt2 = await StackDepthExt.deploy();
    await stackDepthExt2.deployed();

    // set contract addresses equal to each other to call back and forth
    await stackDepthExt.setAddr(stackDepthExt2.address);
    await stackDepthExt2.setAddr(stackDepthExt.address);

    const StackDepthAttack = await ethers.getContractFactory("StackDepthAttack");
    stackDepthAttack = await StackDepthAttack.deploy();
    await stackDepthAttack.deployed();

    stackDepthAttack2 = await StackDepthAttack.deploy();
    await stackDepthAttack2.deployed();

    await stackDepthAttack.setAddr(stackDepthAttack2.address);
    await stackDepthAttack2.setAddr(stackDepthAttack.address);
  });

  it("StackDepthTest should reach limit when calling b()", async function () {
    await expect(stackDepthTest.b()).to.be.reverted;

    // Uncomment the following try-catch to see the stack trace and out of gas error
    // try{
    //   await stackDepthTest.b();
    // } catch (error) {
    //   console.log(error);
    // }
  });

  it("StackDepthExt should run out of gas when calling into other contract", async () => {
    await expect(stackDepthExt.callOther()).to.be.reverted;

    // Uncomment the following try-catch to see the stack trace and out of gas error
    // try{
    //   await stackDepthExt.callOther();
    // } catch (error) {
    //   console.log(error);
    // }
  });

  it("Should attack the other contract", async() => {
    // values less than 505 return true
    // values greater than or equal to 505 revert with stack depth limit error
    let calls = 505;
    await expect(stackDepthAttack.attack(calls)).to.be.reverted; 

    // Uncomment the following try-catch to see the stack trace and out of gas error
    // try{
    //   await stackDepthAttack.attack(calls);
    // } catch (error) {
    //   console.log(error);
    // }
  });
});
