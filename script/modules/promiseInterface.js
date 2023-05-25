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
let isSuccessfulPromiseMsgPrinted = false;
let eventListenerAdded = false;

export const listenToEvent = async (successfulPromiseUID) => {
  if (eventListenerAdded) {
    return;
  }

  eventListenerAdded = true;

  const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
  const contract = new ethers.Contract(smartPromiseAddress, smartPromiseAbi, signer);

  contract.on("SmartPromiseCreated", async (promiseIdentifier) => {
    const data = await searchPromiseJS(promiseIdentifier);
    if (data[0][0] !== await signer.getAddress()) {
      console.log("user is not signer");
      return;
    }

    const identifier = { promiseIdentifier: promiseIdentifier.toString() };
    const successfulPromiseMsg = document.createElement("p");
    successfulPromiseUID.style.display = "block";
    successfulPromiseUID.appendChild(successfulPromiseMsg);

    const countdownTimer = document.createElement("div"); 
    countdownTimer.id = "countdown-timer"; 
    successfulPromiseUID.appendChild(countdownTimer); 

    let intervalId = setInterval(() => {
      const date = data[3] * 1000;
      const dateNow = new Date().getTime();
      const dateDiff = date - dateNow;

      switch (true) {
        case !isSuccessfulPromiseMsgPrinted:
          //successfulPromiseUID.innerHTML = `Your promise ID is: ${identifier.promiseIdentifier}<br><br>`;
          successfulPromiseMsg.innerHTML = `Your promise ID is: ${identifier.promiseIdentifier}<br><br>Please send this to promise participants. Remaining time is calculating...`;
          isSuccessfulPromiseMsgPrinted = true;
          break;

        case isSuccessfulPromiseMsgPrinted && dateDiff >= 0:
          const minutes = Math.floor(dateDiff / (1000 * 60)) % 60;
          const seconds = Math.floor(dateDiff / 1000) % 60;
          const res = `<h1 class="timer" style="color:red;">${minutes}<p>Mins</p></h1><h1 class="timer" style="color:red;">${seconds}<p>Seconds</p></h1>`;
          countdownTimer.innerHTML = `Remaining time: ${res}`; // Update the innerHTML of the countdownTimer element to display the countdown timer
          break;

        case isSuccessfulPromiseMsgPrinted && dateDiff < 0:
          clearInterval(intervalId);
          successfulPromiseMsg.innerHTML = "Deadline has passed!";
          break;
      }

    }, 1000);
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
    //console.log(await txResponse);
    return await txResponse;
};
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Check Connection ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
export async function checkConnection() {
    let accounts;
    try {
        accounts = await ethereum.request({
            method: 'eth_accounts'
        });
    } catch (err) {
        alert("Please install the MetaMask wallet to use our service!");
    }

    signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
    if (accounts.length) {
        const chainId = await signer.getChainId();
        if (chainId !== 5) {
            requestNetworkSwap();
        }
        return true;
    } else {
        return false;
    }
}
