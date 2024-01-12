import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments } from "hardhat"
import { params } from "../config"

const deployFunction: DeployFunction = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const { swapRouter, nonfungiblePositionManager } = params.polygonMumbaiFork

    log(`UniswapV3Adapter is deploying...`)
    const adapter = await deploy(`UniswapV3Adapter`, {
        from: deployer,
        log: true,
        args: [swapRouter, nonfungiblePositionManager],
    })
    log(`UniswapV3Adapter Deployed! at ${adapter.address}`)
}

export default deployFunction
deployFunction.tags = [`all`, `UniswapV3Adapter`, `main`]
