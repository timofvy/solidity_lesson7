import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { UniswapV3Adapter, UniswapV3Adapter__factory, ERC20, ERC20__factory } from "../typechain";
import { expect } from "chai"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
const NONFUNGIBLE_POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"

const NAME_1 = "My Tim Token"
const SYMBOL_1 = "MTIM"
const DECIMALS = 18
const TOTAL_SUPPLY = ethers.utils.parseEther("20000000000").toBigInt()
const NAME_2 = "My SV Token"
const SYMBOL_2 = "MSV"

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
const badLiquidity = 1500000000000
const liquidity = 5000000 

describe("UniswapV3AdapterContract unit tests", function () {
    let signer1: SignerWithAddress
    let erc20Tim: ERC20
    let erc20Sv: ERC20
    let uniswapV3Adapter: UniswapV3Adapter
    let deployer: SignerWithAddress
    let token0: string
    let token1: string

    async function deployFixture() {
        [deployer, signer1] = await ethers.getSigners();
        erc20Tim = await new ERC20__factory(deployer).deploy(
            NAME_1,
            SYMBOL_1,
            DECIMALS,
            TOTAL_SUPPLY
        )
        erc20Sv = await new ERC20__factory(deployer).deploy(
            NAME_2,
            SYMBOL_2,
            DECIMALS,
            TOTAL_SUPPLY
        )
        
        token0 = erc20Tim.address
        token1 = erc20Sv.address

        uniswapV3Adapter = await new UniswapV3Adapter__factory(deployer).deploy(
            SWAP_ROUTER,
            NONFUNGIBLE_POSITION_MANAGER
        )

        return { erc20Tim, erc20Sv, uniswapV3Adapter, deployer, token0, token1, signer1};
    }

    it("should successful create pool", async function () {
        const { uniswapV3Adapter, token0, token1 } = await loadFixture(deployFixture);

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
        expect(eventCreatePoll[0].args.pool).to.equal('0x8fcb4b69DC2c01Ac21BE5839F03B64d52c623c1d') // address pool get after test
    })

    it("should successful mint", async function () {
        const { erc20Tim, erc20Sv, uniswapV3Adapter, token0, token1 } = await loadFixture(deployFixture);
        await uniswapV3Adapter.createPool(token0, token1, fee, reserve0, reserve1);

        await erc20Tim.approve(uniswapV3Adapter.address, amount0ToMint);
        await erc20Sv.approve(uniswapV3Adapter.address, amount1ToMint);
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

        expect(eventMint[0].args.tokenId).to.equal(1272368) // token ID get after test
    })

    it("should successful swap Input", async function () {
        const { erc20Tim, erc20Sv, uniswapV3Adapter, token0, token1 } = await loadFixture(deployFixture);
        await uniswapV3Adapter.createPool(token0, token1, fee, reserve0, reserve1);
        await erc20Tim.approve(uniswapV3Adapter.address, amount0ToMint);
        await erc20Sv.approve(uniswapV3Adapter.address, amount1ToMint);
        await uniswapV3Adapter.mintNewPosition(token0, token1, fee, amount0ToMint, amount1ToMint, MIN_TICK, MAX_TICK);

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

        const eventSwapIn = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.SwapInput(),
            txSwapIn?.blockNumber,
            txSwapIn?.blockNumber
        )
        expect(eventSwapIn[0].args.tokenIn).to.equal('0x7c28FC9709650D49c8d0aED2f6ece6b191F192a9');
        expect(eventSwapIn[0].args.amountIn).to.equal(ethers.utils.parseEther("0.5").toBigInt());
        expect(eventSwapIn[0].args.amountOut).to.equal(0);
    })

    it("should successful swap Output", async function () {
        const { erc20Tim, erc20Sv, uniswapV3Adapter, token0, token1 } = await loadFixture(deployFixture);
        await uniswapV3Adapter.createPool(token0, token1, fee, reserve0, reserve1);
        await erc20Tim.approve(uniswapV3Adapter.address, amount0ToMint);
        await erc20Sv.approve(uniswapV3Adapter.address, amount1ToMint);
        await uniswapV3Adapter.mintNewPosition(token0, token1, fee, amount0ToMint, amount1ToMint, MIN_TICK, MAX_TICK);

        await erc20Sv.approve(uniswapV3Adapter.address, amountInMaximum)
        const path = ethers.utils.solidityPack(
            ["address", "uint24", "address"],
            [token0, fee, token1]
        )

        const txSwapOut = await uniswapV3Adapter.swapExactOutput(
            token1,
            amountOut,
            amountInMaximum,
            path
        )

        const eventSwapOut = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.SwapOutput(),
            txSwapOut?.blockNumber,
            txSwapOut?.blockNumber
        )

        expect(eventSwapOut[0].args.tokenIn).to.equal('0xF407ed1303e3AE63a0e277AB7817A79A152e86Ef');
        expect(eventSwapOut[0].args.amountIn).to.equal(2);
        expect(eventSwapOut[0].args.amountOut).to.equal(ethers.utils.parseEther("0.5").toBigInt());
    })

    it("should successful increase liquidity, check OnlyOwner", async function () {
        const { erc20Tim, erc20Sv, uniswapV3Adapter, token0, token1 } = await loadFixture(deployFixture);
        await uniswapV3Adapter.createPool(token0, token1, fee, reserve0, reserve1);
        await erc20Tim.approve(uniswapV3Adapter.address, amount0ToMint);
        await erc20Sv.approve(uniswapV3Adapter.address, amount1ToMint);
        const txMint = await uniswapV3Adapter.mintNewPosition(token0, token1, fee, amount0ToMint, amount1ToMint, MIN_TICK, MAX_TICK);
        const eventMint = await uniswapV3Adapter.queryFilter(uniswapV3Adapter.filters.Mint(), txMint?.blockNumber, txMint?.blockNumber);
        const newTokenID = eventMint[0].args.tokenId;

        await erc20Tim.approve(uniswapV3Adapter.address, amountAdd0)
        await erc20Sv.approve(uniswapV3Adapter.address, amountAdd1)
        const increaseLiq = await uniswapV3Adapter.increaseLiquidity(newTokenID, amountAdd0, amountAdd1);
        await expect(uniswapV3Adapter.connect(signer1).increaseLiquidity(newTokenID, amountAdd0, amountAdd1)).to.be.revertedWithCustomError(uniswapV3Adapter, "OnlyOwner")
        
        const eventIncreaseLiq = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.IncreaseLiquidity(),
            increaseLiq?.blockNumber,
            increaseLiq?.blockNumber
        )

        expect(eventIncreaseLiq[0].args.tokenId).to.equal(1272368);
        expect(eventIncreaseLiq[0].args.liquidity).to.equal(2512147);
        expect(eventIncreaseLiq[0].args.amount0).to.equal(ethers.utils.parseEther("999.999628248789595943").toBigInt());
        expect(eventIncreaseLiq[0].args.amount1).to.equal(1);
    })

    it("should successful collect all fees", async function () {
        const { erc20Tim, erc20Sv, uniswapV3Adapter, token0, token1 } = await loadFixture(deployFixture);
        await uniswapV3Adapter.createPool(token0, token1, fee, reserve0, reserve1);
        await erc20Tim.approve(uniswapV3Adapter.address, amount0ToMint);
        await erc20Sv.approve(uniswapV3Adapter.address, amount1ToMint);
        const txMint = await uniswapV3Adapter.mintNewPosition(token0, token1, fee, amount0ToMint, amount1ToMint, MIN_TICK, MAX_TICK);
        const eventMint = await uniswapV3Adapter.queryFilter(uniswapV3Adapter.filters.Mint(), txMint?.blockNumber, txMint?.blockNumber);
        const newTokenID = eventMint[0].args.tokenId;

        let collectAllFees = await uniswapV3Adapter.collectAllFees(newTokenID);
        let eventCollect = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.Collect(),
            collectAllFees?.blockNumber,
            collectAllFees?.blockNumber
        )

        expect(eventCollect[0].args.tokenId).to.equal(1272368);
        expect(eventCollect[0].args.amount0).to.equal(0);
        expect(eventCollect[0].args.amount1).to.equal(0);

        await erc20Tim.approve(uniswapV3Adapter.address, amountIn)
        const path = ethers.utils.solidityPack(
            ["address", "uint24", "address"],
            [token0, fee, token1]
        )

        await uniswapV3Adapter.swapExactInput(
            token0,
            amountIn,
            amountOutMinimum,
            path
        )

        collectAllFees = await uniswapV3Adapter.collectAllFees(newTokenID);
        eventCollect = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.Collect(),
            collectAllFees?.blockNumber,
            collectAllFees?.blockNumber
        )

        expect(eventCollect[0].args.amount0).to.equal(ethers.utils.parseEther("0.000250000037926724").toBigInt());
        expect(eventCollect[0].args.amount1).to.equal(0);

        await erc20Sv.approve(uniswapV3Adapter.address, amountInMaximum)

        await uniswapV3Adapter.swapExactOutput(
            token1,
            amountOut,
            amountInMaximum,
            path
        )

        collectAllFees = await uniswapV3Adapter.collectAllFees(newTokenID);
        eventCollect = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.Collect(),
            collectAllFees?.blockNumber,
            collectAllFees?.blockNumber
        )
        expect(eventCollect[0].args.amount0).to.equal(0);
        expect(eventCollect[0].args.amount1).to.equal(0);
    })

    it("should successful decrease liquidity", async function () {
        const { erc20Tim, erc20Sv, uniswapV3Adapter, token0, token1 } = await loadFixture(deployFixture);
        await uniswapV3Adapter.createPool(token0, token1, fee, reserve0, reserve1);
        await erc20Tim.approve(uniswapV3Adapter.address, amount0ToMint);
        await erc20Sv.approve(uniswapV3Adapter.address, amount1ToMint);
        const txMint = await uniswapV3Adapter.mintNewPosition(token0, token1, fee, amount0ToMint, amount1ToMint, MIN_TICK, MAX_TICK);
        const eventMint = await uniswapV3Adapter.queryFilter(uniswapV3Adapter.filters.Mint(), txMint?.blockNumber, txMint?.blockNumber);
        const newTokenID = eventMint[0].args.tokenId;

        await expect(uniswapV3Adapter.decreaseLiquidity(newTokenID, badLiquidity)).to.be.revertedWithCustomError(uniswapV3Adapter, "InvalidLiquidity")
        await expect(uniswapV3Adapter.connect(signer1).decreaseLiquidity(newTokenID, liquidity)).to.be.revertedWithCustomError(uniswapV3Adapter, "OnlyOwner")

        const decreaseLiq = await uniswapV3Adapter.decreaseLiquidity(newTokenID, liquidity);
        const eventDecreaseLiq = await uniswapV3Adapter.queryFilter(
            uniswapV3Adapter.filters.DecreaseLiquidity(),
            decreaseLiq?.blockNumber,
            decreaseLiq?.blockNumber
        )

        expect(eventDecreaseLiq[0].args.tokenId).to.equal(1272368);
        expect(eventDecreaseLiq[0].args.amount0).to.equal(ethers.utils.parseEther("1990.328647664307852889").toBigInt());
        expect(eventDecreaseLiq[0].args.amount1).to.equal(0);
    })
})
