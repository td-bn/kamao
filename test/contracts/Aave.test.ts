import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";

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
      expect(instance.address).not.to.equal(ethers.constants.AddressZero);
    });
  });

  describe("lendingPoolAddressProvider", () => {
    it("should fetch correct lending pool address", async () => {
      const address = await instance.connect(user).getLendingPool();
      expect(address).not.to.equal(ethers.constants.AddressZero);
    });
  });
});
