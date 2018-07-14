var TSCoin = artifacts.require("./TSCoin.sol");
var TSCoinSale = artifacts.require("./TSCoinSale.sol");

module.exports = function(deployer) {
  deployer.deploy(TSCoin, 200000000).then(function(){
    var tokenPrice =  505648089155871.00000000000000000000; 
    return deployer.deploy(TSCoinSale, TSCoin.address, tokenPrice);
  });
  
};
