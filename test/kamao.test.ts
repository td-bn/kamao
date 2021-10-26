import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";

const ONE_ETH = ethers.constants.WeiPerEther;

describe("Kamao", function () {
  let instance: any;
  let user: Signer;

  before(async () => {
    const Kamao = await ethers.getContractFactory("Kamao");
    instance = await Kamao.deploy();
    await instance.deployed();

    [user] = await ethers.getSigners();
  });

  describe("deployement", () => {
    it("should be deployed to a non-zero address", async function () {
      expect(instance.address).not.to.equal(ethers.constants.AddressZero);
    });
  });

  describe("deposit", () => {
    it("should increase the balance on successful deposits", async () => {
      await expect(instance.connect(user).deposit({ value: ONE_ETH }))
        .to.emit(instance, "Deposit")
        .withArgs(user.getAddress, ONE_ETH);

      expect( await instance.connect(user).getBalance()).equals(ONE_ETH);
    });
  });
});
