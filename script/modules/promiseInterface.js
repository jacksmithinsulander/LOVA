import { abi as smartPromiseAbi } from './abi.js'

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// WEB 3 FUNCTIONALITY ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const smartPromiseAddress = "0x12A3b58b02C0F9E2d872C518A8EACbaAb2968591";

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

export const listenToEvent = async (successfulPromiseUID) => {
    const contract = new ethers.Contract(
        smartPromiseAddress,
        smartPromiseAbi,
        signer
    );
    console.log(signer);

    contract.on("SmartPromiseCreated", async (promiseIdentifier) => {
        await searchPromiseJS(promiseIdentifier)
        .then(async (data) => {
            console.log("data" + data[0][0]);
            console.log("signer Add" + await signer.getAddress());
            if (data[0][0] === await signer.getAddress()) {
                let data = {
                    promiseIdentifier: promiseIdentifier
                        .toString()
                };
                console.log("listenToEvent", data);
                successfulPromiseUID.innerHTML =
                    `Your promise ID is: ${data.promiseIdentifier} <br><br> Please send this to promise participants`
            }
            else {
                console.log("user is not signer");
            }
        })
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
        const successfulPromiseUID = document.getElementById("successfulPromiseUID");
        listenToEvent(successfulPromiseUID);
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
////////////////////////////////// SIGN END PROMISE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export async function signFullfilledPromiseJS(promiseUID) {
    await connect ();
    const txResponse = await smartPromiseContract.connect(signer)
        .signFullfilledPromise(promiseUID);
    return await txResponse;
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