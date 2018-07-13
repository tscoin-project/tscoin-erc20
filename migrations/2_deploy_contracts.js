var TSCoin = artifacts.require("./TSCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(TSCoin, 200000000);
};
