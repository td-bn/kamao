/**
 * Connect controller to vault and strategy
 * The controller acts like a middleman between the two contracts.
 **/
import { deployments } from "hardhat";
import * as dotenv from "dotenv";
import { ethers, Contract } from "ethers";

dotenv.config();

async function main() {
  const { get } = deployments;

  const key = process.env.PRIVATE_KEY || "";
  const prov = process.env.KOVAN_URL || "";
  if (key === "" || prov === "") {
    console.log("Please set environment variables in .env");
    return;
  }
  const provider = ethers.getDefaultProvider(prov);
  const wallet = new ethers.Wallet(key).connect(provider);

  const controller = await get("Controller");
  console.log("Controller Address: ", controller.address);
  const controllerInstance = new Contract(
    controller.address,
    controller.abi,
    wallet
  );

  const vault = await get("Vault");
  const strategy = await get("ETHStrategy");

  console.log("Vault instance address: ", vault.address);
  console.log("Strategy instance address: ", strategy.address);

  try {
    await controllerInstance.connect(wallet).setVault(vault.address);
    await controllerInstance.connect(wallet).setStrategy(strategy.address);
  } catch (error) {
    console.log("Failed to set vault and strategy in controller: \n", error);
  }

  console.log("Set vault to: ", await controllerInstance.vault());
  console.log("Set strategy to: ", await controllerInstance.strategy());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
