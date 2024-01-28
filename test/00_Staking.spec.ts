import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import {
    loadFixture,
    time,
    takeSnapshot,
    SnapshotRestorer,
} from "@nomicfoundation/hardhat-network-helpers"
import { TokenStaking, TokenStaking__factory } from "../typechain"
import { ERC20__factory } from "../typechain/factories/02_ERC20.sol"
import { ERC20 } from "../typechain/02_ERC20.sol"

const NAME = "My Tim Token"
const SYMBOL = "MTIM"
const DECIMALS = 18
const TOTAL_SUPPLY = ethers.utils.parseEther("20000000000").toBigInt()

const rewardPercentage = 10
const maxStakeAmount = ethers.utils.parseEther("1000").toBigInt()
const amountForReward = ethers.utils.parseEther("10").toBigInt()
const stakeAmount = ethers.utils.parseEther("1").toBigInt()
const startTime = 0
const lockPeriod = 0

describe("Staking unit tests", function () {
    let signer1: SignerWithAddress
    let erc20: ERC20
    let deployer: SignerWithAddress
    let tokenStaking: TokenStaking
    let snapshot: SnapshotRestorer

    async function deployFixture() {
        ;[deployer, signer1] = await ethers.getSigners()
        erc20 = await new ERC20__factory(deployer).deploy(NAME, SYMBOL, DECIMALS, TOTAL_SUPPLY)

        tokenStaking = await new TokenStaking__factory(deployer).deploy(
            erc20.address,
            erc20.address,
            rewardPercentage,
            startTime,
            lockPeriod,
            maxStakeAmount
        )

        erc20.transfer(tokenStaking.address, amountForReward)

        snapshot = await takeSnapshot()
        return { erc20, tokenStaking }
    }

    it("should throw an error if the function deposit, no deposit", async function () {
        // await loadFixture(deployFixture);
        await deployFixture()
        await expect(tokenStaking.claimRewards()).to.be.revertedWithCustomError(
            tokenStaking,
            "DepositNotFound"
        )
    })

    it("should successful deposit", async function () {
        await erc20.approve(tokenStaking.address, stakeAmount)
        const txStaking = await tokenStaking.deposit(stakeAmount)
        const eventStaking = await tokenStaking.queryFilter(
            tokenStaking.filters.Deposit(),
            txStaking?.blockNumber,
            txStaking?.blockNumber
        )

        expect(eventStaking[0].args.amount).to.equal(ethers.utils.parseEther("1").toBigInt())
    })

    it("should throw an error if the function deposit", async function () {
        // await snapshot.restore();
        await expect(tokenStaking.deposit(0)).to.be.revertedWithCustomError(
            tokenStaking,
            "AmountAllowanceBelowZero"
        )
    })

    it("should successful claimRewards", async function () {
        time.increase(8640000) // 100 days
        const txSclaimRewards = await tokenStaking.claimRewards()
        const eventClaimRewards = await tokenStaking.queryFilter(
            tokenStaking.filters.RewardClaimed(),
            txSclaimRewards?.blockNumber,
            txSclaimRewards?.blockNumber
        )

        expect(eventClaimRewards[0].args.amount).to.equal("27397263444951795") //0,0273785 eth за 100 дней
        await erc20.increaseAllowance(deployer.address, "27378511040129794")
    })

    it("should throw an error if the function deposit, reward already claimed", async function () {
        await expect(tokenStaking.claimRewards()).to.be.revertedWithCustomError(
            tokenStaking,
            "RewardAlreadyClaimed"
        )
    })

    it("should successful withdraw", async function () {
        const txWithdraw = await tokenStaking.withdraw()
        const eventWithdraw = await tokenStaking.queryFilter(
            tokenStaking.filters.Withdraw(),
            txWithdraw?.blockNumber,
            txWithdraw?.blockNumber
        )
        expect(eventWithdraw[0].args.amount).to.equal(ethers.utils.parseEther("1").toBigInt())
        await erc20.increaseAllowance(deployer.address, ethers.utils.parseEther("1").toBigInt())
    })
})
