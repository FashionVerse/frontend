// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract NFTMarket is ReentrancyGuard, AccessControl, ERC1155Holder {
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

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155Receiver, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId; 
        address payable seller;
        uint256 price;
        uint256 releaseTime;
        bool locked;
        bool cancelled;
    }

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
        uint[] indexed itemIds,
        address nftContract,
        uint256 timestamp,
        address buyer
    );



    mapping(uint256 => MarketItem) private idToMarketItem;

    address[] private whitelistedAddresses;

    bool public onlyWhitelisted = false;


    function updatePay(address payable pay) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _pay = pay;
    }

    function checkPay() public view returns (address) {
        return _pay;
    }

    function updateWhitelistedAddresses(address[] calldata addresses) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        whitelistedAddresses = addresses;
    }

    function isAddressWhitelisted(address _user) public view returns (bool) {
        uint i = 0;
        while(i < whitelistedAddresses.length) {
            if(whitelistedAddresses[i] == _user){
                return true;
            }
            i++;
        }

        return false;
    }

    function updateOnlyWhitelisted(bool value) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        onlyWhitelisted = value;
    }

    function changePrices(uint256[] calldata itemIds, uint256[] calldata prices) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(itemIds.length == prices.length, "Invalid arguments");

        uint i = 0;
        while(i < itemIds.length) {
            idToMarketItem[itemIds[i]].price = prices[i];
        }
    }

    

    function createMarketItem(address nftContract, uint256 tokenId, uint256 amount, uint256 price, uint256 releaseTime) public payable  nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(price > 0, "Price must be at least 1 wei");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        IERC1155(nftContract).safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        idToMarketItem[itemId] =  MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            price,
            releaseTime,
            false,
            false
        );

        emit MarketItemCreated(
            itemId,
            block.timestamp
        );

    }

    function createMarketSale(
        address nftContract,
        uint256[] memory itemIds,
        uint256[] memory tokenIds,
        uint256[] memory amounts
        ) public payable nonReentrant {

            if(onlyWhitelisted){
                require(isAddressWhitelisted(msg.sender), "User not whitelisted.");
            }

            require(getPrice(itemIds, tokenIds, amounts) == msg.value, "Enter valid amount");
            IERC1155(nftContract).safeBatchTransferFrom(address(this), msg.sender, tokenIds, amounts, "");
            _pay.transfer(msg.value);

        emit MarketItemSold(
            itemIds,
            nftContract,
            block.timestamp,
            msg.sender
        );
        
    }

    function getPrice(uint256[] memory itemIds, uint256[] memory tokenIds, uint256[] memory amounts) private view returns (uint256){
        require(itemIds.length == amounts.length, "Invalid Amount");
        require(itemIds.length == tokenIds.length, "Invalid Amount");
        uint value = 0;
        for(uint i = 0; i < itemIds.length;  i++){
            require(idToMarketItem[itemIds[i]].tokenId == tokenIds[i], "Invalid Token ID");
            require(idToMarketItem[itemIds[i]].locked == false, "Item is locked");
            require(idToMarketItem[itemIds[i]].cancelled == false, "Item was cancelled");
            require(block.timestamp > idToMarketItem[itemIds[i]].releaseTime, "Item not up for sale yet");
            value = value + idToMarketItem[itemIds[i]].price * amounts[i];
        }

        return value;
    }


    function cancelItem(
        uint256 itemId
        ) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(idToMarketItem[itemId].cancelled != true, "Item is already cancelled");
        uint256 balance = IERC1155(idToMarketItem[itemId].nftContract).balanceOf(address(this), idToMarketItem[itemId].tokenId);
        IERC1155(idToMarketItem[itemId].nftContract).safeTransferFrom(address(this), idToMarketItem[itemId].seller, idToMarketItem[itemId].tokenId, balance, "");
        idToMarketItem[itemId].cancelled = true;
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

        emit MarketItemUnlocked(
            itemId,
            block.timestamp
        );
    }

    function getItem(uint itemId) public view returns (MarketItem memory){
        return idToMarketItem[itemId];
    }
    
}