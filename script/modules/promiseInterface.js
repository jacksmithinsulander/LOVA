import { abi as smartPromiseAbi } from './abi.js'

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// WEB 3 FUNCTIONALITY ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const smartPromiseAddress = "0x8B80709DD6Ca1613A117287d4d294Ce89D614f29";

//const provider = new ethers.providers.Web3Provider(window.ethereum);
const network = "goerli"
const apiKey = "839f70b5cbfc4b13a4f4ba5a1f24423a"
//const provider = new ethers.providers.InfuraProvider(network, "https://goerli.infura.io/v3/839f70b5cbfc4b13a4f4ba5a1f24423a");
const provider = new ethers.providers.InfuraProvider(network, apiKey);
const smartPromiseContract = new ethers.Contract(smartPromiseAddress, smartPromiseAbi, provider);
const filter = smartPromiseContract.filters.SmartPromiseCreated(null);
const results = await smartPromiseContract.queryFilter(filter, 8327570, 8328820);
let signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// EVENT LISTENER //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export const listenToEvent = () => {
    const contract = new ethers.Contract(
        smartPromiseAddress,
        smartPromiseAbi,
        signer
    );

    contract.on("SmartPromiseCreated", (promiseIdentifier) => {
        let data = {
            promiseIdentifier: promiseIdentifier
                .toString()
        };
        console.log("listenToEvent", data);
        let createSmartPromiseInterface = document.getElementById("createSmartPromiseInterface");
        let successfulPromiseUID = document.createElement("p");
        successfulPromiseUID.id = "successfulPromiseUID";
        successfulPromiseUID.classList = "sectionOneSmallText"
        successfulPromiseUID.innerHTML =
            `Your promise ID is: ${data.promiseIdentifier} <br><br> Please send this to promise participants`
        createSmartPromiseInterface.appendChild(successfulPromiseUID);
    });
}

// console.log("senast log", results);


///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// CONNECT() ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export const connect = async () => {  
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
        smartPromiseContract.connect(signer);
        listenToEvent();
        return true;
    } else {
        alert("No metamask wallet detected");
        return false;
    }
};


///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// CREATE PROMISE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export async function createSmartPromiseJS(smartPromiseTitle, smartPromiseValue) {
    await connect();

    const payableValue = {
        value: ethers.utils.parseEther(smartPromiseValue)
    }
    //console.log(payableValue);

    const txResponse = await smartPromiseContract.connect(signer)
        .createSmartPromise(smartPromiseTitle, payableValue);
    await txResponse.wait();

    console.log("Transaction hash: ", txResponse);

    if (txResponse) {
        let completedPromiseDiv = document.createElement("div");
        let completedPromisePara = document.createElement("p");

        completedPromisePara.innerText = "finished transaction";
        completedPromiseDiv.appendChild(completedPromisePara);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// JOIN PROMISE ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export async function joinPromiseJS(uidInputValue, joinValue) {
    await connect();
    //console.log(joinValue);

    joinValue = joinValue/1000000000000000000;
    joinValue = JSON.stringify(joinValue);
    joinValue = {
        value: ethers.utils.parseEther(joinValue)
    }

    const txResponse = await smartPromiseContract.connect(signer)
        .joinPromise(uidInputValue ,joinValue); 
    await txResponse.wait();
}

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// END PROMISE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export async function endPromiseJS(endValueID) {
    await connect();

    const payableValue = {
        value: ethers.utils.parseEther("0")
    };

    const txResponse = await smartPromiseContract.connect(signer)
        .endSmartPromise(endValueID, payableValue);
    await txResponse.wait();
}

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// SEARCH PROMISE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// Calling read only fn showPromiseParticipants
export async function searchPromiseJS(_promiseUID) {
    await connect();

    const txResponse = await smartPromiseContract.connect(signer)
        .showPromiseInfo(_promiseUID);
    return await txResponse;
}

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Check Connection ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export async function checkConnection () {
    let accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {
        return true;
    } 
    else {
        return false;
    }
}