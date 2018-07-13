pragma solidity ^0.4.23;

contract TSCoin {
   
    string public name = "TSCoin";
    string public symbol = "TSC";
    string public standard = "TSCoin v1.0";
    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    //Transfer
    
    function transfer(address _to, uint256 _value) public returns (bool success){
       
        require(balanceOf[msg.sender] >= _value);
        //Transfer the balance
        balanceOf[msg.sender] >= _value;
        balanceOf[_to] += _value;
        
        Transfer(msg.sender,_to, _value);
       
       return true;
        
    }
}