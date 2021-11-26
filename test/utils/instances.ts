import { ethers } from "hardhat";

const lendingPoolProviderAddress = "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5";
const WETHGatewayAddress = "0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04";
const aWETHTokenAddress = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e";

export const getAaveConnectorInstance = async (
  poolProvider: string | undefined,
  wethGateway: string | undefined
) => {
  const Aave = await ethers.getContractFactory("AaveConnector");
  const instance = await Aave.deploy(poolProvider, wethGateway, wethGateway);
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

export const getVaultInstance = async (controller: { address: any }) => {
  const Vault = await ethers.getContractFactory("Vault");
  const instance = await Vault.deploy(controller.address);
  await instance.deployed();
  return instance;
};

export const getControllerInstance = async () => {
  const Controller = await ethers.getContractFactory("Controller");
  const instance = await Controller.deploy();
  await instance.deployed();
  return instance;
};

export const getMockWethGateway = async () => {
  const Gateway = await ethers.getContractFactory("MockWethGateway");
  const instance = await Gateway.deploy();
  await instance.deployed();
  return instance;
};

export const getMockLengingPoolProviderInstance = async () => {
  const PoolProvider = await ethers.getContractFactory(
    "MockLendingPoolProvider"
  );
  const instance = await PoolProvider.deploy();
  await instance.deployed();
  return instance;
};

export const getETHStrategyInstance = async (
  controller: { address: any },
  aaveConnector: { address: any },
  wethGateway: { address: any },
) => {
  const ETHStrategy = await ethers.getContractFactory("ETHStrategy");
  const instance = await ETHStrategy.deploy(
    controller.address,
    aaveConnector.address,
    wethGateway.address,
    wethGateway.address
  );
  await instance.deployed();
  return instance;
};
