// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
import "./Auction.sol";

contract AuctionFactory {
    //
    // Array to keep track of all the initated auctions
    address[] public auctions;

    //
    // Creates a new auction by initating an instance .
    function createAuction(uint time) public returns(address){
        Auction newAuction = new Auction(time, payable(msg.sender));
        
        address newAuctionAddress = address(newAuction);

        
        auctions.push(payable(newAuctionAddress));

        //
        // Return the address of the auction that was just created.
        return newAuctionAddress;
    }

    //
    // Get all the running auctions
    function getAuctions() public view returns (address[] memory) {
        return auctions;
    }

}
