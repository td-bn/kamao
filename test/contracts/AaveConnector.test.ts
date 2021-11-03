import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, utils } from "ethers";
import { legos } from "@studydefi/money-legos";

const parseEther = utils.parseEther;
const AddressZero = ethers.constants.AddressZero;
const wETHGatewayAddress = "0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04";
const aWETHAddress = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e";

describe("AaveConnector", function () {
  let instance: any;
  let user: Signer;

  before(async () => {
    const Aave = await ethers.getContractFactory("AaveConnector");
    instance = await Aave.deploy();
    await instance.deployed();

    [user] = await ethers.getSigners();
  });

  describe("deployement", () => {
    it("should be deployed to a non-zero address", async function () {
      expect(instance.address).not.to.equal(AddressZero);
    });
  });

  describe("lendingPoolAddressProvider", () => {
    it("should fetch correct lending pool address", async () => {
      const address = await instance.aaveLendingPool();
      expect(address).not.to.equal(AddressZero);
    });
  });

  describe("ETH deposits", () => {
    let userAddress: any;
    before(async () => {
      userAddress = await user.getAddress();
    });

    it("should deposit ETH into the AAVE protocol", async () => {
      const success = await instance
        .connect(user)
        .depositETH(userAddress, { value: parseEther("10") });
      expect(success);
    });

    it("aWETH balance of owner should be greater than 0", async () => {
      const balance = await instance.getaWETHBalance(userAddress);
      expect(balance.gt(AddressZero));
    });
  });

  describe("ETH withdrawals", () => {
    let userAddress: any;
    let aTokenContract: any;
    let wethGateway: any;
    const wethGatewayABI = [
      "function withdrawETH( address lendingPool, uint256 amount, address onBehalfOf)",
    ];
    let lendingPoolAddress: any;

    before(async () => {
      userAddress = await user.getAddress();
      aTokenContract = new ethers.Contract(aWETHAddress, legos.erc20.abi, user);
      wethGateway = new ethers.Contract(
        wETHGatewayAddress,
        wethGatewayABI,
        user
      );
      lendingPoolAddress = await instance.aaveLendingPool();
    });

    it("should allow withdrawal of deposited amount", async () => {
      const balanceInitial = await aTokenContract.balanceOf(userAddress);
      await aTokenContract
        .connect(user)
        .approve(wETHGatewayAddress, parseEther("1"));
      await aTokenContract
        .connect(user)
        .allowance(userAddress, wETHGatewayAddress);

      await wethGateway
        .connect(user)
        .withdrawETH(lendingPoolAddress, parseEther("1"), userAddress);
      const balanceNow = await aTokenContract.balanceOf(userAddress);
      expect(balanceNow.lt(balanceInitial));
    });
  });
});
