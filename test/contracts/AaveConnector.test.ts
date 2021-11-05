import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { getAaveConnectorInstance } from "../utils/instances";
import { ADDRESS_ZERO, parseEther } from "../utils/ethers";

describe("AaveConnector", function () {
  let instance: any;
  let user: Signer;

  before(async () => {
    instance = await getAaveConnectorInstance();
    [user] = await ethers.getSigners();
  });

  describe("deployement", () => {
    it("should be deployed to a non-zero address", async function () {
      expect(instance.address).not.to.equal(ADDRESS_ZERO);
    });
  });

  describe("lendingPoolAddressProvider", () => {
    it("should fetch correct lending pool address", async () => {
      const address = await instance.getAaveLendingPool();
      expect(address).not.to.equal(ADDRESS_ZERO);
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
      expect(balance.gt(ADDRESS_ZERO));
    });
  });
});
