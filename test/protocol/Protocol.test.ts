import {
  getVaultInstance,
  getControllerInstance,
  getAaveConnectorInstance,
  getETHStrategyInstance,
} from "../utils/instances";
import { expect } from "chai";
import { ONE_ETH } from "../utils/ethers";
import { Signer } from "ethers";
import { ethers } from "hardhat";

describe("Controller", () => {
  let controllerInstance: any;
  let vaultInstance: any;
  let strategyInstance: any;
  let aaveConnector: any;

  let governance: Signer;
  let user: Signer;

  before(async () => {
    controllerInstance = await getControllerInstance();
    vaultInstance = await getVaultInstance(controllerInstance);
    aaveConnector = await getAaveConnectorInstance();
    strategyInstance = await getETHStrategyInstance(
      controllerInstance,
      aaveConnector
    );
    [governance, user] = await ethers.getSigners();
  });

  describe("setting vault address", () => {
    it("should allow governance to set vault", async () => {
      await controllerInstance
        .connect(governance)
        .setVault(vaultInstance.address);
      expect(await controllerInstance.vault()).to.equal(vaultInstance.address);
    });

    it("should not allow non-governance to set vault", async () => {
      await expect(
        controllerInstance.connect(user).setVault(vaultInstance.address)
      ).to.be.reverted;
    });
  });

  describe("setting strategy address", () => {
    it("should allow governance to set strategy", async () => {
      await controllerInstance
        .connect(governance)
        .setStrategy(strategyInstance.address);
      expect(await controllerInstance.strategy()).to.equal(
        strategyInstance.address
      );
    });

    it("should not allow non-governance to set strategy", async () => {
      await expect(
        controllerInstance.connect(user).setStrategy(strategyInstance.address)
      ).to.be.reverted;
    });
  });

  describe("Protocol", () => {
    let userAddress: any;

    before(async () => {
      userAddress = await user.getAddress();
      await vaultInstance
        .connect(user)
        .deposit(100, { value: ONE_ETH.mul(100) });
    });

    it("should deposit available funds in Aave", async () => {
      await vaultInstance.earn();
      const balance = await aaveConnector.getaWETHBalance(
        strategyInstance.address
      );
      expect(balance.gt(0));
    });

    it("should allow user to withdraw some funds", async () => {
      const balBefore = await vaultInstance.balanceOf(userAddress);

      await vaultInstance.connect(user).withdraw(10);

      const balAfter = await vaultInstance.balanceOf(userAddress);
      const strategyBalance = await aaveConnector.getaWETHBalance(
        strategyInstance.address
      );

      expect(balAfter.lt(balBefore));
      expect(strategyBalance.lt(100));
    });

    it("should not allow removal of all funds if not governance", async () => {
      await expect(controllerInstance.connect(user).withdrawAll()).to.be
        .reverted;
    });

    it("should remove all funds when decided by governance", async () => {
      await controllerInstance.connect(governance).withdrawAll();
      const strategyBalance = await aaveConnector.getaWETHBalance(
        strategyInstance.address
      );
      expect(strategyBalance.eq(0));
    });
  });
});
