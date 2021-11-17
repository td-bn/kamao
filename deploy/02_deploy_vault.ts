import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;

  const { deployer } = await getNamedAccounts();

  const controller =  await get("Controller");
  console.log("Controller Address: ", controller.address);

  await deploy("Vault", {
    from: deployer,
    args: [controller.address],
    log: true,
  });
};
export default func;
func.tags = ["Controller"];
