var TSCoin = artifacts.require("./TSCoin.sol");

contract('TSCoin',function(accounts){
    var tokenInstance;

    it('initialize the contracts with the correct values',function(){
        return TSCoin.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, 'TSCoin', 'has correct name');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol, 'TSC','has correct symbol');
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard, "TSCoin v1.0",'has the correct Standard');
        });
    })

    it('allocates the initial  supply uppon deployment',function(){
        return TSCoin.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 200000000,'sets the total supply to 200,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 200000000, 'it allocates the initial supply to the admin account');
        });
    });

    it('transfers token ownership',function(){
        return TSCoin.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1],99999999999999999999999999999999);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 25, { from: accounts[0] });
          }).then(function(success){
                assert.equal(success,true, 'it return true');
                return tokenInstance.transfer(accounts[1], 25, { from: accounts[0] });
          }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 25, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
          }).then(function(balance) {
            assert.equal(balance.toNumber(), 25, 'adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
          }).then(function(balance) {
            assert.equal(balance.toNumber(), 200000000, 'deducts the amount from the sending account');
          });
    });



});