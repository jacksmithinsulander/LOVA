let contentWrapper = document.getElementById("contentWrapper");

const walletConnectBtn = document.createElement("button");
walletConnectBtn.innerText = "Connect Wallet";
contentWrapper.appendChild(walletConnectBtn);

const provider = new ethers.providers.Web3Provider(window.ethereum);

async function connectMetamask() {
	await provider.send("eth_requestAccounts", []);
	const signer = provider.getSigner();
}

walletConnectBtn.addEventListener ("click", () => {
	connectMetamask();
});

const smartPromiseAddress = "0x4B9678d7fa125c5Dffb553F787F918De4CcFBD34";

const smartPromiseAbi = [
	"function createSmartPromise(string memory _promiseTitle) public payable",
	"function joinPromise(uint _promiseUID) public payable",
	"function endSmartPromise(uint _promiseUID) public payable"];

const smartPromiseContract = new ethers.Contract(smartPromiseAddress, smartPromiseAbi, provider);

const smartContractInteraction = document.createElement("form");


let titleInput = document.createElement("input")
let valueInput = document.createElement("input")
let createPromiseBtn = document.createElement("button")
let uidInput = document.createElement("input")
let joinPromiseBtn = document.createElement("button")

createPromiseBtn.innerText = "Button"
joinPromiseBtn.innerText = "join"
contentWrapper.append(titleInput, valueInput, createPromiseBtn, uidInput, joinPromiseBtn)

async function createSmartPromiseJS () {
	// initialDepositor
	// promiseCollateral
	// promiseTitle
	// promiseIdentifier (random index)
	// let promiseTitle = titleInput.value
	// await smartPromiseAddress.createSmartPromise(${promiseTitle})
}

async function joinPromiseJS () {
	
}

async function endPromiseJS () {
	
}

/* await kontrakt.funtkion(ingående värde) */
