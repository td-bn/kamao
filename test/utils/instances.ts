import { ethers } from "hardhat";

const lendingPoolProviderAddress = "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5";
const WETHGatewayAddress = "0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04";
const aWETHTokenAddress = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e";

export const getAaveConnectorInstance = async () => {
  const Aave = await ethers.getContractFactory("AaveConnector");
  const instance = await Aave.deploy(
    lendingPoolProviderAddress,
    WETHGatewayAddress,
    aWETHTokenAddress
  );
  await instance.deployed();
  return instance;
};

export const getKamaoInstance = async (aaveConnectorInstance: {
  address: any;
}) => {
  const Kamao = await ethers.getContractFactory("Kamao");
  const instance = await Kamao.deploy(
    aaveConnectorInstance.address,
    WETHGatewayAddress,
    aWETHTokenAddress
  );
  await instance.deployed();
  return instance;
};

export const getVaultInstance = async () => {
  const Vault = await ethers.getContractFactory("Vault");
  const instance = await Vault.deploy();
  await instance.deployed();
  return instance;
}
