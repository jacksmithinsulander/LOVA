// SPDX-License-Identifier: AGPL-3.0

pragma solidity ^0.8.3;

contract smartPromiseContract {
    struct promiseData {
        address initialDepositor;
        uint256 promiseCollateral;
        string promiseTitle;
        uint256 promiseIdentifier;
        uint256 promiseAcceptDeadline;
        address[] promiseParticipators;
    }

    promiseData[] public smartPromises;
    mapping(uint256 => mapping(address => bool)) signed;
    mapping(uint256 => mapping(address => bool)) withdrawn;
    event SmartPromiseCreated(uint256 promiseIdentifier);

    function createSmartPromise(string memory _promiseTitle) public payable {
        promiseData memory newPromise;
        newPromise.initialDepositor = msg.sender;
        newPromise.promiseCollateral = msg.value;
        newPromise.promiseTitle = _promiseTitle;
        newPromise.promiseIdentifier = 
            uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, block.coinbase))) % 2**160;
        signed[newPromise.promiseIdentifier][msg.sender] = false;
        withdrawn[newPromise.promiseIdentifier][msg.sender] = false;
        newPromise.promiseAcceptDeadline = block.timestamp + 10 minutes;
        smartPromises.push(newPromise);
        promiseData storage arrPushPromise = smartPromises[smartPromises.length - 1];
        arrPushPromise.promiseParticipators.push(msg.sender);
        emit SmartPromiseCreated(newPromise.promiseIdentifier);
    }

    function joinPromise(uint256 _promiseUID) public payable {
        bool ableToJoin;
        for (uint256 i = 0; i < smartPromises.length; i++) {
            if (
                smartPromises[i].promiseIdentifier == _promiseUID &&
                smartPromises[i].promiseAcceptDeadline > block.timestamp &&
                smartPromises[i].promiseCollateral == msg.value
            ) {
                ableToJoin = true;
                smartPromises[i].promiseParticipators.push(msg.sender);
                signed[_promiseUID][msg.sender] = false;
                withdrawn[_promiseUID][msg.sender] = false;
                break;
            }
        }
        require(ableToJoin, "Error: Invalid promise UID or deadline has passed or collateral does not match");
    }

    function signFullfilledPromise(uint256 _promiseUID) public {
        uint256 promiseIndex;
        bool promiseExists = false;
        for (uint256 i = 0; i < smartPromises.length; i++) {
            if (smartPromises[i].promiseIdentifier == _promiseUID) {
                promiseIndex = i;
                promiseExists = true;
                break;
            }
        }
        require(promiseExists, "Invalid promise identifier");

        bool isParticipant = false;
        for (uint256 j = 0; j < smartPromises[promiseIndex].promiseParticipators.length; j++) {
            if (smartPromises[promiseIndex].promiseParticipators[j] == msg.sender) {
                isParticipant = true;
                break;
            }
        }
        require(isParticipant, "You are not a participant of this promise");

        require(!signed[_promiseUID][msg.sender], "You have already signed this promise");

        signed[_promiseUID][msg.sender] = true;
    }


    function endSmartPromise(uint256 _promiseUID) public payable {
        uint256 promiseIndex;
        bool ableToWithdraw = true;
        for (uint256 i = 0; i < smartPromises.length; i++) {
            if (smartPromises[i].promiseIdentifier == _promiseUID) {
                promiseIndex = i;
                break;
            }
        }
        require(promiseIndex < smartPromises.length, "Invalid promise identifier");
        require(smartPromises[promiseIndex].promiseCollateral > 0, "This promise has no collateral to withdraw");
        require(!withdrawn[_promiseUID][msg.sender], "You have already withdrawn the promise");
        withdrawn[_promiseUID][msg.sender] = true;    
        bool isParticipant = false;
        for (uint256 j = 0; j < smartPromises[promiseIndex].promiseParticipators.length; j++) {
            if (smartPromises[promiseIndex].promiseParticipators[j] == msg.sender) {
                isParticipant = true;
                break;
            }
        }
        require(isParticipant, "You are not a participant of this promise");

        for (uint j = 0; j < smartPromises[promiseIndex].promiseParticipators.length; j++) {
            if (!signed[_promiseUID][smartPromises[promiseIndex].promiseParticipators[j]]) {
                ableToWithdraw = false;
                break;
            }
        }
        require(ableToWithdraw, "All participants have not signed the promise");

        payable(smartPromises[promiseIndex].initialDepositor).transfer(smartPromises[promiseIndex].promiseCollateral);
    }

    function showPromiseInfo(uint256 _promiseUID) public view returns (
        address[] memory,
        string memory,
        uint256,
        uint256,
        uint256,
        uint256
    ) {
        uint256 promiseIndex;
        bool promiseExists = false;
        for (uint256 i = 0; i < smartPromises.length; i++) {
            if (smartPromises[i].promiseIdentifier == _promiseUID) {
                promiseIndex = i;
                promiseExists = true;
                break;
            }
        }
        require(promiseExists, "Invalid promise identifier");

        uint256 signedCount = 0;
        for (uint256 i = 0; i < smartPromises[promiseIndex].promiseParticipators.length; i++) {
            if (signed[_promiseUID][smartPromises[promiseIndex].promiseParticipators[i]]) {
                signedCount++;
            }
        }

        return (
            smartPromises[promiseIndex].promiseParticipators,
            smartPromises[promiseIndex].promiseTitle,
            smartPromises[promiseIndex].promiseCollateral,
            smartPromises[promiseIndex].promiseIdentifier,
            signedCount,
            smartPromises[promiseIndex].promiseParticipators.length
        );
    }
}
