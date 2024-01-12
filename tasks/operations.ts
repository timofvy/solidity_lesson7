import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { UniswapV3Adapter } from "../typechain"
import { params } from "../config"

task("createPool", "makes new poll")
    .addParam("token0")
    .addParam("token1")
    .addParam("fee")
    .addParam("reserve0")
    .addParam("reserve1")
    .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
        const { uniswapV3Adapter } = params.polygonMumbaiFork
        const instance: UniswapV3Adapter = <UniswapV3Adapter>(
            await hre.ethers.getContractAt("UniswapV3Adapter", uniswapV3Adapter as string)
        )
        const tx = await instance.createPool(
            taskArgs.token0,
            taskArgs.token1,
            taskArgs.fee,
            taskArgs.reserve0,
            taskArgs.reserve1
        )
        console.log(`tx: ${JSON.stringify(tx)}`)
    })
