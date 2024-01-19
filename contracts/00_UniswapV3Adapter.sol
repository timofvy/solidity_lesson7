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

    /**
     * @notice Creates a new pool for the given tokens. If the tokens are not in the correct order, it swaps their positions.
     * @param token0 The address of the first token.
     * @param token1 The address of the second token.
     * @param fee The fee for the pool.
     * @param reserve0 The reserve of the first token.
     * @param reserve1 The reserve of the second token.
     * @return pool The address of the created pool.
     * @dev This function creates a new Uniswap V3 pool for the specified tokens. If the tokens are not in the correct order,
     * it swaps their positions to ensure consistency. The fee for the pool is also specified. The reserves of the tokens are
     * used to compute the initial price of the pool. The `nonfungiblePositionManager.createAndInitializePoolIfNecessary`
     * function is called to create the pool if it doesn't already exist. The function emits a `CreatePool` event to indicate
     * the creation of the pool. The address of the created pool is returned.
     */
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

    /**
     * @notice Mints a new position in the pool for the given tokens.
     * @param token0 The address of the first token.
     * @param token1 The address of the second token.
     * @param poolFee The fee for the pool.
     * @param amount0ToMint The amount of the first token to mint.
     * @param amount1ToMint The amount of the second token to mint.
     * @param minTick The lower tick boundary for the position.
     * @param maxTick The upper tick boundary for the position.
     * @return tokenId The ID of the minted position.
     * @return liquidity The amount of liquidity minted.
     * @return amount0 The actual amount of the first token minted.
     * @return amount1 The actual amount of the second token minted.
     *
     * @dev This function mints a new position in the specified pool. The pool is identified by its address. The first and second tokens
     * are specified, along with the desired tick boundaries of the position. The desired amounts of the tokens are also specified,
     * as well as the minimum amounts to receive. The recipient of the minted position is specified, along with the deadline for
     * the mint transaction. The function calls the `nonfungiblePositionManager.mint` function to mint the new position NFT. The
     * function passes the specified parameters and returns the ID of the minted position NFT. It is important to note that the
     * caller must have approved the ERC20 token spending by the `nonfungiblePositionManager` contract prior to calling this function.
    */
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

        (tokenId, liquidity, amount0, amount1) = nonfungiblePositionManager.mint(params);

        _createDeposit(tokenId);

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

    /**
     * @notice Creates a deposit for the given position.
     * @param tokenId The ID of the position.
     */
    function _createDeposit(uint256 tokenId) internal {
        (,,address token0,address token1,,,,uint128 liquidity,,,,) = nonfungiblePositionManager.positions(tokenId);

        deposits[tokenId] = Deposit({
            owner: owner,
            liquidity: liquidity,
            token0: token0,
            token1: token1
        });
    }

    /**
     * @notice Collects all fees from the specified position.
     * @param tokenId The ID of the position.
     * @return amount0 The amount of the first token collected.
     * @return amount1 The amount of the second token collected.
     *
     * @dev This function collects all accrued fees for the specified pool and transfers them to the recipient. The pool is
     * identified by its address. The recipient of the collected fees is specified. The function calls the
     * `nonfungiblePositionManager.collectAllFees` function to collect the fees. The function passes the specified parameters and
     * returns the amount of fees collected. It is important to note that the caller must have approved the ERC20 token spending
     * by the `nonfungiblePositionManager` contract prior to calling this function.
    */
    function collectAllFees(uint256 tokenId) external returns (uint256 amount0, uint256 amount1) {
        INonfungiblePositionManager.CollectParams memory params = INonfungiblePositionManager
            .CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        (amount0, amount1) = nonfungiblePositionManager.collect(params);

        _sendToOwner(tokenId, amount0, amount1);
        emit Collect(tokenId, amount0, amount1);
        return (amount0, amount1);
    }

    /**
     * @notice Sends the collected fees to the owner of the specified position.
     * @param tokenId The ID of the position.
     * @param amount0 The amount of the first token to send.
     * @param amount1 The amount of the second token to send.
     */
    function _sendToOwner(uint256 tokenId, uint256 amount0, uint256 amount1) internal {
        address recipient = deposits[tokenId].owner;

        address token0 = deposits[tokenId].token0;
        address token1 = deposits[tokenId].token1;

        TransferHelper.safeTransfer(token0, recipient, amount0);
        TransferHelper.safeTransfer(token1, recipient, amount1);
    }

    /**
     * @notice Decreases the liquidity of the specified position.
     * @param tokenId The ID of the position.
     * @param liquidity The amount of liquidity to decrease.
     * @return amount0 The amount of the first token received.
     * @return amount1 The amount of the second token received.
     *
     * @dev This function decreases the liquidity of the specified position by the specified amount and retrieves the redeemed amounts
     * of tokens. The position is identified by its token ID. The amount of liquidity to decrease is specified, along with the
     * minimum amounts of tokens to retrieve. The recipient of the retrieved tokens is specified, along with the deadline for the
     * decrease liquidity transaction. The function calls the `nonfungiblePositionManager.decreaseLiquidity` function to decrease
     * the liquidity and retrieve the tokens. The function passes the specified parameters and returns the amounts of tokens
     * retrieved. It is important to note that the caller must have approved the ERC721 token spending by the `nonfungiblePositionManager`
     * contract for the specified token ID prior to calling this function.
    */
    function decreaseLiquidity(
        uint256 tokenId,
        uint128 liquidity
    ) external returns (uint256 amount0, uint256 amount1) {
        if (msg.sender != deposits[tokenId].owner) {
            revert OnlyOwner();
        }

        Deposit memory deposit = deposits[tokenId];

        if (liquidity > deposit.liquidity) {
            revert InvalidLiquidity();
        }

        INonfungiblePositionManager.DecreaseLiquidityParams
            memory params = INonfungiblePositionManager.DecreaseLiquidityParams({
                tokenId: tokenId,
                liquidity: liquidity,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            });
        (amount0, amount1) = nonfungiblePositionManager.decreaseLiquidity(params);
        
        INonfungiblePositionManager.CollectParams memory collect = INonfungiblePositionManager
            .CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        nonfungiblePositionManager.collect(collect);

        deposit.liquidity -= liquidity;

        deposits[tokenId] = deposit;

        _sendToOwner(tokenId, amount0, amount1);
        emit DecreaseLiquidity(msg.sender, tokenId, amount0, amount1);
        return (amount0, amount1); 
    }

    /**
     * @notice Increases the liquidity of the specified position.
     * @param tokenId The ID of the position.
     * @param amountAdd0 The amount of the first token to add.
     * @param amountAdd1 The amount of the second token to add.
     * @return liquidity The new liquidity amount of the position.
     * @return amount0 The amount of the first token added.
     * @return amount1 The amount of the second token added.
     *
     * @dev This function increases the liquidity of the specified position by transferring the specified amounts of tokens.
     * The position is identified by its token ID. The desired amounts of tokens are specified, as well as the minimum amounts
     * to transfer. The recipient of the liquidity position is specified, along with the deadline for the increase liquidity
     * transaction. The function calls the `nonfungiblePositionManager.increaseLiquidity` function to increase the liquidity.
     * The function passes the specified parameters and returns the amount of liquidity increased. It is important to note that
     * the caller must have approved the ERC20 token spending by the `nonfungiblePositionManager` contract for the specified
     * token amounts prior to calling this function.
    */
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

    /**
     * @notice Swaps an exact input amount of a token for an output amount of another token.
     * @param tokenIn The address of the input token.
     * @param amountIn The amount of the input token to swap.
     * @param amountOutMinimum The minimum amount of the output token to receive.
     * @param path The path of tokens to swap through.
     * @return amountOut The actual amount of the output token received.
     *
     * @dev This function swaps an exact input amount of a token for an output amount of another token. The input token and its amount
     * are specified, as well as the minimum amount of the output token to receive. The path of tokens to swap through is provided,
     * along with the recipient of the swapped output tokens and the deadline for the swap transaction. The function calls the
     * `nonfungiblePositionManager.swapExactInput` function to perform the swap. The function passes the specified parameters and
     * returns the amount of the output token received. It is important to note that the caller must have approved the ERC20 token
     * spending by the `nonfungiblePositionManager` contract for the specified input token amount prior to calling this function.
    */
    function swapExactInput(
        address tokenIn,
        uint256 amountIn,
        uint256 amountOutMinimum,
        bytes memory path
    ) external returns (uint256 amountOut) {
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountIn);

        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams({
            path: path,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: amountOutMinimum
        });

        amountOut = swapRouter.exactInput(params);
        emit SwapInput(msg.sender, tokenIn, amountIn, amountOut);
        return amountOut;
    }

    /**
     * @notice Swaps an exact output amount of a token for an input amount of another token.
     * @param tokenIn The address of the input token.
     * @param amountOut The amount of the output token to receive.
     * @param amountInMaximum The maximum amount of the input token to spend.
     * @param path The path of tokens to swap through.
     * @return amountIn The actual amount of the input token spent.
     *
     * @dev This function swaps an exact output amount of a token for a maximum input amount of another token. The output token and its
     * amount are specified, as well as the maximum amount of the input token to spend. The path of tokens to swap through is provided,
     * along with the recipient of the swapped output tokens and the deadline for the swap transaction. The function calls the
     * `nonfungiblePositionManager.swapExactOutput` function to perform the swap. The function passes the specified parameters and
     * returns the amount of the input token spent. It is important to note that the caller must have approved the ERC20 token spending
     * by the `nonfungiblePositionManager` contract for the specified input token amount prior to calling this function.
    */
    function swapExactOutput(
        address tokenIn,
        uint256 amountOut,
        uint256 amountInMaximum,
        bytes memory path
    ) external returns (uint256 amountIn) {
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountInMaximum);

        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputParams memory params = ISwapRouter.ExactOutputParams({
            path: path,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut: amountOut,
            amountInMaximum: amountInMaximum
        });

        amountIn = swapRouter.exactOutput(params);

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
