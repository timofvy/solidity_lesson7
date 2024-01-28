// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract ERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;
    address private _contractOwner;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    error InsufficientFunds();
    error InsufficientAllowance();
    error DecreasedAllowanceBelowZero();
    error NotAllowedZeroAddress();
    error OnlyOwner();
    error ApproveForYourself();

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);

    constructor(string memory name_, string memory symbol_, uint8 decimals_, uint256 totalSupply_) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        _totalSupply = totalSupply_;
        _balances[msg.sender] = totalSupply_;
        _contractOwner = msg.sender;
    }

    /**
     * @dev Returns the name of the ERC20 token.
     * @return The name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the ERC20 token.
     * @return The symbol of the token.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimal places for the ERC20 token.
     * @return The number of decimal places.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Returns the total supply of the ERC20 token in circulation.
     * @return The total supply of tokens.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Returns the balance of the ERC20 token for the specified address.
     * @param account The address for which to retrieve the balance.
     * @return The token balance for the specified address.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev Returns the amount of ERC20 tokens that the owner has allowed to be spent from their address for a specific address.
     * @param owner The address of the token owner.
     * @param spender The address for which spending of tokens is allowed.
     * @return The amount of tokens allowed to be spent.
     */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev Transfers a specified amount of ERC20 tokens from the caller's address to the specified address.
     * @param to The address to which the tokens are being transferred.
     * @param amount The amount of tokens to transfer.
     * @return A boolean indicating whether the transfer was successful or not.
     */
    function transfer(address to, uint256 amount) public returns (bool) {
        if (_balances[msg.sender] < amount) {
            revert InsufficientFunds();
        }
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    /**
     * @dev Approves the specified address to spend a specified amount of tokens from the caller's address.
     * @param spender The address to which spending of tokens is being approved.
     * @param amount The amount of tokens to approve for spending.
     * @return A boolean indicating whether the approval was successful or not.
     */
    function approve(address spender, uint256 amount) public returns (bool) {
        if (msg.sender == spender) {
            revert ApproveForYourself();
        }
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    /**
     * @dev Transfers a specified amount of ERC20 tokens from one address to another, on behalf of a third party.
     * @param from The address from which the tokens are being transferred.
     * @param to The address to which the tokens are being transferred.
     * @param amount The amount of tokens to transfer.
     * @return A boolean indicating whether the transfer was successful or not.
     */
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        if (_balances[from] < amount) {
            revert InsufficientFunds();
        }
        if (_allowances[from][msg.sender] < amount) {
            revert InsufficientAllowance();
        }
        _balances[from] -= amount;
        _balances[to] += amount;
        _allowances[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        return true;
    }

    /**
     * @dev Increases the amount of ERC20 tokens that the specified address is allowed to spend from the caller's address.
     * @param spender The address to which spending of tokens is being approved.
     * @param addedValue The amount of tokens to increase the allowance by.
     * @return A boolean indicating whether the increase in allowance was successful or not.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _allowances[msg.sender][spender] += addedValue;
        emit Approval(msg.sender, spender, _allowances[msg.sender][spender]);
        return true;
    }

    /**
     * @dev Decreases the amount of ERC20 tokens that the specified address is allowed to spend from the caller's address.
     * @param spender The address to which spending of tokens is being approved.
     * @param subtractedValue The amount of tokens to decrease the allowance by.
     * @return A boolean indicating whether the decrease in allowance was successful or not.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        if (_allowances[msg.sender][spender] < subtractedValue) {
            revert DecreasedAllowanceBelowZero();
        }
        _allowances[msg.sender][spender] -= subtractedValue;
        emit Approval(msg.sender, spender, _allowances[msg.sender][spender]);
        return true;
    }

    modifier onlyOwner() {
        if (msg.sender != _contractOwner) {
            revert OnlyOwner();
        }
        _;
    }

    /**
     * @dev Mints a specified amount of ERC20 tokens and assigns them to the specified account.
     * @param account The address to which the tokens are being minted.
     * @param amount The amount of tokens to mint.
     */
    function mint(address account, uint256 amount) public onlyOwner {
        if (account == address(0)) {
            revert NotAllowedZeroAddress();
        }
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Burns a specified amount of ERC20 tokens from the specified account.
     * @param account The address from which the tokens are being burned.
     * @param amount The amount of tokens to burn.
     */
    function burn(address account, uint256 amount) public onlyOwner {
        if (account == address(0)) {
            revert NotAllowedZeroAddress();
        }
        if (_balances[account] < amount) {
            revert InsufficientFunds();
        }
        _balances[account] -= amount;
        _totalSupply -= amount;
        emit Transfer(account, address(0), amount);
    }
}
