//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "../interfaces/IController.sol";

/**
    @notice Contract for storing funds. 
    @dev This is the only contract that users interact with.
*/
contract Vault is ERC20 {
    using SafeMath for uint256;
    address public controller;

    /// @notice Initializes Eth vault with a ktoken 'kETH'
    constructor(address _controller)
        ERC20("kamao ETH", "kETH")
    { 
        controller = _controller;
    }

    /// @notice Returns the ETH balance of the contract
    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    /// @notice Deposit funds into the smart contract
    function deposit(uint256 _amount) external payable {
        uint256 _pool = balance();
        _amount = msg.value;

        uint shares = 0;
        if (totalSupply() == 0) {
            shares = _amount;
        } else {
            shares = _amount.mul(totalSupply()).div(_pool);
        }
        _mint(msg.sender, shares);
    }

    /// @notice Tranfers the funds to controller
    function earn() external {
        uint256 _balance = balance();
        _safeTransferETH(controller, _balance);
        IController(controller).earn(_balance);
    }

    /// @notice Lets user withdraw money
    /// @dev Withdraws from strategy if contract does not have enough funds for withdrawal
    function withdraw(uint256 _shares) external {
        uint256 _pool = balance();
        uint256 due = _pool.mul(_shares).div(totalSupply());

        _burn(msg.sender, _shares);

        if (balance() < due) {
            IController(controller).withdraw(due);
        }
        
        _safeTransferETH(msg.sender, due);
    }

    /// @notice Returns the price of one k token
    function getPricePerFullShare() external view returns (uint256) {
        return balance().mul(1e18).div(totalSupply());
    }

    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "ETH_TRANSFER_FAILED");
    }

    receive() external payable {}
}