// SPDX-License-Identifier: AGPL-3.0

pragma solidity ^0.8.0;

//import "https://github.com/safe-global/safe-contracts/blob/main/contracts/GnosisSafe.sol";

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

    event NewPromise(uint promiseIdentifier);

    function createSmartPromise(string memory _promiseTitle) public payable {
        promiseData memory newPromise;
        newPromise.initialDepositor = msg.sender;
        newPromise.promiseCollateral = msg.value;
        newPromise.promiseTitle = _promiseTitle;
        newPromise.promiseIdentifier = uint(keccak256(abi.encodePacked(
            block.difficulty, block.timestamp, block.coinbase))) % 2**160; 
            //generates a random number to use as a identifier
        newPromise.promiseAcceptDeadline = block.timestamp + 10 minutes;
        //address[] storage tempArray; // = [msg.sender];
        //tempArray = [msg.sender];
        //newPromise.promiseParticipators.push(msg.sender);
        emit NewPromise(newPromise.promiseIdentifier);
        smartPromises.push(newPromise);
    }

    function joinPromise(uint _promiseUID) public payable {
        for (uint i = 0; i < smartPromises.length; i++) {
            if (smartPromises[i].promiseIdentifier == _promiseUID &&
            smartPromises[i].promiseAcceptDeadline > block.timestamp &&
            smartPromises[i].promiseCollateral == msg.value) {
                smartPromises[i].promiseParticipators.push(msg.sender);
            } else {
                revert("Error: Invalid promise UID or deadline has passed or collateral does not match");
            }
        } 
    }

    function endSmartPromise(uint _promiseUID) public payable {
        require(address(this).balance > 0, "contract is empty");
        for (uint i = 0; i < smartPromises.length; i++) {
            if (smartPromises[i].promiseIdentifier == _promiseUID) {
                payable(msg.sender).transfer(smartPromises[i].promiseCollateral);
            } else {
                revert("Invalid promise identifier");
            }
        }
    }
}
