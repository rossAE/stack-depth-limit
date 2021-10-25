const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Overflow", function () {
  let overflow, stackDepthExt, stackDepthExt2, stackDepthAttack, stackDepthAttack2;

  before(async () => {
    // const Overflow = await ethers.getContractFactory("Overflow");
    // overflow = await Overflow.deploy();
    // await overflow.deployed();

    // const StackDepthExt = await ethers.getContractFactory("StackDepthExt");
    // stackDepthExt = await StackDepthExt.deploy();
    // await stackDepthExt.deployed();

    // stackDepthExt2 = await StackDepthExt.deploy();
    // await stackDepthExt2.deployed();

    // await stackDepthExt.setAddr(stackDepthExt2.address);
    // await stackDepthExt2.setAddr(stackDepthExt.address);

    const StackDepthAttack = await ethers.getContractFactory("StackDepthAttack");
    stackDepthAttack = await StackDepthAttack.deploy();
    await stackDepthAttack.deployed();

    stackDepthAttack2 = await StackDepthAttack.deploy();
    await stackDepthAttack2.deployed();

    await stackDepthAttack.setAddr(stackDepthAttack2.address);
    await stackDepthAttack2.setAddr(stackDepthAttack.address);
  });

  // it("Overflow should not overflow when calling d()", async function () {
  //   const dReturn = await overflow.d();
  //   expect(dReturn).to.equal(true);
  // });

  // it("Overflow should overflow when calling b()", async function () {
  //   await expect(overflow.b()).to.be.reverted;
  //   // try{
  //   //   await overflow.b();
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // });

  // it("StackDepthExt should run out of gas when calling into other contract", async () => {
  //   await expect(stackDepthExt.callOther()).to.be.reverted;
  //   try{
  //     await stackDepthExt.callOther();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  it("Should attack the other contract", async() => {
    try{
      await stackDepthAttack.attack(505);  //use 505
    } catch (error) {
      console.log(error);
    }
  });
});
