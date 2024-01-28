// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
import "./DateTimeLibrary.sol";
import "./02_ERC20.sol";
import "hardhat/console.sol";

error AmountAllowanceBelowZero();
error StakingPeriodHasNotStarted();
error DepositNotFound();
error RewardAlreadyClaimed();
error LockPeriodNotCompleted();
error InsufficientRewardBalance();
error RewardTransferFailed();
error NoStakedAmountFound();
error WithdrawFailed();
error RewardsNotClaimed();

contract TokenStaking {
    using DateTimeLibrary for uint;

    address public depositTokenAddress;
    address public rewardTokenAddress;
    uint256 public rewardPercentageInYear;
    uint256 public startTimeStaking;
    uint256 public lockPeriod;
    uint256 public maxStakeAmount;

    struct User {
        uint256 depositAmount;
        uint256 depositTime;
        uint256 stakedAmount;
        uint256 lastRewardClaimTime;
    }

    mapping(address => User) public users;

    event Deposit(address indexed user, uint256 amount, uint256 time);
    event RewardClaimed(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    constructor(
        address _depositTokenAddress,
        address _rewardTokenAddress,
        uint256 _rewardPercentageInYear,
        uint256 _startTime,
        uint256 _lockPeriod,
        uint256 _maxStakeAmount
    ) {
        depositTokenAddress = _depositTokenAddress;
        rewardTokenAddress = _rewardTokenAddress;
        rewardPercentageInYear = _rewardPercentageInYear;
        startTimeStaking = _startTime;
        lockPeriod = _lockPeriod;
        maxStakeAmount = _maxStakeAmount;
    }

    function deposit(uint256 amount) external {
        if (block.timestamp < startTimeStaking) {
            revert StakingPeriodHasNotStarted();
        }

        if (amount <= 0) {
            revert AmountAllowanceBelowZero();
        }

        ERC20(depositTokenAddress).transferFrom(msg.sender, address(this), amount);

        User storage user = users[msg.sender];
        user.depositAmount += amount;
        user.depositTime = block.timestamp;

        emit Deposit(msg.sender, amount, block.timestamp);
    }

    function claimRewards() external {
        User storage user = users[msg.sender];

        if (user.depositAmount <= 0) {
            revert DepositNotFound();
        }
        if (user.stakedAmount != 0) {
            revert RewardAlreadyClaimed();
        }

        uint256 lockEndTime = user.depositTime + lockPeriod;
        if (block.timestamp < lockEndTime) {
            revert LockPeriodNotCompleted();
        }

        ERC20 rewardToken = ERC20(rewardTokenAddress);
        uint256 rewardAmount = calculatePeriodReward(
            rewardPercentageInYear,
            user.lastRewardClaimTime != 0 ? user.lastRewardClaimTime : user.depositTime,
            block.timestamp,
            user.depositAmount
        );

        if (rewardToken.balanceOf(address(this)) < rewardAmount) {
            revert InsufficientRewardBalance();
        }
        if (!rewardToken.transfer(msg.sender, rewardAmount)) {
            revert RewardTransferFailed();
        }
        user.stakedAmount = user.depositAmount;
        user.lastRewardClaimTime = block.timestamp;

        emit RewardClaimed(msg.sender, rewardAmount);
    }

    function withdraw() external {
        User storage user = users[msg.sender];
        if (user.stakedAmount <= 0) {
            revert NoStakedAmountFound();
        }

        if (user.stakedAmount != user.depositAmount) {
            revert RewardsNotClaimed();
        }

        ERC20 depositToken = ERC20(depositTokenAddress);
        if (!depositToken.transfer(msg.sender, user.depositAmount)) {
            revert WithdrawFailed();
        }

        emit Withdraw(msg.sender, user.depositAmount);

        user.depositAmount = 0;
        user.stakedAmount = 0;
    }

    function calculatePeriodReward(
        uint256 percentageInYear,
        uint256 startTime,
        uint256 endTime,
        uint256 depositAmount
    ) private pure returns (uint256) {
        return
            (depositAmount * procenteInSec(percentageInYear, endTime) * (endTime - startTime)) /
            (10 ** 24);
    }

    function procenteInSec(
        uint256 percentageInYear,
        uint256 endTime
    ) private pure returns (uint256) {
        return
            (percentageInYear * (10 ** 22)) /
            (
                DateTimeLibrary.isLeapYear(endTime)
                    ? DateTimeLibrary.SECONDS_PER_YEAR
                    : DateTimeLibrary.SECONDS_PER_LEAP_YEAR
            );
    }
}
