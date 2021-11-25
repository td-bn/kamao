import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const lendingPoolProviderAddress = "0x88757f2f99175387aB4C6a4b3067c77A695b0349";
const WETHGatewayAddress = "0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70";
const aWETHTokenAddress = "0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347";

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
