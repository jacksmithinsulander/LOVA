// import api from './api.js'
// import design from './design.js'


// (Landing Page)
// Saker vi behöver:
// <Body>
//	 <Header>
//	  Nav
//	  Ul (Med )
//	 </Header>
//<Main>
//		<section 1>
//		h1, p, (informativ, slogan, etc)
//		<section 2>
//		how to, visuellt step-by-step
//		<section 3>
//		''vi är open source''
//		läs våra docs
//</Main>
//<Footer>
// 	container div

//thx for coming




let header = document.createElement("header")
let headerImg = document.createElement("a")
	header.id = "header"
	headerImg.id = "headerImg"
	headerImg.innerHTML = `<img src="/imgs/Untitled(1).webp" class="imageClass">`;

	const walletConnectBtn = document.createElement("button");
	walletConnectBtn.id = "walletConnectBtn";
	walletConnectBtn.innerText = "Launch dApp"

let main = document.createElement("main")
main.id = "main"

let sectionOne = document.createElement("section")
let sectionTwo = document.createElement("section")
let sectionThree = document.createElement("section")
sectionOne.id = " sectionOne"
sectionTwo.id = " sectionTwo"
sectionThree.id =  " sectionThree"
sectionOne.classList = "section"
sectionTwo.classList = "section"
sectionThree.classList = "section"

let sectionOneDiv = document.createElement("div")
let sectionOneTitle = document.createElement("h1")
let sectionOneSmallText = document.createElement("h3")
sectionOneTitle.classList = "sectionTitles"
sectionOneDiv.id = "sectionOneDiv"
sectionOneTitle.id = "sectionOneTitle"
sectionOneSmallText.id = "sectionOneSmallText"
sectionOneTitle.innerHTML = "Setting a new standard for promises."
sectionOneSmallText.innerHTML = "We believe in a revolution within the DeFi space, and for that trustworthy tools are needed to engage a trustless world of finance."

let sectionTwoDiv = document.createElement("div")
let sectionTwoTitle = document.createElement("h1")
sectionTwoTitle.classList = ("sectionTitles")
sectionTwoDiv.id = "sectionTwoDiv"
sectionTwoTitle.id = "sectionTwoTitle"
sectionTwoTitle.innerHTML = "Two"


let sectionThreeDiv = document.createElement("div")
let sectionThreeTitle = document.createElement("h1")
sectionThreeTitle.classList = ("sectionTitles")
sectionThreeDiv.id = "sectionThreeDiv"
sectionThreeTitle.id = "sectionThreeTitle"
sectionThreeTitle.innerHTML = "Check one Three"

let footer = document.createElement("footer")
let footerInfo = document.createElement("h1")
footer.id = "footer"
footerInfo.id = "footerInfo"
footerInfo.innerText = "this is the footer"
	
document.body.append(header, main, footer)
header.append(walletConnectBtn, headerImg)
main.append(sectionOne, sectionTwo, sectionThree)

sectionOne.append(sectionOneDiv)
sectionOneDiv.append(sectionOneTitle,sectionOneSmallText)

sectionTwo.append(sectionTwoDiv)
sectionTwoDiv.append(sectionTwoTitle)

sectionThree.append(sectionThreeDiv)
sectionThreeDiv.append(sectionThreeTitle)

footer.append(footerInfo)



// document.body.append(footer)

// Appen
/* 
const walletConnectBtn = document.createElement("button");
let createPromiseBtn = document.createElement("button");
let joinPromiseBtn = document.createElement("button");
let endPromiseBtn = document.createElement("button");


let titleInput = document.createElement("input");
let valueInput = document.createElement("input");
let uidInput = document.createElement("input");
let joinPromiseValue = document.createElement("input");
let endPromiseUidValue = document.createElement("input");

titleInput.id = "titleInput";
valueInput.id = "valueInput";
uidInput.id = "uidInput";
endPromiseUidValue.id = "endPromiseUidValue";
joinPromiseValue.id = "joinPromiseValue";
createPromiseBtn.id = "createPromiseBtn";
joinPromiseBtn.id = "joinPromiseBtn";
endPromiseBtn.id = "endPromiseBtn";
walletConnectBtn.id = "walletConnectBtn";

titleInput.placeholder = "Title for promise";
valueInput.placeholder = "ETH amount";
uidInput.placeholder = "Promise ID";
joinPromiseValue.placeholder = "ETH amount (join)";
endPromiseUidValue.placeholder = "ID of promise you want to end";


createPromiseBtn.innerText = "Create SmartPromise";
joinPromiseBtn.innerText = "Join SmartPromise";
endPromiseBtn.innerText = "End SmartPromise";
walletConnectBtn.innertext = "Connect Wallet"

document.body
.append(mainHeader, titleInput, valueInput, createPromiseBtn, joinPromiseBtn, uidInput, joinPromiseValue, joinPromiseBtn, endPromiseBtn, endPromiseUidValue, walletConnectBtn)
 */
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