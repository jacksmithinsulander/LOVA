import api from './api.js'
// import design from './design.js'

//----------- DESIGN -----------------//
//----------- BUTTONS ----------------//
const walletConnectBtn = document.createElement("button");
let createPromiseBtn = document.createElement("button")
let joinPromiseBtn = document.createElement("button")
let endPromiseBtn = document.createElement("button")
let navCreateBtn = document.createElement("button");
let navJoinBtn = document.createElement("button");
let navEndBtn = document.createElement("button");
let createPromiseDivExitBtn = document.createElement("button");
let joinPromiseDivExitBtn = document.createElement("button");
let endPromiseDivExitBtn = document.createElement("button");

//----------- INPUTS ----------------//
let titleInput = document.createElement("input")
let valueInput = document.createElement("input")
let uidInput = document.createElement("input")
let joinPromiseValue = document.createElement("input")
let endPromiseUidValue = document.createElement("input")

//------------- DIVS ----------------//
let otherContentWrapper = document.createElement("div")
let createPromiseDiv = document.createElement("div")
let joinPromiseDiv = document.createElement("div")
let endPromiseDiv = document.createElement("div")
let navigationMenu = document.createElement("div");
let currencyDiv = document.createElement("div");






//Sets ID to all elements
otherContentWrapper.id = "otherContentWrapper";
titleInput.id = "titleInput";
valueInput.id = "valueInput";
createPromiseBtn.id = "createPromiseBtn";
uidInput.id = "uidInput";
joinPromiseValue.id = "joinPromiseValue"
joinPromiseBtn.id = "joinPromiseBtn";
endPromiseUidValue.id = "endPromiseUidValue";
endPromiseBtn.id = "endPromiseBtn";
joinPromiseDiv.id = "joinPromiseDiv"
createPromiseDiv.id = "createPromiseDiv";
endPromiseDiv.id = "endPromiseDiv";
navigationMenu.id = "navigationMenu";
navCreateBtn.id = "navCreateBtn";
navJoinBtn.id = "navJoinBtn";
navEndBtn.id = "navEndBtn";

createPromiseDivExitBtn.id = "createPromiseDivExitBtn";
joinPromiseDivExitBtn.id = "joinPromiseDivExitBtn";
endPromiseDivExitBtn.id = "endPromiseDivExitBtn";
currencyDiv.id = "currencyDiv";

//sets placeholder
titleInput.placeholder = "Title for promise";
valueInput.placeholder = "ETH amount";
uidInput.placeholder = "Promise ID";
joinPromiseValue.placeholder = "ETH amount (join)";
endPromiseUidValue.placeholder = "ID of promise you want to end";


//Sets class to all elements
joinPromiseDiv.classList += "formHidden";
createPromiseDiv.classList += "formHidden";
endPromiseDiv.classList += "formHidden";
walletConnectBtn.classList = "walletConnectBtn";


// sets innerText
walletConnectBtn.innerText = "Connect Wallet";
createPromiseBtn.innerText = "Create SmartPromise";
joinPromiseBtn.innerText = "Join SmartPromise";
endPromiseBtn.innerText = "End SmartPromise";
navCreateBtn.innerText = "Create a promise"

navJoinBtn.innerText = "Join a promise"

navEndBtn.innerText = "End a promise"
createPromiseDivExitBtn.innerText = "X"
joinPromiseDivExitBtn.innerText = "X"
endPromiseDivExitBtn.innerText = "X"


// Appends
document.body.append(otherContentWrapper, walletConnectBtn)

otherContentWrapper.append(/*walletConnectBtn, */navigationMenu, createPromiseDiv, joinPromiseDiv, endPromiseDiv, currencyDiv);
navigationMenu.append(navCreateBtn, navJoinBtn, navEndBtn )

createPromiseDiv.append(titleInput, valueInput, createPromiseBtn, createPromiseDivExitBtn)
joinPromiseDiv.append(uidInput, joinPromiseValue, joinPromiseBtn, joinPromiseDivExitBtn)
endPromiseDiv.append(endPromiseUidValue, endPromiseBtn, endPromiseDivExitBtn)


