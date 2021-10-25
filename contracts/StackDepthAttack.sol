//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract StackDepthAttack {
    StackDepthAttack stackDepthAttack;

    constructor() {
        console.log("StackDepth attack contract has been deployed!");
    }

    function setAddr(address addr) external {
        stackDepthAttack = StackDepthAttack(addr);
    }

    function callOther() external pure returns (bool){
        return true;
    }

    function attack(uint i) public {
        if(i>1){
            attack(i-1);
        }
        stackDepthAttack.callOther();
    }
}
