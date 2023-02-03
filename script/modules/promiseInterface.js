import { abi as smartPromiseAbi } from './abi.js'

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// WEB 3 FUNCTIONALITY ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const smartPromiseAddress = "0x9B5e4655FE2DB73d17fa4c1AB467d2D3bA62e462";

const network = "goerli"
const apiKey = "839f70b5cbfc4b13a4f4ba5a1f24423a"
const provider = new ethers.providers.InfuraProvider(network, apiKey);
const smartPromiseContract = new ethers.Contract(smartPromiseAddress, smartPromiseAbi, provider);
const filter = smartPromiseContract.filters.SmartPromiseCreated(null);
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

    contract.on("SmartPromiseCreated", async (promiseIdentifier) => {
        await searchPromiseJS(promiseIdentifier)
            .then(async (data) => {
                if (data[0][0] === await signer.getAddress()) {
                    let identifier = {
                        promiseIdentifier: promiseIdentifier
                            .toString()
                    };

                    let countdownTimer = document.getElementById("countdownTimer");
                    let countdown = new Date(data[3] * 1000);
                    console.log(data[3]);
                    let timer = setInterval(() => {
                        countdown -= 1000;
                        let minutes = Math.floor(countdown / (60 * 1000));
                        let seconds = Math.floor((countdown - (minutes * 60 * 1000)) / 1000);
                        countdownTimer.innerHTML = `Participation deadline: ${minutes} minutes ${seconds} seconds;`
                        if (countdown <= 0) {
                            clearInterval(timer);
                            countdownTimer.innerHTML = `Deadline has passed!;`
                        }

                    }, 1000);
                    successfulPromiseUID.innerHTML =
                        `Your promise ID is: ${identifier.promiseIdentifier} <br><br> Please send this to promise participants`

                }
                else {
                    console.log("user is not signer");
                }
            })
    });
}

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
}

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// JOIN PROMISE ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export async function joinPromiseJS(uidInputValue, joinValue) {
    await connect();

    joinValue = joinValue / 1000000000000000000;
    joinValue = JSON.stringify(joinValue);
    joinValue = {
        value: ethers.utils.parseEther(joinValue)
    }

    const txResponse = await smartPromiseContract.connect(signer)
        .joinPromise(uidInputValue, joinValue);
    await txResponse.wait();
}

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// SIGN END PROMISE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export async function signFullfilledPromiseJS(promiseUID) {
    await connect();
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

export async function searchPromiseJS(_promiseUID) {
    await connect();

    const txResponse = await smartPromiseContract.connect(signer)
        .showPromiseInfo(_promiseUID);
    return await txResponse;
}

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Check Connection ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export async function checkConnection() {
    let accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
        return true;
    }
    else {
        return false;
    }
}