import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { ERC20, ERC20__factory } from "../typechain"

const NAME = "My Tim Token";
const SYMBOL = "MTIM";
const DECIMALS = 6;
const TOTAL_SUPPLY = 100_000_000;
const valueTransfer = 100_000;
const badValue = 200_000_000;
const valueAllow = 50_000;
const valueIncreaseAllow = 20_000;
const zeroAddress = ethers.constants.AddressZero;

describe("ERC20Contract unit tests", function () {
    let myErc20: ERC20
    let signer1: SignerWithAddress
    let signer2: SignerWithAddress
    let signer3: SignerWithAddress
    let deployer: SignerWithAddress

    beforeEach(async () => {
        [deployer, signer1, signer2, signer3] = await ethers.getSigners()

        myErc20 = await new ERC20__factory(deployer).deploy(NAME, SYMBOL, DECIMALS, TOTAL_SUPPLY);
    })

    it("the parameters specified during deployment were returned correctly", async function () {
        expect(await myErc20.name()).to.be.eq(NAME)
        expect(await myErc20.symbol()).to.be.eq(SYMBOL)
        expect(await myErc20.decimals()).to.be.eq(DECIMALS)
        expect(await myErc20.totalSupply()).to.be.eq(TOTAL_SUPPLY)
        expect(await myErc20.balanceOf(deployer.address)).to.be.eq(TOTAL_SUPPLY)
    })

    it("should the transfer of tokens was worked out correctly", async function () {
        await expect( myErc20.transfer(signer2.address, valueTransfer ))
        .changeTokenBalances(myErc20, [deployer.address, signer2.address], [-valueTransfer, valueTransfer]);
    })

    it("should throw an error if there are insufficient funds", async function () {
        await expect(myErc20.transfer(signer2.address, badValue)).to.be.revertedWithCustomError(myErc20, "InsufficientFunds")
    })

    it("should successful mint of tokens", async function () {
        await myErc20.mint(signer3.address, valueTransfer)
        expect(await myErc20.totalSupply()).to.be.eq(TOTAL_SUPPLY + valueTransfer)
        expect(await myErc20.balanceOf(signer3.address)).to.be.eq(valueTransfer)
    })

    it("should throw an error if a zero address is passed in the parameters", async function () {
        await expect(myErc20.mint(zeroAddress, valueTransfer)).to.be.revertedWithCustomError(myErc20, "NotAllowedZeroAddress")
        await expect(myErc20.burn(zeroAddress, valueTransfer)).to.be.revertedWithCustomError(myErc20, "NotAllowedZeroAddress")
    })

    it("should throw an error if the function is not called by the owner", async function () {
        await expect(myErc20.connect(signer3).mint(signer1.address, valueTransfer)).to.be.revertedWithCustomError(myErc20, "OnlyOwner")
        await expect(myErc20.connect(signer2).burn(signer1.address, valueTransfer)).to.be.revertedWithCustomError(myErc20, "OnlyOwner")
    })

    it("should successful burn of tokens", async function () {
        await myErc20.burn(deployer.address, valueTransfer)
        expect(await myErc20.totalSupply()).to.be.eq(TOTAL_SUPPLY - valueTransfer)
    })

    it("should throw an error if there are insufficient funds of burn", async function () {
        await expect(myErc20.burn(deployer.address, badValue)).to.be.revertedWithCustomError(myErc20, "InsufficientFunds")
    })

    it("should successful approve of tokens", async function () {
        await myErc20.approve(signer1.address, valueAllow)
        expect(await myErc20.allowance(deployer.address, signer1.address)).to.be.eq(valueAllow)
    })

    it("should successful increase/decrease allowance of tokens", async function () {
        await myErc20.approve(signer1.address, valueAllow)  // + 50_000
        expect(await myErc20.allowance(deployer.address, signer1.address)).to.be.eq(valueAllow) // 50_000
        await myErc20.increaseAllowance(signer1.address, valueIncreaseAllow) // + 20_000
        expect(await myErc20.allowance(deployer.address, signer1.address)).to.be.eq(valueAllow + valueIncreaseAllow) // = 70_000
        await myErc20.decreaseAllowance(signer1.address, valueIncreaseAllow) // - 20_000
        await myErc20.decreaseAllowance(signer1.address, valueIncreaseAllow) // - 20_000
        expect(await myErc20.allowance(deployer.address, signer1.address)).to.be.eq(valueAllow - valueIncreaseAllow) // = 30_000
        
        await myErc20.decreaseAllowance(signer1.address, valueIncreaseAllow) // - 20_000 = 10_000
        
        await expect(myErc20.decreaseAllowance(signer1.address, valueIncreaseAllow)).to.be.revertedWithCustomError(myErc20, "DecreasedAllowanceBelowZero") // - 20_000 = Error
    })

    it("should successful transferFrom of tokens", async function () {
        await myErc20.approve(signer1.address, valueAllow)
        
        await expect( myErc20.connect(signer1).transferFrom(deployer.address, signer1.address, valueAllow) )
        .changeTokenBalances(myErc20, [deployer.address, signer1.address], [-valueAllow, valueAllow]);

        expect(await myErc20.allowance(deployer.address, signer1.address)).to.be.eq(0)
    })

    it("should throw an error if there are insufficient allowance of transferFrom", async function () {
        await expect(myErc20.connect(signer1).transferFrom(deployer.address, signer1.address, valueTransfer)).to.be.revertedWithCustomError(myErc20, "InsufficientAllowance")
    })

    it("should throw an error if there are allowance for yourself", async function () {
        await expect(myErc20.connect(signer1).approve(signer1.address, valueAllow)).to.be.revertedWithCustomError(myErc20, "ApproveForYourself")
    })

    it("should throw an error if there are insufficient funds of transferFrom", async function () {
        await myErc20.approve(signer1.address, badValue)
        await expect(myErc20.connect(signer1).transferFrom(deployer.address, signer1.address, badValue)).to.be.revertedWithCustomError(myErc20, "InsufficientFunds")
    })
})