//---------SLUT PÅ DESIGN ----------------//

const provider = new ethers.providers.Web3Provider(window.ethereum);

let signer;

async function connectMetamask() {

	await provider.send("eth_requestAccounts", []);
	signer = provider.getSigner();
	smartPromiseContract.connect(signer);
	//console.log(signer.getAddress());
}

walletConnectBtn.addEventListener("click", async () => {
    await connectMetamask();
    if (signer.getAddress()) {
        console.log("Signer has successfully signed in!");
    } else {
        console.log("Signer is not connected or has not granted access.");
    }
});


const smartPromiseAddress = "0x7E989e0c8e43B488F2B820Ab0A4c38Fd1cD86620";

const smartPromiseAbi = [
	"function createSmartPromise(string memory _promiseTitle) public payable",
	"function joinPromise(uint _promiseUID) public payable",
	"function endSmartPromise(uint _promiseUID) public payable"];

const smartPromiseContract = new ethers.Contract(smartPromiseAddress, smartPromiseAbi, provider);

const smartContractInteraction = document.createElement("form");


// async function createSmartPromiseJS() {
// 	await connectMetamask();
// 	let smartPromiseTitle = titleInput.value;
// 	let smartPromiseValue = valueInput.value;
// 	const payableValue = { value: ethers.utils.parseEther(smartPromiseValue) }
// 	const txResponse = await smartPromiseContract.connect(signer).createSmartPromise(smartPromiseTitle, payableValue).then(function(transaction) {
// 		console.log(transaction.hash); 
// 		smartPromiseContract.provider.waitForTransaction(transaction.hash).then(function(transactionReceipt) {
// 			console.log(transactionReceipt.logs[0].data); 
// 		});
// 	});

// 	 await txResponse()
// }


//---------READING CONTRACT---------//

// // Replace YOUR_CONTRACT_ADDRESS with the address of your deployed contract
// // = smartPromiseContract

// // Replace YOUR_ABI with the ABI of your contract
// // smartPromiseContract

// // Replace YOUR_PROMISE_TITLE with the title you want to use for the promise
// var promiseTitle = titleInput.value;
// // Create a new contract object
// var smartPromiseContract = new web3.eth.Contract(abi, contractAddress);

// // Call the createSmartPromise function and pass in the promise title
// smartPromiseContract.methods.createSmartPromise(promiseTitle).send({from: 'YOUR_ACCOUNT_ADDRESS', value: web3.utils.toWei('1', 'ether')}, function(error, result){
//     if(!error){
//         // The result will contain the promise identifier returned from the function
//         console.log(result);
//     } else {
//         console.log(error);
//     }
// });

async function createSmartPromiseJS() {


	await connectMetamask();

	let smartPromiseTitle = titleInput.value;
    let smartPromiseValue = valueInput.value;
    const payableValue = { value: ethers.utils.parseEther(smartPromiseValue) }
    const txResponse = await smartPromiseContract.connect(signer).createSmartPromise(smartPromiseTitle, payableValue);
    await txResponse.wait();
    console.log("Transaction hash: ", txResponse);
	// smartPromiseContract.on("SmartPromiseCreated", (promiseIdentifier) => {
	// 	console.log("Promise Identifier: ", promiseIdentifier);
	// });
		if (txResponse) {
			let completedPromiseDiv = document.createElement("div");
			let completedPromisePara = document.createElement("p");


			completedPromisePara.innerText = "finished transac"
			completedPromiseDiv.appendChild(completedPromisePara)


		}

}
createPromiseBtn.addEventListener("click", () => {
    createSmartPromiseJS();
});

//createPromiseBtn.addEventListener("click", () => {
	//createSmartPromiseJS();
//});


async function joinPromiseJS() {
	await connectMetamask();
	let uidInputValue = uidInput.value;
	let joinValue = joinPromiseValue.value;
	const payableValue = { value: ethers.utils.parseEther(joinValue) }
	const txResponse = await smartPromiseContract.connect(signer).joinPromise(uidInputValue, payableValue);
	await txResponse.wait()
}

