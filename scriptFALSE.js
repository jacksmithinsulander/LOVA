//----------- DESIGN -----------------//
//----------- BUTTONS ----------------//
const walletConnectBtn = document.createElement("button");
let createPromiseBtn = document.createElement("button")
let joinPromiseBtn = document.createElement("button")
let endPromiseBtn = document.createElement("button")
let navCreateBtn = document.createElement("button");
let navJoinBtn = document.createElement("button");
let navEndBtn = document.createElement("button");

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

//------------- MISC ----------------//
let navCreateParagraf = document.createElement("p")
let navJoinParagraf = document.createElement("p")
let navEndParagraf = document.createElement("p")




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
endPromiseDiv.id = "endPromiseDiv"
navigationMenu.id = "navigationMenu"
navCreateBtn.id = "navCreateBtn"
navJoinBtn.id = "navJoinBtn"
navEndBtn.id = "navEndBtn"
navCreateParagraf.id = "navCreateParagraf"
navJoinParagraf.id = "navJoinParagraf"
navEndParagraf.id = "navEndParagraf"


//sets placeholder
titleInput.placeholder = "Title for promise";
valueInput.placeholder = "ETH amount";
uidInput.placeholder = "Promise ID";
joinPromiseValue.placeholder = "ETH amount (join)";
endPromiseUidValue.placeholder = "ID of promise you want to end";


//Sets class to all elements
joinPromiseDiv.classList += "formHidden"
createPromiseDiv.classList += "formHidden"
endPromiseDiv.classList += "formHidden"
walletConnectBtn.classList = "walletConnectBtn"
navCreateParagraf.classList = "textStyle"
navJoinParagraf.classList = "textStyle"
navEndParagraf.classList = "textStyle"


// sets innerText
walletConnectBtn.innerText = "Connect Wallet";
createPromiseBtn.innerText = "Create SmartPromise";
joinPromiseBtn.innerText = "Join SmartPromise";
endPromiseBtn.innerText = "End SmartPromise";
navCreateBtn.innerText = "Create a promise"
navCreateParagraf.innerText = "Click above to start creating your promise"
navJoinBtn.innerText = "Join a promise"
navJoinParagraf.innerText = "Click above to join already created promise"
navEndBtn.innerText = "End a promise"
navEndParagraf.innerText = "Click above to end already created promise. This will require both participants agreement"



// Appends
document.body.appendChild(otherContentWrapper)

otherContentWrapper.append(walletConnectBtn, navigationMenu, createPromiseDiv, joinPromiseDiv, endPromiseDiv,);
navigationMenu.append(navCreateBtn, navCreateParagraf, navJoinBtn, navJoinParagraf, navEndBtn, navEndParagraf)

createPromiseDiv.append(titleInput, valueInput, createPromiseBtn)
joinPromiseDiv.append(uidInput, joinPromiseValue, joinPromiseBtn)
endPromiseDiv.append(endPromiseUidValue, endPromiseBtn)


//---------SLUT PÅ DESIGN ----------------//


const provider = new ethers.providers.Web3Provider(window.ethereum);

let signer;

async function connectMetamask() {
	await provider.send("eth_requestAccounts", []);
	signer = provider.getSigner();
	smartPromiseContract.connect(signer);
}

walletConnectBtn.addEventListener("click", () => {
	connectMetamask();
});

const smartPromiseAddress = "0xccec26e3640a0F70808F78118863d045669e271D";

const smartPromiseAbi = [
	"function createSmartPromise(string memory _promiseTitle) public payable",
	"function joinPromise(uint _promiseUID) public payable",
	"function endSmartPromise(uint _promiseUID) public payable"];

const smartPromiseContract = new ethers.Contract(smartPromiseAddress, smartPromiseAbi, provider);

const smartContractInteraction = document.createElement("form");


async function createSmartPromiseJS() {
	await connectMetamask();
	let smartPromiseTitle = titleInput.value;
	let smartPromiseValue = valueInput.value;
	const payableValue = { value: ethers.utils.parseEther(smartPromiseValue) }
	const txResponse = await smartPromiseContract.connect(signer).createSmartPromise(smartPromiseTitle, payableValue);
	await txResponse.wait()
}
createPromiseBtn.addEventListener("click", () => {
	createSmartPromiseJS();
});


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