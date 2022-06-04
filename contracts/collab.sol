// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Collab is ReentrancyGuard, AccessControl, ERC1155Holder, Pausable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    using Counters for Counters.Counter;

    Counters.Counter private _id;

    address payable owner;
    address payable _pay;

    enum TokenType{ERC721, ERC1155}

    constructor() {
        owner = payable(msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _pay = owner;
    }

    function pause() public onlyRole(MINTER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(MINTER_ROLE) {
        _unpause();
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155Receiver, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }


    struct CollabItem {
        uint256 id;
        address nftContract;
        uint256 tokenId;
        address collabContract;
        uint256[] collabTokenIds;
        address payable seller;
        address payable escrow;
        uint256 maxClaim;
        uint256 price;
        TokenType tokenType;
        bool locked;
        bool cancelled;
    }

    mapping(uint256 => CollabItem) private idToCollabItem;
    mapping(uint256 => mapping(address => uint256)) private claimed;

    function createCollabItem(address nftContract, uint256 tokenId, uint256 amount, address collabContract, uint256[] calldata collabTokenIds, address escrow, uint256 maxClaim, uint256 price, uint8 tokenTypeNum) public onlyRole(MINTER_ROLE) whenNotPaused {
        TokenType tokenType = TokenType(tokenTypeNum);

        _id.increment();
        uint256 id = _id.current(); 

        idToCollabItem[id] = CollabItem(
            id,
            nftContract,
            tokenId,
            collabContract,
            collabTokenIds,
            payable(msg.sender),
            payable(escrow),
            maxClaim,
            price,
            tokenType,
            false,
            false
        );

        IERC1155(nftContract).safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
    }

    function claimCollab(uint256 id, uint256 tokenId, uint256 amount) public payable nonReentrant whenNotPaused {
        CollabItem memory collabItem = idToCollabItem[id];
        require(amount > 0, "Amount should be greater than zero");
        require(msg.value == collabItem.price, "Invalid price");
        require(isEligible(id, msg.sender, tokenId, amount), "Address not eligible");

        IERC1155(collabItem.nftContract).safeTransferFrom(address(this), msg.sender, collabItem.tokenId, amount, "");
        if(msg.value > 0){
            collabItem.escrow.transfer(msg.value);
        }

        claimed[id][msg.sender] = claimed[id][msg.sender] + amount;
    }

    function isEligible(uint id, address userAddress, uint tokenId, uint amount) public view returns(bool) {
        CollabItem memory collabItem = idToCollabItem[id];
        require(claimed[id][msg.sender] + amount <= collabItem.maxClaim, "Fully claimed");
        require(!collabItem.cancelled, "Item cancelled");
        require(!collabItem.locked, "Item locked");

        if(collabItem.collabContract == address(0)){
            return true;
        } else {

        if(collabItem.tokenType == TokenType.ERC721) {
            if(collabItem.collabTokenIds.length > 0) {
                for(uint i = 0; i < collabItem.collabTokenIds.length; i++){
                    if(userAddress == IERC721(collabItem.collabContract).ownerOf(collabItem.collabTokenIds[i])) {
                        return true;
                    }
                }
                return false;
            } else {
                uint256 balance = IERC721(collabItem.collabContract).balanceOf(userAddress);
                if(balance > 0){
                    return true;
                }

                return false;
            }
        } else if(collabItem.tokenType == TokenType.ERC1155){
            if(collabItem.collabTokenIds.length > 0) {
                for(uint i = 0; i < collabItem.collabTokenIds.length; i++){
                    if(IERC1155(collabItem.collabContract).balanceOf(userAddress, collabItem.collabTokenIds[i]) > 0) {
                        return true;
                    }
                }
                return false;
            } else {
                uint256 balance = IERC1155(collabItem.collabContract).balanceOf(userAddress, tokenId);
                if(balance > 0){
                    return true;
                }
                return false;
            }
        } 
    } 
        return false;
    }

    function cancelCollab(
        uint256 id
        ) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(idToCollabItem[id].cancelled != true, "Item is already cancelled");
        uint256 balance = IERC1155(idToCollabItem[id].nftContract).balanceOf(address(this), idToCollabItem[id].tokenId);
        IERC1155(idToCollabItem[id].nftContract).safeTransferFrom(address(this), idToCollabItem[id].seller, idToCollabItem[id].tokenId, balance, "");
        idToCollabItem[id].cancelled = true;
    }

    function lockCollab(
        uint256 id
        ) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(idToCollabItem[id].locked != true, "Item is already locked");
        idToCollabItem[id].locked = true;
    }

    function unlockCollab(
        uint256 id
        ) public nonReentrant {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(idToCollabItem[id].locked != false, "Item is already unlocked");
        idToCollabItem[id].locked = false;
    }

    function getCollabItem(uint256 id) public view returns(CollabItem memory) {
        return idToCollabItem[id];
    }

}