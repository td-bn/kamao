//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IAaveConnector.sol";
import "hardhat/console.sol";

contract Kamao {
    address private aaveInterface;
    mapping(address => uint256) balances;

    event Deposit(address indexed _user, uint256 _amount);

    constructor(address _aaveConnector) {
        aaveInterface = _aaveConnector;
    }

    function deposit() external payable {
        require(msg.value > 0, "No amount transferred");

        balances[msg.sender] = msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() external view returns(uint256) {
        return balances[msg.sender];
    }

    function provideLiquidity() external {
        _depositIntoAavePool();
    }

    function _depositIntoAavePool() internal {
        IAaveConnector aaveConnector = IAaveConnector(aaveInterface);
        uint256 ethBalance = address(this).balance;
        aaveConnector.depositETH{value: address(this).balance}(address(this));
        require(
            aaveConnector.getaWETHBalance(address(this)) >= ethBalance,
            "aWETH balance less than ETH balance"
        );
    }
}
