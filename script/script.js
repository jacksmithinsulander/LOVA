// import api from './api.js'
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
/* let createPromiseDivExitBtn = document.createElement("button");
let joinPromiseDivExitBtn = document.createElement("button");
let endPromiseDivExitBtn = document.createElement("button");
 */
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
let line = document.createElement("div")
let line2 = document.createElement("div")
let circle = document.createElement("div")
let circle2 = document.createElement("div")


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
line.id = "line"
line2.id = "line2"
circle.id = "circle"
circle2.id = "circle2"

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

createPromiseBtn.innerText = "Create SmartPromise";
joinPromiseBtn.innerText = "Join SmartPromise";
endPromiseBtn.innerText = "End SmartPromise";
navCreateBtn.innerText = "Create a promise"
navJoinBtn.innerText = "Join a promise"
navEndBtn.innerText = "End a promise"
/* createPromiseDivExitBtn.innerText = "X"
joinPromiseDivExitBtn.innerText = "X"
endPromiseDivExitBtn.innerText = "X"
 */
// Appends
document.body.append(otherContentWrapper, walletConnectBtn)
otherContentWrapper.append(navigationMenu, createPromiseDiv, joinPromiseDiv, endPromiseDiv, line, line2, circle, circle2);
navigationMenu.append(navCreateBtn, navJoinBtn, navEndBtn)
createPromiseDiv.append(titleInput, valueInput, createPromiseBtn)
joinPromiseDiv.append(uidInput, joinPromiseValue, joinPromiseBtn)
endPromiseDiv.append(endPromiseUidValue, endPromiseBtn)

//---------------SLUT PÅ DESIGN ----------------//




//----------- RIKTAR JS -> SMART CONTRACT ----------------//

const smartContractInteraction = document.createElement("form");

const smartPromiseAddress = "0x7E989e0c8e43B488F2B820Ab0A4c38Fd1cD86620";

const smartPromiseAbi = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "promiseIdentifier", "type": "uint256" }], "name": "SmartPromiseCreated", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "_promiseTitle", "type": "string" }], "name": "createSmartPromise", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "emptyPromiseData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_promiseUID", "type": "uint256" }], "name": "endSmartPromise", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_promiseUID", "type": "uint256" }], "name": "joinPromise", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_promiseUID", "type": "uint256" }], "name": "showPromiseParticipants", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_promiseUID", "type": "uint256" }], "name": "signFullfilledPromise", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "smartPromises", "outputs": [{ "internalType": "address", "name": "initialDepositor", "type": "address" }, { "internalType": "uint256", "name": "promiseCollateral", "type": "uint256" }, { "internalType": "string", "name": "promiseTitle", "type": "string" }, { "internalType": "uint256", "name": "promiseIdentifier", "type": "uint256" }, { "internalType": "uint256", "name": "promiseAcceptDeadline", "type": "uint256" }], "stateMutability": "view", "type": "function" }]


const provider = new ethers.providers.Web3Provider(window.ethereum);

const smartPromiseContract = new ethers.Contract(smartPromiseAddress, smartPromiseAbi, provider);

const filter = smartPromiseContract.filters.SmartPromiseCreated(null);

const results = await smartPromiseContract.queryFilter(filter, 8327570, 8328820)

let signer;

const listenToEvent = () => {
	const contract = new ethers.Contract(
		smartPromiseAddress,
		smartPromiseAbi,
		signer
	);
	contract.on("SmartPromiseCreated", (promiseIdentifier) => {
		let data = {
			promiseIdentifier: promiseIdentifier.toString()
		};
		console.log("listenToEvent", data);

		let newPromiseDiv = document.createElement("div")
		let newPromisePara = document.createElement("p")
		newPromiseDiv.id = "newPromiseDiv"
		newPromisePara.id = "newPromisePara"
		newPromisePara.innerHTML = `Your promise ID is: ${data.promiseIdentifier} <br><br> Please send this to promise participants`
		otherContentWrapper.append(newPromiseDiv);
		newPromiseDiv.append(newPromisePara);
	});
}

const connect = async () => {
	if (typeof window.ethereum !== "undefined") {
		await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		signer = provider.getSigner();
		smartPromiseContract.connect(signer);
		listenToEvent();
	} else {
		console.log("No metamask");
	}
};

walletConnectBtn.addEventListener("click", async () => {
	await connect();

})

console.log("senast log", results);

//----------FUNKTIONER TILL KEDJAN-----------//

async function createSmartPromiseJS() {
	await connect();

	let smartPromiseTitle = titleInput.value;
	let smartPromiseValue = valueInput.value;
	const payableValue = { value: ethers.utils.parseEther(smartPromiseValue) }
	const txResponse = await smartPromiseContract.connect(signer).createSmartPromise(smartPromiseTitle, payableValue);
	await txResponse.wait();
	console.log("Transaction hash: ", txResponse);
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

async function joinPromiseJS() {
	await connect();
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
	await connect();
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

	let createPromiseDiv = document.getElementById("createPromiseDiv").style.display = "block";
	if (document.getElementById("joinPromiseDiv").style.display == 'block' || document.getElementById("endPromiseDiv").style.display == 'block') {
		let joinPromiseDiv = document.getElementById("joinPromiseDiv").style.display = "none";
		let endPromiseDiv = document.getElementById("endPromiseDiv").style.display = "none";
	}
})

navJoinBtn.addEventListener("click", () => {

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

