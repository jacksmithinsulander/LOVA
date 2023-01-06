// SPDX-License-Identifier: AGPL-3.0

pragma solidity ^0.8.0;

contract smartPromiseContract {
    struct promiseData {
        address initialDepositor;
        uint256 promiseCollateral;
        string promiseTitle;
        uint promiseIdentifier;
        uint promiseAcceptDeadline;
        address[] promiseParticipators;
    }

    promiseData[] public smartPromises;

    function createSmartPromise(string memory _promiseTitle) public payable {
        promiseData memory newPromise;
        newPromise.initialDepositor = msg.sender;
        newPromise.promiseCollateral = msg.value;
        newPromise.promiseTitle = _promiseTitle;
        newPromise.promiseIdentifier = uint(keccak256(abi.encodePacked(
            block.difficulty, block.timestamp, block.coinbase))) % 2**160; 
            //generates a random number to use as a identifier
        newPromise.promiseAcceptDeadline = block.timestamp + 10 minutes;
        newPromise.promiseParticipators.push(msg.sender);
        smartPromises.push(newPromise);
         /*       address _initialDepositor = msg.sender;
        uint256 _promiseCollateral = msg.value;
        uint _promiseIdentifier = uint(keccak256(abi.encodePacked(
            block.difficulty, block.timestamp, block.coinbase))) % 2**160; //generates a random number to use as a identifier
        uint _promiseAcceptDeadline = block.timestamp + 10 minutes;
        smartPromises.push(promiseData({
            initialDepositor: _initialDepositor, 
            promiseCollateral: _promiseCollateral, 
            promiseTitle: _promiseTitle, 
            promiseIdentifier: _promiseIdentifier,
            promiseAcceptDeadline: _promiseAcceptDeadline, 
            promiseParticipators: [_initialDepositor]})); */
    }

    function joinPromise(uint _promiseUID) public payable {
        for (uint i = 0; i < promiseData.length; i++) {
            if (promiseData[i].promiseIdentifier == _promiseUID) {
                promiseData[i].promiseParticipators.push(msg.sender[i]);
            }
        }
    }
}
