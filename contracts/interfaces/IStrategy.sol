//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IStrategy {
    function deposit() external; 
    function withdraw(uint256 _amount) external;
    function withdrawAll() external;
}