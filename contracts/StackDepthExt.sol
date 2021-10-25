//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract StackDepthExt {
    StackDepthExt stackDepthExt;

    constructor() {
        console.log("StackDepthExt has been deployed!");
    }

    function setAddr(address addr) external {
        stackDepthExt = StackDepthExt(addr);
    }

    function callOther() external {
        console.log(gasleft());
        stackDepthExt.callOther();
    }
}
