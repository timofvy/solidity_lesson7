import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { UniswapV3Adapter, UniswapV3Adapter__factory, ERC20, ERC20__factory } from "../typechain"
import { expect } from "chai"

/*
  async function deployOneYearLockFixture() {
    const lockedAmount = 1_000_000_000;
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const lock = await ethers.deployContract("Lock", [unlockTime], {
      value: lockedAmount,
    });

    return { lock, unlockTime, lockedAmount };
  }

  it("Should set the right unlockTime", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

*/

const SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
const NONFUNGIBLE_POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"

const NAME_1 = "My Tim Token"
const SYMBOL_1 = "MTIM"
const DECIMALS_1 = 18
const TOTAL_SUPPLY_1 = ethers.utils.parseEther("20000000000").toBigInt()
const NAME_2 = "My SV Token"
const SYMBOL_2 = "MSV"
const DECIMALS_2 = 18
const TOTAL_SUPPLY_2 = ethers.utils.parseEther("20000000000").toBigInt()

const fee = 500
const reserve0 = ethers.utils.parseEther("1000000").toBigInt()
const reserve1 = ethers.utils.parseEther("2000000").toBigInt()

const amount0ToMint = ethers.utils.parseEther("20000").toBigInt()
const amount1ToMint = ethers.utils.parseEther("100000").toBigInt()

const MIN_TICK = -885000
const MAX_TICK = 885000
// SWAP_input
const amountIn = ethers.utils.parseEther("0.5").toBigInt()
const amountOutMinimum = ethers.utils.parseEther("0").toBigInt()
// SWAP_output
const amountOut = ethers.utils.parseEther("0.5").toBigInt()
const amountInMaximum = ethers.utils.parseEther("100000").toBigInt()

// increaseLiquidity
const amountAdd0 = ethers.utils.parseEther("1000").toBigInt()
const amountAdd1 = ethers.utils.parseEther("1500").toBigInt()

// decreaseLiquidity
const badLiquidity = ethers.utils.parseEther("0.1").toBigInt()
const liquidity = 5000000 //ethers.utils.parseEther("0.00000000000000005").toBigInt()

describe("UniswapV3AdapterContract unit tests", function () {
    let signer1: SignerWithAddress
    let erc20Tim: ERC20
    let erc20Sv: ERC20
    let uniswapV3Adapter: UniswapV3Adapter
    let deployer: SignerWithAddress
    let token0: string
    let token1: string

    beforeEach(async () => {
        [deployer, signer1] = await ethers.getSigners();
        erc20Tim = await new ERC20__factory(deployer).deploy(
            NAME_1,
            SYMBOL_1,
            DECIMALS_1,
            TOTAL_SUPPLY_1
        )
        erc20Sv = await new ERC20__factory(deployer).deploy(
            NAME_2,
            SYMBOL_2,
            DECIMALS_2,
            TOTAL_SUPPLY_2
        )
        token0 = erc20Tim.address
        token1 = erc20Sv.address

        uniswapV3Adapter = await new UniswapV3Adapter__factory(deployer).deploy(
            SWAP_ROUTER,
            NONFUNGIBLE_POSITION_MANAGER
        )
    })

    it("should successful create pool, mint", async function () {
        // Create mint
        const txCreatePoll = await uniswapV3Adapter.createPool(
            token0,
            token1,
            fee,
            reserve0,
            reserve1
        )

        const eventCreatePoll = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.CreatePool(),
            txCreatePoll?.blockNumber,
            txCreatePoll?.blockNumber
        )

        console.log(`Address POOL: ${eventCreatePoll[0].args.pool}`)

        // MINT
        await erc20Tim.approve(uniswapV3Adapter.address, amount0ToMint)
        await erc20Sv.approve(uniswapV3Adapter.address, amount1ToMint)
        const txMint = await uniswapV3Adapter.mintNewPosition(
            token0,
            token1,
            fee,
            amount0ToMint,
            amount1ToMint,
            MIN_TICK,
            MAX_TICK
        )

        const eventMint = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.Mint(),
            txMint?.blockNumber,
            txMint?.blockNumber
        )
        const newTokenID = eventMint[0].args.tokenId;
        console.log(`Token ID: ${newTokenID}`);
        console.log(
            `Deposit (owner, liquidity, token0, token1): ${await uniswapV3Adapter.deposits(
                newTokenID
            )}`
        )
        // SWAP Input
        await erc20Tim.approve(uniswapV3Adapter.address, amountIn)
        const path = ethers.utils.solidityPack(
            ["address", "uint24", "address"],
            [token0, fee, token1]
        )

        const txSwapIn = await uniswapV3Adapter.swapExactInput(
            token0,
            amountIn,
            amountOutMinimum,
            path
        )

        //console.log('SwapIn---', txSwapIn);

        // SWAP Output
        await erc20Sv.approve(uniswapV3Adapter.address, amountInMaximum)

        const txSwapOut = await uniswapV3Adapter.swapExactOutput(
            token1,
            amountOut,
            amountInMaximum,
            path
        )

        //console.log('SwapOut---', txSwapOut);

        // increaseLiquidity
        await erc20Tim.approve(uniswapV3Adapter.address, amountAdd0)
        await erc20Sv.approve(uniswapV3Adapter.address, amountAdd1)
        const increaseLiq = await uniswapV3Adapter.increaseLiquidity(newTokenID, amountAdd0, amountAdd1);

        //console.log('Increase Liquidity---', increaseLiq);

        // await expect(uniswapV3Adapter.connect(signer1).increaseLiquidity(newTokenID, amountAdd0, amountAdd1)).to.be.revertedWithCustomError(uniswapV3Adapter, "OnlyOwner")
  
        // collectAllFees
        const collectAllFees = await uniswapV3Adapter.collectAllFees(newTokenID);
        const eventCollect = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.Collect(),
            collectAllFees?.blockNumber,
            collectAllFees?.blockNumber
        )
        // console.log(111111111, eventCollect[0].args);
        //console.log('CollectAllFees---', collectAllFees);
      
        // decreaseLiquidity
        await expect(uniswapV3Adapter.decreaseLiquidity(newTokenID, badLiquidity)).to.be.revertedWithCustomError(uniswapV3Adapter, "InvalidLiquidity")
        await expect(uniswapV3Adapter.connect(signer1).decreaseLiquidity(newTokenID, liquidity)).to.be.revertedWithCustomError(uniswapV3Adapter, "OnlyOwner")
        //TODO

        console.log(111111111, 
            await erc20Tim.balanceOf(uniswapV3Adapter.address),
            await erc20Sv.balanceOf(uniswapV3Adapter.address)
            );
        const decreaseLiq = await uniswapV3Adapter.decreaseLiquidity(newTokenID, liquidity);
        const eventDecreaseLiq = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.DecreaseLiquidity(),
            decreaseLiq?.blockNumber,
            decreaseLiq?.blockNumber
        )
        console.log(222222, eventDecreaseLiq[0].args,
             await erc20Tim.balanceOf(uniswapV3Adapter.address),
             await erc20Sv.balanceOf(uniswapV3Adapter.address)
             );
        console.log('Decrease Liquidity---', decreaseLiq);
    })
})
