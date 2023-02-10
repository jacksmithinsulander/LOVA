import {
    abi as smartPromiseAbi
} from './abi.js'
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// WEB 3 FUNCTIONALITY ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const smartPromiseAddress = "0xBFB0F5eff414ed83Ff7A55D5647DF12E28b1E948";
const network = "goerli"
const apiKey = "839f70b5cbfc4b13a4f4ba5a1f24423a"
const provider = new ethers.providers.InfuraProvider(network, apiKey);
const smartPromiseContract = new ethers.Contract(smartPromiseAddress, smartPromiseAbi, provider);
let signer; 
//let signer = new ethers.providers.JsonRpcProvider().getSigneri(); 
//(new ethers.providers.Web3Provider(window.ethereum)).getSigner();
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// EVENT LISTENER //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
export const listenToEvent = async (successfulPromiseUID) => {
    signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
    const contract = new ethers.Contract(smartPromiseAddress, smartPromiseAbi, signer);
    contract.on("SmartPromiseCreated", async (promiseIdentifier) => {
        await searchPromiseJS(promiseIdentifier).then(async (data) => {
            if (data[0][0] === await signer.getAddress()) {
                let identifier = {
                    promiseIdentifier: promiseIdentifier.toString()
                };

                function timePart(val, text, color = "black") {
                    return `<h1 class="timer" style="color:${color};">${val}<p>${text}</p></h1>`;
                }

                // Update the count down every 1 second
                var x = setInterval(function() {
                    const date = data[3] * 1000;
                    const dateNow = new Date().getTime();
                    const dateDiff = date - dateNow;
                    console.log(date, "date now is", dateNow,
                        "difference is ", dateDiff);
                    var minutes = Math.floor(dateDiff / (1000 * 60)) % 60;
                    var seconds = Math.floor(dateDiff / 1000) % 60;
                    let res = timePart(minutes, 'Mins') + timePart(
                        seconds, 'Seconds', 'red');
                    // If the count down is finished, write some text 
                    if (dateDiff < 0) {
                        clearInterval(x);
                        successfulPromiseUID.innerHTML =
                            `Your promise ID is: ${identifier.promiseIdentifier} <br><br> Please send this to promise participants.`;
                    } else {
                        successfulPromiseUID.innerHTML =
                            `Your promise ID is: ${identifier.promiseIdentifier} <br><br> Please send this to promise participants. Remaining time is ${res}`;
                    }
                }, 1000);
            } else {
                console.log("user is not signer");
            }
        });
    });
};
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// CONNECT() ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
export const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        checkConnection();
        signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
        smartPromiseContract.connect(signer);
        const successfulPromiseUID = document.getElementById("successfulPromiseUID");
        listenToEvent(successfulPromiseUID);
        return true;
    } else {
        alert("No metamask wallet detected");
        return false;
    };
};

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Request network swap ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
async function requestNetworkSwap() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5'}],
        });
    } catch (error) {
        if (error.code == 4902) {
            try {
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{chainId: '0x5', rpcUrl: 'https://goerli.blockpi.network/v1/rpc/public/'}]
                })
            } catch(addError) {
                console.error(addError);
            }
        }
        console.error(error);
    }
}
        


///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// CREATE PROMISE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
export async function createSmartPromiseJS(smartPromiseTitle, smartPromiseValue) {
    await connect();
    const payableValue = {
        value: ethers.utils.parseEther(smartPromiseValue)
    }
    const txResponse = await smartPromiseContract.connect(signer).createSmartPromise(smartPromiseTitle,
        payableValue);
    await txResponse.wait();
};
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// JOIN PROMISE ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
export async function joinPromiseJS(uidInputValue, joinValue) {
    await connect();
    joinValue = joinValue / 1000000000000000000;
    joinValue = JSON.stringify(joinValue);
    joinValue = {
        value: ethers.utils.parseEther(joinValue)
    };
    const txResponse = await smartPromiseContract.connect(signer).joinPromise(uidInputValue, joinValue);
    await txResponse.wait();
};
///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// SIGN END PROMISE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
export async function signFullfilledPromiseJS(promiseUID) {
    await connect();
    const txResponse = await smartPromiseContract.connect(signer).signFullfilledPromise(promiseUID);
    return await txResponse;
};
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// END PROMISE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
export async function endPromiseJS(endValueID) {
    await connect();
    const payableValue = {
        value: ethers.utils.parseEther("0")
    };
    const txResponse = await smartPromiseContract.connect(signer).endSmartPromise(endValueID,
        payableValue);
    await txResponse.wait();
};
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// SEARCH PROMISE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
export async function searchPromiseJS(_promiseUID) {
    await connect();
    const txResponse = await smartPromiseContract.connect(signer).showPromiseInfo(_promiseUID);
    return await txResponse;
};
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Check Connection ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
export async function checkConnection() {
    let accounts = await ethereum.request({
        method: 'eth_accounts'
    });
    signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
    if (accounts.length) {
        await signer.getChainId()
        .then((chainId) => {
            if(chainId != 5) {
                requestNetworkSwap();
            }
            else {
                // Wallet is connected to goerli
            }
        })
        return true;
    } else {
        return false;
    };
};
