//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IVault {
    function deposit(uint256 _amount) external payable;
    function withdraw(uint256 _shares) external;
    function getPricePerFullShare() external view returns (uint256);
}