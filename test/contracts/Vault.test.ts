import { getVaultInstance } from "../utils/instances";
import { expect } from "chai";
import { ADDRESS_ZERO, ONE_ETH } from "../utils/ethers";
import { Signer } from "ethers";
import { ethers } from "hardhat";

describe("Vault", () => {
  let instance: any;
  let user: Signer;

  before(async () => {
    instance = await getVaultInstance();
    [, user] = await ethers.getSigners();
  });

  describe("Deployement", () => {
    it("Should be deployed to a non-zero address", async () => {
      expect(instance.address).not.to.equal(ADDRESS_ZERO);
    });

    it("should have set name and symbol", async () => {
      expect(await instance.name()).to.equal("kamao ETH");
      expect(await instance.symbol()).to.equal("kETH");
    });
  });

  describe("Deposits and withdrawals", () => {
    let userAddress: any;

    before(async () => {
      userAddress = await user.getAddress();
    });

    it("should increase token balance of user on deposit", async () => {
      let balance = await instance.balanceOf(userAddress);
      await instance.connect(user).deposit(ONE_ETH, { value: ONE_ETH });
      balance = await instance.balanceOf(userAddress);
      expect(balance.gt(0));
    });

    it("should decrease token balance of user on withdrawal", async () => {
      let balance = await instance.balanceOf(userAddress);
      await instance.connect(user).withdraw(ONE_ETH);
      balance = await instance.balanceOf(userAddress);
      expect(balance.eq(0));
    });
  });
});
