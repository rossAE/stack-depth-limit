//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract StackDepthTest {

    constructor() {
        console.log("Deployed a stack depth test contract!");
    }

    function a() internal {
        //console.log(gasleft());
        a();
    }

    function b() external {
        a();
    }
}
