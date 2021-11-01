import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, utils } from "ethers";

const parseEther = utils.parseEther;
const AddressZero = ethers.constants.AddressZero;

describe("Aave", function () {
  let instance: any;
  let user: Signer;

  before(async () => {
    const Aave = await ethers.getContractFactory("Aave");
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
      const address = await instance.connect(user).getLendingPool();
      expect(address).not.to.equal(AddressZero);
    });
  });

  describe("ETH deposits", () => {
    let userAddress: any;
    before(async () => {
      userAddress = await user.getAddress();
      await instance.connect(user).getLendingPool();
    });

    it("should deposit ETH into the AAVE protocol", async () => {
      const success = await instance
        .connect(user)
        .depositETH(userAddress, { value: parseEther("1") });
      expect(success);
    });

    it("aWETH balance of owner should be greater than 0", async () => {
      const balance = await instance.connect(user).getETHBalance(userAddress);
      expect(balance.gt(AddressZero));
    });
  });
});
