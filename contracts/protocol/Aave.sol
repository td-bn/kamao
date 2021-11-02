//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IAave.sol";
import "../interfaces//ILendingPoolAddressesProvider.sol";

contract Aave is IAave {
    address public lendingPoolProvider = 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5;
    address public wethGateway = 0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04;
    address public aWETH = 0x030bA81f1c18d280636F32af80b9AAd02Cf0854e;
    address public aaveLendingPool;

    /**
     * @notice : Gets the lending pool contract address from Aave's lending pool address provider
     */
    // TODO Make this internal and call from constructor, or initialize()
    function getLendingPool() external returns (address) {
        ILendingPoolAddressesProvider provider = ILendingPoolAddressesProvider(lendingPoolProvider);
        aaveLendingPool = provider.getLendingPool();
        return aaveLendingPool;
    }

    function depositETH(address _onBehalfOf) override external payable returns (bool) {
        // TODO: Check contract size
        bytes memory callData = abi.encodeWithSignature(
            "depositETH(address,address,uint16)",
            aaveLendingPool,
            _onBehalfOf,
            0
        );
        (bool success, ) = wethGateway.call{value: msg.value, gas: 500000}(callData);
        require(success, "ETH deposit into Aave failed");
        return success;
    }

    function getETHBalance(address _user) external view returns (uint256) {
        IERC20 aWETHContract = IERC20(aWETH);
        return aWETHContract.balanceOf(_user);
    }
}