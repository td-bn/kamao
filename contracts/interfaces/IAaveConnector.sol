//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IAaveConnector {
    function depositETH(address _onBehalfOf) external payable returns (bool);
    function getaWETHBalance(address _user) external view returns (uint256);
}
