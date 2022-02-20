var NFTMarket = artifacts.require("NFTMarket");
var NFT = artifacts.require("NFT");

module.exports = function(deployer) {
    deployer.deploy(NFTMarket).then(()=> {
        deployer.deploy(NFT, NFTMarket.address);
    });
};