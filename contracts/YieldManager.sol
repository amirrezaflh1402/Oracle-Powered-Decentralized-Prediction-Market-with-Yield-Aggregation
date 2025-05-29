// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Yield Manager Contract
 * @dev Allocates staked funds to yield farming platforms.
 */
contract YieldManager {
    mapping(address => uint256) public userStakes; // Maps users to their stakes
    
    event FundsAllocated(address indexed user, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 amount);
    
    /**
     * @dev Allocates funds to the yield platform.
     * @notice Users must send funds to this function to participate.
     */
    function allocateFunds() external payable {
        require(msg.value > 0, "Must send funds");
        userStakes[msg.sender] += msg.value;
        emit FundsAllocated(msg.sender, msg.value);
    }
    
    /**
     * @dev Allows users to withdraw their staked funds.
     * @param amount The amount to withdraw.
     */
    function withdrawFunds(uint256 amount) external {
        require(userStakes[msg.sender] >= amount, "Insufficient funds");
        userStakes[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }
}
