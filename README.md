# Testing the Limits of EVM Stack Depth

This repo contains some contracts and a test script to demonstrate the limits of the stack depth of the EVM. It uses hardhat as a framework for writing and testing contracts, so once you have installed its dependencies, you can use ``npx hardhat test`` in the root directory to run the test as written.
Please see accompanying blog post explaining the results of this test at x.

## Contracts
StackDepthTest.sol - contains a basic contract to call a recursive, internal function from a contract that diverges.

StackDepthExt.sol - contains a contract that calls out to another contract of the same type, forcing a divergent recursive loop of external calls between the two contracts.

StackDepthAttack.sol - similar to StackDepthExt, but calls an internal, recursive function a user-supplied number of times before calling out to an external contract in order to force an unexpected stack depth limit error.
