//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IAave.sol";
import "../interfaces//ILendingPoolAddressesProvider.sol";

contract Aave is IAave {
    address public lendingPoolProvider = 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5;

    /**
     * @notice : Gets the lending pool contract address from Aave's lending pool address provider
     */
    function getLendingPool() external view returns (address) {
        ILendingPoolAddressesProvider provider = ILendingPoolAddressesProvider(lendingPoolProvider);
        return provider.getLendingPool();
    }

    function deposit() override external returns (bool) {}
}