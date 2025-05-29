// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Governance Contract
 * @dev Implements DAO voting mechanisms.
 */
contract Governance {
    event ProposalCreated(uint256 indexed proposalId, string description);
    
    /**
     * @dev Creates a new proposal in the governance system.
     * @param description The description of the proposal.
     */
    function createProposal(string memory description) external {
        emit ProposalCreated(block.timestamp, description);
    }
}
