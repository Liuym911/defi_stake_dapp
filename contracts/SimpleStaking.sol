pragma solidity ^0.8.0;
contract SimpleStaking {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public timeStaked;

    function stake() public payable {
        require(msg.value > 0, "Must stake some ETH");
        balances[msg.sender] += msg.value;
        timeStaked[msg.sender] = block.timestamp;
    }

    function unstake() public {
        require(balances[msg.sender] > 0, "Must have staked");
        require(block.timestamp >= timeStaked[msg.sender] + 1 weeks, "1 week must have passed since staking");
        payable(msg.sender).transfer(balances[msg.sender]);
        balances[msg.sender] = 0;
        timeStaked[msg.sender] = 0;
    }
}