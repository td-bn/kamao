//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockLendingPoolProvider {
    function getLendingPool() external view returns(address) {
        return 0xa29Fa808FCa990052A81a7e96D33cBf2078a422A;
    }
}

contract MockWethGateway is ERC20{
    constructor() ERC20("MOCK", "LP") {}

    function depositETH(address lendingPool, address behalfOf, uint16 dunno) public payable {
        _mint(behalfOf, msg.value);
    }

  function withdrawETH(address lendingPool, uint256 amount, address to) external {
      payable(to).transfer(amount);
  }
}
