//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Vault is ERC20 {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    constructor()
        ERC20("kamao ETH", "kETH")
    { }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

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

    function withdraw(uint256 _shares) external {
        uint256 _pool = balance();
        uint256 due = _pool.mul(_shares).div(totalSupply());

        _burn(msg.sender, _shares);

        // TODO Check balance and request from pool if its lower than due
        
        _safeTransferETH(msg.sender, due);
    }

    function getPricePerFullShare() external view returns (uint256) {
        return balance().mul(1e18).div(totalSupply());
    }

    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'ETH_TRANSFER_FAILED');
    }
}