// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract NFTMarket is ReentrancyGuard, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    address payable _pay;

    constructor() {
        owner = payable(msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _pay = owner;
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256[] tokenIds;
        bool[] sold;
        address payable seller;
        uint256 available;
        uint256 price;
        uint256 releaseTime;
        bool locked;
        bool cancelled;
    }

    event MarketItemChanged (
        uint indexed itemId,
        address nftContract,
        uint256[] tokenIds,
        bool[] sold,
        address payable seller,
        uint256 available,
        uint256 price,
        uint256 releaseTime,
        bool locked,
        bool cancelled
    );

    event MarketItemCreated (
      uint indexed itemId,
      uint256 timestamp
    );
    
    event MarketItemCancelled (
        uint indexed itemId,
        uint256 timestamp
    );

    event MarketItemLocked (
        uint indexed itemId,
        uint256 timestamp
    );

    event MarketItemUnlocked (
        uint indexed itemId,
        uint256 timestamp
    );

    event MarketItemSold (
        uint indexed itemId,
        uint256 tokenId,
        address nftContract,
        uint256 timestamp,
        address owner
    );


    mapping(uint256 => MarketItem) private idToMarketItem;

    function updatePay(address payable pay) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _pay = pay;
    }

    function checkPay() public view returns (address) {
        return _pay;
    }

    function emitChange(uint itemId) private {
        emit MarketItemChanged (
            idToMarketItem[itemId].itemId,
            idToMarketItem[itemId].nftContract,
            idToMarketItem[itemId].tokenIds,
            idToMarketItem[itemId].sold,
            idToMarketItem[itemId].seller,
            idToMarketItem[itemId].available,
            idToMarketItem[itemId].price,
            idToMarketItem[itemId].releaseTime,
            idToMarketItem[itemId].locked,
            idToMarketItem[itemId].cancelled
        );
    }

    function createMarketItem(address nftContract, uint256[] memory tokenIds, uint256 price, uint256 releaseTime) public payable  nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(price > 0, "Price must be at least 1 wei");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        bool[] memory sold = new bool[](tokenIds.length);
        for (uint i=0; i<tokenIds.length; i++) {
            IERC721(nftContract).transferFrom(msg.sender, address(this), tokenIds[i]);
            sold[i] = false;
        }

        idToMarketItem[itemId] =  MarketItem(
            itemId,
            nftContract,
            tokenIds,
            sold,
            payable(msg.sender),
            tokenIds.length,
            price,
            releaseTime,
            false,
            false
        );

        emitChange(itemId);

        emit MarketItemCreated(
            itemId,
            block.timestamp
        );

    }


    function createMarketSale(
        address nftContract,
        uint256[] memory itemIds,
        uint256[] memory amounts
        ) public payable nonReentrant {
            require(itemIds.length == amounts.length, "Invalid Amount");
            uint price = 0;
            uint amount = 0;
            for(uint i=0; i < itemIds.length; i++){
                amount = amounts[i];
                uint itemId = itemIds[i];
                price = price + idToMarketItem[itemIds[i]].price*amount;
                if(i == itemIds.length-1){
                    require(msg.value == price, "Please submit the asking price in order to complete the purchase");
                }
                require(idToMarketItem[itemIds[i]].available >= amount, "These many items don't exist");
                require(idToMarketItem[itemIds[i]].locked == false, "Item is locked");
                require(idToMarketItem[itemIds[i]].cancelled == false, "Item was cancelled");
                require(block.timestamp > idToMarketItem[itemIds[i]].releaseTime, "Item not up for sale yet");

                for (uint j=0; j<idToMarketItem[itemIds[i]].tokenIds.length; j++) {
                    if(idToMarketItem[itemIds[i]].sold[j]!=true){
                        IERC721(nftContract).transferFrom(address(this), msg.sender, idToMarketItem[itemIds[i]].tokenIds[j]);
                        idToMarketItem[itemIds[i]].sold[j] = true;
                        amount = amount - 1;
                        idToMarketItem[itemIds[i]].available = idToMarketItem[itemIds[i]].available - 1;
                        if(amount==0){
                            break;
                        }

                        emit MarketItemSold (
                            itemId,
                            idToMarketItem[itemIds[i]].tokenIds[j],
                            idToMarketItem[itemIds[i]].nftContract,
                            block.timestamp,
                            msg.sender
                        );
                    }
                }
                
                emitChange(itemId);
            }
        _pay.transfer(msg.value);
        _itemsSold.increment();
    }

    function cancelItem(
        uint256 itemId
        ) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(idToMarketItem[itemId].cancelled != true, "Item is already cancelled");
        for (uint i=0; i<idToMarketItem[itemId].tokenIds.length; i++) {
            if(idToMarketItem[itemId].sold[i]!=true){
                IERC721(idToMarketItem[itemId].nftContract).transferFrom(address(this), msg.sender, idToMarketItem[itemId].tokenIds[i]);
                idToMarketItem[itemId].sold[i] = true;
            }
        }
        idToMarketItem[itemId].cancelled = true;

        emitChange(itemId);

        emit MarketItemCancelled(
            itemId,
            block.timestamp
        );
    }

    function lockItem(
        uint256 itemId
        ) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(idToMarketItem[itemId].locked != true, "Item is already locked");
        idToMarketItem[itemId].locked = true;

        emitChange(itemId);

        emit MarketItemLocked(
            itemId,
            block.timestamp
        );
    }

    function unLockItem(
        uint256 itemId
        ) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(idToMarketItem[itemId].locked != false, "Item is already unlocked");
        idToMarketItem[itemId].locked = false;

        emitChange(itemId);

        emit MarketItemUnlocked(
            itemId,
            block.timestamp
        );
    }

    function getItem(uint itemId) public view returns (MarketItem memory){
        return idToMarketItem[itemId];
    }
    
}