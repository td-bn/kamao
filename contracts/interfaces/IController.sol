//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IController {
    function setVault(address _vault) external;
    function setStrategy(address _strategy) external;
    function earn(uint256 _amount) external;
    function withdrawAll() external;
    function withdraw(uint256 _amount) external;
}