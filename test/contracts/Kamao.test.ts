import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, BigNumber } from "ethers";
// import { legos } from "@studydefi/money-legos";

const ONE_ETH = ethers.constants.WeiPerEther;
// // const wETHGatewayAddress = "0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04";
// const aWETHAddress = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e";

describe("Kamao", function () {
  let instance: any;
  let user: Signer;
  let aaveConnector: any;
  let contractAddress: any;

  before(async () => {
    const Kamao = await ethers.getContractFactory("Kamao");
    const AaveConnector = await ethers.getContractFactory("AaveConnector");
    aaveConnector = await AaveConnector.deploy();
    instance = await Kamao.deploy(aaveConnector.address);
    await instance.deployed();

    [user] = await ethers.getSigners();
    contractAddress = instance.address;
  });

  describe("deployement", () => {
    it("should be deployed to a non-zero address", async function () {
      expect(instance.address).not.to.equal(ethers.constants.AddressZero);
    });
  });

  describe("User deposit", () => {
    it("should increase the balance of user on successful deposits", async () => {
      await expect(instance.connect(user).deposit({ value: ONE_ETH }))
        .to.emit(instance, "Deposit")
        .withArgs(user.getAddress, ONE_ETH);

      expect(await instance.connect(user).getBalance()).equals(ONE_ETH);
    });
  });

  describe("Providing liquidity to Aave lending pool", async () => {
    it("should deposit into Aave and receive aWETH", async () => {
      const balanceBefore = await aaveConnector.getaWETHBalance(
        contractAddress
      );
      await instance.connect(user).provideLiquidity();
      const balanceAfter = await aaveConnector.getaWETHBalance(contractAddress);
      expect(balanceAfter.gt(BigNumber.from(0)));
      expect(balanceAfter.gt(balanceBefore));
    });
  });

  describe("Removing liquidity from Aave", () => {
    it("should get back the depositied ETH from Aave", async () => {
      const balanceBefore = await aaveConnector.getaWETHBalance(
        contractAddress
      );

      await instance.connect(user).withdrawLiquidity(ONE_ETH);
      const balanceAfter = await aaveConnector.getaWETHBalance(contractAddress);
      expect(balanceAfter.lt(balanceBefore));
    });
  });
});