joinPromiseBtn.addEventListener("click", () => {
	joinPromiseJS();
});

async function endPromiseJS() {
	await connectMetamask();
	let endValueID = endPromiseUidValue.value;
	const payableValue = { value: ethers.utils.parseEther("0") };
	const txResponse = await smartPromiseContract.connect(signer).endSmartPromise(endValueID, payableValue);
	await txResponse.wait()
}
endPromiseBtn.addEventListener("click", () => {
	endPromiseJS();
});


//----------EVENTLISTENERS TYP---------//

navCreateBtn.addEventListener("click", () => {
	console.log("click");
	let createPromiseDiv = document.getElementById("createPromiseDiv").style.display = "block";
	if (document.getElementById("joinPromiseDiv").style.display == 'block' || document.getElementById("endPromiseDiv").style.display == 'block') {
		let joinPromiseDiv = document.getElementById("joinPromiseDiv").style.display = "none";
		let endPromiseDiv = document.getElementById("endPromiseDiv").style.display = "none";
	}
})

navJoinBtn.addEventListener("click", () => {
	console.log("click 2");
	let joinPromiseDiv = document.getElementById("joinPromiseDiv").style.display = "block";
	if (document.getElementById("createPromiseDiv").style.display == 'block' || document.getElementById("endPromiseDiv").style.display == 'block') {
		let createPromiseDiv = document.getElementById("createPromiseDiv").style.display = "none";
		let endPromiseDiv = document.getElementById("endPromiseDiv").style.display = "none";

	}
})

navEndBtn.addEventListener("click", () => {
	let endPromiseDiv = document.getElementById("endPromiseDiv").style.display = "block";
	if (document.getElementById("createPromiseDiv").style.display == 'block' || document.getElementById("joinPromiseDiv").style.display == 'block') {
		let createPromiseDiv = document.getElementById("createPromiseDiv").style.display = "none";
		let joinPromiseDiv = document.getElementById("joinPromiseDiv").style.display = "none";
	}
})

createPromiseDivExitBtn.addEventListener("click", () => {
	let createPromiseDiv = document.getElementById("createPromiseDiv").style.display = "none";
})
joinPromiseDivExitBtn.addEventListener("click", () => {
	let joinPromiseDiv = document.getElementById("joinPromiseDiv").style.display = "none";
})
endPromiseDivExitBtn.addEventListener("click", () => {
	let endPromiseDiv = document.getElementById("endPromiseDiv").style.display = "none";
})



window.onload = function() {
	checkSigner();
	createLandingPage();
	
 }

 function checkSigner() {
    signer = provider.getSigner();
	if (signer.getAddress()) {
		console.log("Signer is already signed in!");
	

	}
 }

async function createLandingPage() {
	// code to create your landing page
	//const connectButton = document.getElementById("walletConnectBtn");
    const restOfPage = document.getElementById("otherContentWrapper");
    // Hide the rest of the page by default
    restOfPage.style.filter = "blur(0.8rem)";
	// Gör sidan oklickbar mohahahah
	restOfPage.style.pointerEvents = "none";
    // Show the "Connect" button
    walletConnectBtn.style.filter = "blur(0)";
	walletConnectBtn.addEventListener("click", async () => {
        await connectMetamask();
        if (signer.getAddress()) {
			localStorage.setItem("signer signed", signer.getAddress())
            console.log("Signer has successfully signed in!");
            const restOfPage = document.getElementById("otherContentWrapper");
            restOfPage.style.filter = "blur(0)";
            restOfPage.style.pointerEvents = "auto";
            walletConnectBtn.style.right = "0";
            walletConnectBtn.style.top = "0";
            walletConnectBtn.innerText = "Wallet Connected";
        } else {
            console.log("Signer is not connected or has not granted access.");
        }
    });
}


 


//----------- API REQUEST -----------//
