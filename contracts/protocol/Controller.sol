//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "../interfaces/IStrategy.sol";

/**
    @notice Controls the funds associated with a vault
    @dev Currently only has one strategy, but a vault can have multiple strategies associated
 */
contract Controller {
    using SafeMath for uint256;

    address public vault;
    address public governance;
    address public strategy;

    constructor() {
        governance = msg.sender;
    }

    /// @notice sets the vault that the controller is controlling
    function setVault(address _vault) external {
        require(msg.sender == governance, "!governance");
        vault = _vault;
    }

    /// @notice sets the strategy that we are using to obtain yield
    function setStrategy(address _strategy) external {
        require(msg.sender == governance, "!governance");
        strategy = _strategy;
    }

    /// @notice Tranfers the funds to strategy
    /// @dev Supposed to be only governance, but open for the time being
    function earn(uint256 _amount) external {
        require(strategy != address(0), "no strategy");
        _safeTransferETH(strategy, _amount);
        IStrategy(strategy).deposit();
    }

    /// @notice withdraw all funds from the strategy
    function withdrawAll() external {
        require(msg.sender == governance, "!governance");
        // Strategy.withdrawAll
        IStrategy(strategy).withdrawAll();
    }

    /// @notice withdraw funds for user withdrawls
    function withdraw(uint256 _amount) external {
        require(msg.sender == vault, "!vault");
        // Strategy.withdraw
        IStrategy(strategy).withdraw(_amount);
    }

    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "ETH_TRANSFER_FAILED");
    }

    receive() external payable {}
}