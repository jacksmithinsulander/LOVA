export const abi =
[{
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "promiseIdentifier",
        "type": "uint256"
    }],
    "name": "SmartPromiseCreated",
    "type": "event"
}, {
    "inputs": [{
        "internalType": "string",
        "name": "_promiseTitle",
        "type": "string"
    }],
    "name": "createSmartPromise",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_promiseUID",
        "type": "uint256"
    }],
    "name": "endSmartPromise",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_promiseUID",
        "type": "uint256"
    }],
    "name": "joinPromise",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_promiseUID",
        "type": "uint256"
    }],
    "name": "showPromiseInfo",
    "outputs": [{
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
    }, {
        "internalType": "string",
        "name": "",
        "type": "string"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_promiseUID",
        "type": "uint256"
    }],
    "name": "signFullfilledPromise",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "smartPromises",
    "outputs": [{
        "internalType": "address",
        "name": "initialDepositor",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "promiseCollateral",
        "type": "uint256"
    }, {
        "internalType": "string",
        "name": "promiseTitle",
        "type": "string"
    }, {
        "internalType": "uint256",
        "name": "promiseIdentifier",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "promiseAcceptDeadline",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}]
