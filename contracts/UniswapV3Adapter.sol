// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.15;
pragma abicoder v2;
import "hardhat/console.sol"; 

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";

contract UniswapV3Adapter {
    ISwapRouter private swapRouter;
    INonfungiblePositionManager private nonfungiblePositionManager;
    address public owner;
    mapping(uint256 => Deposit) public deposits;

    struct Deposit {
        address owner;
        uint128 liquidity;
        address token0;
        address token1;
    }

    event CreatePool(address indexed owner, address pool);
    event Mint(
        address indexed owner,
        uint256 tokenId,
        uint128 liquidity,
        uint256 amount0,
        uint256 amount1
    );
    event SwapInput(address indexed owner, address tokenIn, uint256 amountIn, uint256 amountOut);
    event SwapOutput(address indexed owner, address tokenIn, uint256 amountOut, uint256 amountIn);
    event IncreaseLiquidity(
        address indexed owner,
        uint256 tokenId,
        uint128 liquidity,
        uint256 amount0,
        uint256 amount1
    );
    event DecreaseLiquidity(
        address indexed owner,
        uint256 tokenId,
        uint256 amount0,
        uint256 amount1
    );
    event Collect(uint256 tokenId, uint256 amount0, uint256 amount1);

    error OnlyOwner();
    error InvalidLiquidity();

    constructor(ISwapRouter _swapRouter, INonfungiblePositionManager _nonfungiblePositionManager) {
        owner = msg.sender;
        swapRouter = _swapRouter;
        nonfungiblePositionManager = _nonfungiblePositionManager;
    }

    function createPool(
        address token0,
        address token1,
        uint24 fee,
        uint256 reserve0,
        uint256 reserve1
    ) external returns (address pool) {
        if (token0 > token1) (token0, token1) = (token1, token0);

        pool = nonfungiblePositionManager.createAndInitializePoolIfNecessary(
            token0,
            token1,
            fee,
            encodePriceSqrt(reserve0, reserve1)
        );
        emit CreatePool(msg.sender, pool);
        return pool;
    }

    function mintNewPosition(
        address token0,
        address token1,
        uint24 poolFee,
        uint256 amount0ToMint,
        uint256 amount1ToMint,
        int24 minTick,
        int24 maxTick
    ) external returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) {
        if (token0 > token1) (token0, token1) = (token1, token0);

        TransferHelper.safeTransferFrom(token0, msg.sender, address(this), amount0ToMint);
        TransferHelper.safeTransferFrom(token1, msg.sender, address(this), amount1ToMint);

        // Approve the position manager
        TransferHelper.safeApprove(token0, address(nonfungiblePositionManager), amount0ToMint);
        TransferHelper.safeApprove(token1, address(nonfungiblePositionManager), amount1ToMint);

        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager
            .MintParams({
                token0: token0,
                token1: token1,
                fee: poolFee,
                tickLower: minTick,
                tickUpper: maxTick,
                amount0Desired: amount0ToMint,
                amount1Desired: amount1ToMint,
                amount0Min: 0,
                amount1Min: 0,
                recipient: address(this),
                deadline: block.timestamp
            });

        // Note that the pool defined by token0/token1 and fee tier 0.05% must already be created and initialized in order to mint
        (tokenId, liquidity, amount0, amount1) = nonfungiblePositionManager.mint(params);

        // Create a deposit
        _createDeposit(tokenId);

        // Remove allowance and refund in both assets.
        if (amount0 < amount0ToMint) {
            TransferHelper.safeApprove(token0, address(nonfungiblePositionManager), 0);
            uint256 refund0 = amount0ToMint - amount0;
            TransferHelper.safeTransfer(token0, msg.sender, refund0);
        }

        if (amount1 < amount1ToMint) {
            TransferHelper.safeApprove(token1, address(nonfungiblePositionManager), 0);
            uint256 refund1 = amount1ToMint - amount1;
            TransferHelper.safeTransfer(token1, msg.sender, refund1);
        }

        emit Mint(msg.sender, tokenId, liquidity, amount0, amount1);
        return (tokenId, liquidity, amount0, amount1);
    }

    function _createDeposit(uint256 tokenId) internal {
        (,,address token0,address token1,,,,uint128 liquidity,,,,) = nonfungiblePositionManager.positions(tokenId);

        // set the owner and data for position
        // operator is msg.sender
        deposits[tokenId] = Deposit({
            owner: owner,
            liquidity: liquidity,
            token0: token0,
            token1: token1
        });
    }

    function collectAllFees(uint256 tokenId) external returns (uint256 amount0, uint256 amount1) {
        // set amount0Max and amount1Max to uint256.max to collect all fees
        // alternatively can set recipient to msg.sender and avoid another transaction in `sendToOwner`

        INonfungiblePositionManager.CollectParams memory params = INonfungiblePositionManager
            .CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        (amount0, amount1) = nonfungiblePositionManager.collect(params);

        // send collected feed back to owner
        _sendToOwner(tokenId, amount0, amount1);
        emit Collect(tokenId, amount0, amount1);
        return (amount0, amount1);
    }

    function _sendToOwner(uint256 tokenId, uint256 amount0, uint256 amount1) internal {
        address recipient = deposits[tokenId].owner;

        address token0 = deposits[tokenId].token0;
        address token1 = deposits[tokenId].token1;
        console.log("TOKENS----------", token0, token1);
        TransferHelper.safeTransfer(token0, recipient, amount0);
        TransferHelper.safeTransfer(token1, recipient, amount1);
    }

    function decreaseLiquidity(
        uint256 tokenId,
        uint128 liquidity
    ) external returns (uint256 amount0, uint256 amount1) {
        if (msg.sender != deposits[tokenId].owner) {
            revert OnlyOwner();
        }

        // Get the pool details from the deposits mapping
        Deposit memory deposit = deposits[tokenId];

        // Check if the liquidity being decreased is within the available liquidity
        if (liquidity > deposit.liquidity) {
            revert InvalidLiquidity();
        }

        // Construct the `DecreaseLiquidityParams` for the call to the nonfungiblePositionManager.decreaseLiquidity() function
        INonfungiblePositionManager.DecreaseLiquidityParams
            memory params = INonfungiblePositionManager.DecreaseLiquidityParams({
                tokenId: tokenId,
                liquidity: liquidity,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            });
        console.log('----before token1 -----', IERC20(0x7c28FC9709650D49c8d0aED2f6ece6b191F192a9).balanceOf(address(this)));
        console.log('----before token2 -----',IERC20(0xF407ed1303e3AE63a0e277AB7817A79A152e86Ef).balanceOf(address(this)));
        // Call the nonfungiblePositionManager.decreaseLiquidity() function to decrease the liquidity
        (amount0, amount1) = nonfungiblePositionManager.decreaseLiquidity(params);
        console.log(1111, amount0, amount1);

        console.log('after token1 -----', IERC20(0x7c28FC9709650D49c8d0aED2f6ece6b191F192a9).balanceOf(address(this)));
        console.log('after token2 -----',IERC20(0xF407ed1303e3AE63a0e277AB7817A79A152e86Ef).balanceOf(address(this)));
        

        // Update the liquidity and accumulated fees in the deposit
        deposit.liquidity -= liquidity;

        // Update the deposit in the deposits mapping
        deposits[tokenId] = deposit;

        // Send the amount0 and amount1 to the owner
        _sendToOwner(tokenId, amount0, amount1);
        emit DecreaseLiquidity(msg.sender, tokenId, amount0, amount1);
        return (amount0, amount1); 
    }

    function increaseLiquidity(
        uint256 tokenId,
        uint256 amountAdd0,
        uint256 amountAdd1
    ) external returns (uint128 liquidity, uint256 amount0, uint256 amount1) {
        if (msg.sender != deposits[tokenId].owner) {
            revert OnlyOwner();
        }

        TransferHelper.safeTransferFrom(deposits[tokenId].token0, msg.sender, address(this), amountAdd0);
        TransferHelper.safeTransferFrom(deposits[tokenId].token1, msg.sender, address(this), amountAdd1);

        TransferHelper.safeApprove(deposits[tokenId].token0, address(nonfungiblePositionManager), amountAdd0);
        TransferHelper.safeApprove(deposits[tokenId].token1, address(nonfungiblePositionManager), amountAdd1);


        INonfungiblePositionManager.IncreaseLiquidityParams
            memory params = INonfungiblePositionManager.IncreaseLiquidityParams({
                tokenId: tokenId,
                amount0Desired: amountAdd0,
                amount1Desired: amountAdd1,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            });

        (liquidity, amount0, amount1) = nonfungiblePositionManager.increaseLiquidity(params);
        emit IncreaseLiquidity(msg.sender, tokenId, liquidity, amount0, amount1);
        return (liquidity, amount0, amount1);
    }

    function swapExactInput(
        address tokenIn,
        uint256 amountIn,
        uint256 amountOutMinimum,
        bytes memory path
    ) external returns (uint256 amountOut) {
        // msg.sender must approve this contract

        // Transfer the specified amount of tokenIn to this contract.
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountIn);

        // Approve the router to spend tokenIn.
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams({
            path: path,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: amountOutMinimum
        });

        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInput(params);
        emit SwapInput(msg.sender, tokenIn, amountIn, amountOut);
        return amountOut;
    }

    function swapExactOutput(
        address tokenIn,
        uint256 amountOut,
        uint256 amountInMaximum,
        bytes memory path
    ) external returns (uint256 amountIn) {
        // Transfer the specified amount of tokenIn to this contract.
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountInMaximum);

        // Approve the router to spend the specifed `amountInMaximum` of tokenIn.
        // In production, you should choose the maximum amount to spend based on oracles or other data sources to acheive a better swap.
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputParams memory params = ISwapRouter.ExactOutputParams({
            path: path,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut: amountOut,
            amountInMaximum: amountInMaximum
        });

        // Executes the swap returning the amountIn needed to spend to receive the desired amountOut.
        amountIn = swapRouter.exactOutput(params);

        // For exact output swaps, the amountInMaximum may not have all been spent.
        // If the actual amount spent (amountIn) is less than the specified maximum amount, we must refund the msg.sender and approve the swapRouter to spend 0.
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(tokenIn, address(swapRouter), 0);
            TransferHelper.safeTransfer(tokenIn, msg.sender, amountInMaximum - amountIn);
        }
        emit SwapOutput(msg.sender, tokenIn, amountOut, amountIn);
        return amountIn;
    }

    function encodePriceSqrt(
        uint256 reserve1,
        uint256 reserve0
    ) private pure returns (uint160 result) {
        uint256 numerator = reserve1 * (2 ** 96);

        uint256 quotient = numerator / reserve0;
        uint256 squareRoot = babylonian(quotient);

        return uint160(squareRoot);
    }

    function babylonian(uint256 n) private pure returns (uint256) {
        uint256 x = n / 2;
        uint256 y = 0;

        while (x != y) {
            y = x;
            x = (n / x + x) / 2;
        }

        return x;
    }
}
