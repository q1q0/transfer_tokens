
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ClassToken is ERC20 {
        constructor() 
          ERC20("testBUSD", "tBUSD") 
        {
                _mint(msg.sender, 10 ** 18 * 1000000000);
        }
}