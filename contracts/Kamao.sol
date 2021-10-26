//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Kamao {
    mapping(address => uint256) balances;

    event Deposit(address indexed _user, uint256 _amount);

    constructor() { }

    function deposit() external payable {
        require(msg.value > 0, "No amount transferred");

        balances[msg.sender] = msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() external view returns(uint256) {
        return balances[msg.sender];
    }
}
