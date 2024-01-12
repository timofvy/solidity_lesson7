import { verify } from "../scripts/helpers/verify"
import { params } from "../config"

const verifyFunction = async () => {
    console.log(`ERC20 is verifying...`)
    const { uniswapV3Adapter, swapRouter, nonfungiblePositionManager } = params.polygonMumbai
    const verified = await verify(uniswapV3Adapter, [swapRouter, nonfungiblePositionManager])
    console.log(`ERC20 Verified! at ${verified}`)
}

verifyFunction()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
