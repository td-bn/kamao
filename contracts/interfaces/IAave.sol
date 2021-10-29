//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IAave {

    /**
     * Deposit the contract balance into Aave 
     */
    function deposit() external returns (bool);
}
