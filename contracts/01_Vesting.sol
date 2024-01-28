// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Vesting {
    address public owner;
    uint256 public startTime;
    uint256 public endTime;
    uint256 public firstUnlock;
    uint256 public secondUnlock;
    uint256 public thirdUnlock;
    uint256 public forthUnlock;

    mapping(address => uint256) public balances;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    constructor(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _firstUnlock,
        uint256 _secondUnlock,
        uint256 _thirdUnlock,
        uint256 _forthUnlock
    ) {
        owner = msg.sender;
        startTime = _startTime;
        endTime = _endTime;
        firstUnlock = _firstUnlock;
        secondUnlock = _secondUnlock;
        thirdUnlock = _thirdUnlock;
        forthUnlock = _forthUnlock;
    }

    function distributeRights(address account, uint256 amount) external onlyOwner {
        require(block.timestamp < startTime, "Distribution period has ended");
        balances[account] = amount;
    }

    function getAvailableAmount(address _address) public view returns (uint256) {
        if (block.timestamp < startTime) {
            return 0;
        } else if (block.timestamp >= startTime && block.timestamp < (startTime + firstUnlock)) {
            return (balances[_address] * 10) / 100;
        } else if (
            block.timestamp >= (startTime + firstUnlock) &&
            block.timestamp < (startTime + secondUnlock)
        ) {
            return (balances[_address] * 30) / 100;
        } else if (
            block.timestamp >= (startTime + secondUnlock) &&
            block.timestamp < (startTime + thirdUnlock)
        ) {
            return (balances[_address] * 50) / 100;
        } else if (
            block.timestamp >= (startTime + thirdUnlock) &&
            block.timestamp < (startTime + forthUnlock)
        ) {
            return balances[_address];
        } else {
            return 0;
        }
    }

    function withdrawTokens() external {
        require(block.timestamp >= startTime, "Withdrawal period has not started");
        uint256 availableAmount = getAvailableAmount(msg.sender);
        require(availableAmount > 0, "No tokens available for withdrawal");
        balances[msg.sender] -= availableAmount;
        // Transfer tokens to the user's address
        // Add code to transfer tokens here
    }
}
