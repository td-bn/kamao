//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IAaveConnector.sol";
import "../interfaces/IWETHGateway.sol";
import "hardhat/console.sol";

contract Kamao is Ownable, ReentrancyGuard{
    address public aaveInterfaceAddress;
    address public wethGatewayAddress;
    address public aWETHAddress;

    mapping(address => uint256) balances;

    event Deposit(address indexed _user, uint256 _amount);
    event Withdrawal(address indexed _user, uint256 _amount);

    constructor(address _aaveConnector, address _wethGatewayAddress, address _aWETHToken) {
        aaveInterfaceAddress = _aaveConnector;
        wethGatewayAddress = _wethGatewayAddress;
        aWETHAddress = _aWETHToken;
    }

    function deposit() external payable {
        require(msg.value > 0, "No amount transferred");

        balances[msg.sender] = msg.value;
        _depositIntoAavePool(msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    
    function withdraw(uint256 _amount) nonReentrant external {
        require(balances[msg.sender] >= _amount, "amount requested greater than balance");

        balances[msg.sender] -= _amount;
        _withdrawFromAavePool(_amount);
        _safeTransferETH(msg.sender, _amount);

        emit Withdrawal(msg.sender, _amount);
    }

    // TODO Change to getBalance(address _account)
    function getBalance() external view returns(uint256) {
        return balances[msg.sender];
    }

    // function provideLiquidity() external onlyOwner {
    //     _depositIntoAavePool(address(this).balance);
    // }

    function _depositIntoAavePool(uint256 _amount) internal {
        IAaveConnector aaveConnector = IAaveConnector(aaveInterfaceAddress);
        aaveConnector.depositETH{value: _amount}(address(this));
    }

    function _withdrawFromAavePool(uint256 _amount) internal {
        IAaveConnector aaveConnector = IAaveConnector(aaveInterfaceAddress);
        address lendingPool = aaveConnector.getAaveLendingPool();

        // Approve burning of aWETH
        IERC20 aWETH = IERC20(aWETHAddress);
        aWETH.approve(wethGatewayAddress, _amount);


        IWETHGateway wethGateway = IWETHGateway(wethGatewayAddress);
        wethGateway.withdrawETH(lendingPool, _amount, address(this));
    }

    /* @dev transfer ETH to an address, revert if it fails.
    *  @param to recipient of the transfer
    *  @param value the amount to send
    */
    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'ETH_TRANSFER_FAILED');
    }
    
    receive() external payable {}
}
