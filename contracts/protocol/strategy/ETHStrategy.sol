//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../../interfaces/IWETHGateway.sol";
import "../../interfaces/IAaveConnector.sol";
import "../../interfaces/IVault.sol";

/**
    @notice A simple strategy for earning yield on ETH
    @dev Deposits ETH into the Aave's WETH pool
 */
contract ETHStrategy {
    using SafeMath for uint256;

    address public governance;
    address public controller;
    address public vault;
    address public aWETH;
    address public wethGatewayAddress;

    address public aaveInterfaceAddress;

    constructor(address _controller, address _aaveConnector, address _aWETHToken, address _wethGatewayAddress) {
        governance = msg.sender;
        controller = _controller;
        aaveInterfaceAddress = _aaveConnector;
        aWETH = _aWETHToken;
        wethGatewayAddress = _wethGatewayAddress;
    }

    /// @notice Deposit funcs into a strategy
    function deposit() external {
        uint256 _balance =  address(this).balance;
        if (_balance > 0 ) {
            IAaveConnector(aaveInterfaceAddress).depositETH{value: _balance}(address(this));
        }
    }

    /// @notice Withdraw funds from a strategy
    function withdraw(uint256 _amount) external {
        require(msg.sender == controller, "!controller");
        _withdrawFromAavePool(_amount);
        _safeTransferETH(vault, _amount);
    }

    /// @notice Withdraw all funds from a strategy
    function withdrawAll() external {
        require(msg.sender == controller, "!controller");
        uint256 _balance = IERC20(aWETH).balanceOf(address(this));

        // Approve burning of aWETH
        IERC20(aWETH).approve(wethGatewayAddress, _balance);

        address lendingPool = IAaveConnector(aaveInterfaceAddress).getAaveLendingPool();

        IWETHGateway(wethGatewayAddress).withdrawETH(lendingPool, _balance, address(this));

        _safeTransferETH(vault, _balance);
    }

    function _withdrawFromAavePool(uint256 _amount) internal {
        address lendingPool = IAaveConnector(aaveInterfaceAddress).getAaveLendingPool();

        // Approve burning of aWETH
        IERC20(aWETH).approve(wethGatewayAddress, _amount);
        // Withdraw
        IWETHGateway(wethGatewayAddress).withdrawETH(lendingPool, _amount, address(this));
    }

    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "ETH_TRANSFER_FAILED");
    }

    receive() external payable {}
}