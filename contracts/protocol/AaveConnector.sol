//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IAaveConnector.sol";
import "../interfaces//ILendingPoolAddressesProvider.sol";

contract AaveConnector is IAaveConnector {
    address public lendingPoolProvider;
    address public wethGateway;
    address public aWETH;
    address public aaveLendingPool;

    constructor(address _lendingPoolProvider, address _wethGateway, address _aWETHToken) {
        ILendingPoolAddressesProvider provider = ILendingPoolAddressesProvider(_lendingPoolProvider);
        aaveLendingPool = provider.getLendingPool();
        wethGateway = _wethGateway;
        aWETH = _aWETHToken;
    }

    function getAaveLendingPool() external view override returns (address) {
        return aaveLendingPool;
    }

    // TODO: use IWETHGateway, instead of call
    function depositETH(address _onBehalfOf) external payable override returns (bool) {
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

    function getaWETHBalance(address _user) external view override returns (uint256) {
        IERC20 aWETHContract = IERC20(aWETH);
        return aWETHContract.balanceOf(_user);
    }
}