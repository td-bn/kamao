//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IAaveConnector.sol";
import "../interfaces/IWETHGateway.sol";
import "hardhat/console.sol";

contract Kamao {
    address public aaveInterfaceAddress;
    address public wethGatewayAddress = 0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04;
    address public aWETHAddress = 0x030bA81f1c18d280636F32af80b9AAd02Cf0854e;

    mapping(address => uint256) balances;

    event Deposit(address indexed _user, uint256 _amount);

    constructor(address _aaveConnector) {
        aaveInterfaceAddress = _aaveConnector;
    }

    function deposit() external payable {
        require(msg.value > 0, "No amount transferred");

        balances[msg.sender] = msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() external view returns(uint256) {
        return balances[msg.sender];
    }

    function provideLiquidity() external {
        _depositIntoAavePool();
    }

    function withdrawLiquidity(uint256 _amount) external {
        _withdrawFromAavePool(_amount);
    }

    function _depositIntoAavePool() internal {
        IAaveConnector aaveConnector = IAaveConnector(aaveInterfaceAddress);
        uint256 ethBalance = address(this).balance;
        aaveConnector.depositETH{value: address(this).balance}(address(this));
        require(
            aaveConnector.getaWETHBalance(address(this)) >= ethBalance,
            "aWETH balance less than ETH balance"
        );
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
    
    receive() external payable {}
}
