import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const lendingPoolProviderAddress = "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5";
const WETHGatewayAddress = "0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04";
const aWETHTokenAddress = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("AaveConnector", {
    from: deployer,
    args: [lendingPoolProviderAddress, WETHGatewayAddress, aWETHTokenAddress],
    log: true,
  });
};
export default func;
func.tags = ["AaveConnector"];
