//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "../interfaces/IStrategy.sol";

contract Controller {
    using SafeMath for uint256;

    address public vault;
    address public governance;
    address public strategy;

    constructor() {
        governance = msg.sender;
    }

    function setVault(address _vault) external {
        require(msg.sender == governance, "!governance");
        vault = _vault;
    }

    function setStrategy(address _strategy) external {
        require(msg.sender == governance, "!governance");
        strategy = _strategy;
    }

    function earn(uint256 _amount) external {
        require(strategy != address(0), "no strategy");
        _safeTransferETH(strategy, _amount);
        IStrategy(strategy).deposit();
    }

    function withdrawAll() external {
        require(msg.sender == governance, "!governance");
        // Strategy.withdrawAll
        IStrategy(strategy).withdrawAll();
    }

    function withdraw(uint256 _amount) external {
        require(msg.sender == vault, "!vault");
        // Strategy.withdraw
        IStrategy(strategy).withdraw(_amount);
    }

    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'ETH_TRANSFER_FAILED');
    }

    receive() external payable {}
}