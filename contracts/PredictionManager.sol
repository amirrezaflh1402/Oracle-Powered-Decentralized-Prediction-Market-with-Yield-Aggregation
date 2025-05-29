// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Prediction Manager Contract
 * @dev Handles the creation of prediction markets and user bets.
 */
contract PredictionManager {
    struct Market {
        string eventName; // Name of the event
        uint256 endTime; // Timestamp when the market closes
        bool resolved; // Whether the market has been resolved
        uint256 totalStake; // Total staked amount in the market
        mapping(address => uint256) userBets; // Maps users to their bet amounts
    }
    
    mapping(uint256 => Market) public markets; // Mapping of market IDs to markets
    uint256 public marketCounter; // Counter to generate unique market IDs
    
    event MarketCreated(uint256 indexed marketId, string eventName, uint256 endTime);
    event BetPlaced(uint256 indexed marketId, address indexed user, uint256 amount);
    event MarketResolved(uint256 indexed marketId, string result);
    
    /**
     * @dev Creates a new prediction market.
     * @param eventName The name of the event for prediction.
     * @param duration The duration in seconds before the market closes.
     */
    function createMarket(string memory eventName, uint256 duration) external {
        marketCounter++;
        Market storage newMarket = markets[marketCounter];
        newMarket.eventName = eventName;
        newMarket.endTime = block.timestamp + duration;
        newMarket.resolved = false;
        newMarket.totalStake = 0;
        emit MarketCreated(marketCounter, eventName, block.timestamp + duration);
    }
    
    /**
     * @dev Allows users to place bets on a specific market.
     * @param marketId The ID of the market the user wants to bet on.
     */
    function placeBet(uint256 marketId) external payable {
        require(block.timestamp < markets[marketId].endTime, "Market closed");
        markets[marketId].userBets[msg.sender] += msg.value;
        markets[marketId].totalStake += msg.value;
        emit BetPlaced(marketId, msg.sender, msg.value);
    }
    
    /**
     * @dev Resolves the market with a given result.
     * @param marketId The ID of the market to resolve.
     * @param result The result of the event being predicted.
     */
    function resolveMarket(uint256 marketId, string memory result) external {
        require(block.timestamp >= markets[marketId].endTime, "Market not ended");
        require(!markets[marketId].resolved, "Already resolved");
        markets[marketId].resolved = true;
        emit MarketResolved(marketId, result);
    }
}
