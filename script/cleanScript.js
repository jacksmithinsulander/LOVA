import { abi as smartPromiseAbi } from "./modules/abi.js";
import { createFooter } from "./modules/createFooter.js";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// PROMISE INTERFACE IMPORTS //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

import { createSmartPromiseJS } from "./modules/promiseInterface.js";
import { joinPromiseJS } from "./modules/promiseInterface.js";
import { endPromiseJS } from "./modules/promiseInterface.js";
import { searchPromiseJS } from "./modules/promiseInterface.js";

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////INNER HTML VARIABLES/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

import { sectionOneHtml as sectionOneHtml } from "./htmlExports/sectionOne.js";
import { sectionTwoHtml as sectionTwoHtml } from "./htmlExports/sectionTwo.js";
import { sectionThreeHtml as sectionThreeHtml } from "./htmlExports/sectionThree.js";

import { createPromiseHtml } from "./htmlExports/promiseInterfaces.js";
import { joinPromiseHtml } from "./htmlExports/promiseInterfaces.js";
import { endPromiseHtml } from "./htmlExports/promiseInterfaces.js";
import { searchPromiseHtml } from "./htmlExports/promiseInterfaces.js";


///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////GLOBAL VARIABLES/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

let header;
let main;
let homeBtn;
let footer;
let connectWalletBtn;

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////WEBSITE HOME///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

function landingPage() {
    if (header) header.remove();
    if (main) main.remove();
    if (footer) footer.remove();
    document.body.removeAttribute("id");

    header = document.createElement("header");
    header.id = "header";
    header.innerHTML = `<figure id="homeBtn">
		<img src="imgs/logoTransparentBackground.webp"
		id="homeBtnImg"></img></figure>`;

    const dappLaunchBtn = document.createElement("button");
    main = document.createElement("main");
    main.id = "main";
    dappLaunchBtn.innerHTML = "Launch dApp";
    dappLaunchBtn.id = "dappLaunchBtn";

    /////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////PAGE TXT/////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    let sectionOne = document.createElement("section");
    sectionOne.id = "sectionOne";
    sectionOne.classList.add("section");
    sectionOne.innerHTML = sectionOneHtml;

    let sectionTwo = document.createElement("section");
    sectionTwo.id = "sectionTwo";
    sectionTwo.classList = "section";
    sectionTwo.innerHTML = sectionTwoHtml;

    let sectionThree = document.createElement("section");
    sectionThree.id = "sectionThree";
    sectionThree.classList = "section";
    sectionThree.innerHTML = sectionThreeHtml; 
    
    footer = createFooter(footer);
    document.body.append(header, main, footer);
    header.append(dappLaunchBtn);
    main.append(sectionOne, sectionTwo, sectionThree);

    homeBtn = document.getElementById("homeBtn");

    homeBtn.addEventListener("click", () => {
        landingPage();
    });

    dappLaunchBtn.addEventListener("click", () => {
        launchApp();
    });
}


///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////dApp/////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function launchApp() {
    // Removing Homepage Content
    if (header) header.remove();
    if (main) main.remove();
    if (footer) footer.remove();

    // Creating header element
    header = document.createElement("header");
    header.id = "header";
    header.innerHTML = `<figure id="homeBtn">
		<img src="imgs/logoTransparentBackground.webp"
		id="homeBtnImg"></img></figure>
        <button id="connectWalletBtn">Connect Wallet</button>`;


    // Creating main content area
    main = document.createElement("main");
    main.id = "main";

    document.body.id = "bodyApp";
    let interfaceSection = document.createElement("section");
    interfaceSection.id = "interfaceSection";


    /*                                  CREATE SMART PROMISE DOM                        */
    let createSmartPromiseInterface = document.createElement(
        "details");
    createSmartPromiseInterface.id = "createSmartPromiseInterface";
    createSmartPromiseInterface.innerHTML =  createPromiseHtml;

    /*                                  JOIN SMART PROMISE DOM                        */
    let joinPromiseInterface = document.createElement("details");
    joinPromiseInterface.id = "joinPromiseInterface";
    joinPromiseInterface.innerHTML = joinPromiseHtml;


    /*                                  END SMART PROMISE DOM                        */
    let endPromiseInterface = document.createElement("details");
    endPromiseInterface.id = "endPromiseInterface";
    endPromiseInterface.innerHTML = endPromiseHtml;


    /*                                 SEARCH SMART PROMISE DOM                        */
    let searchSmartPromiseInterface = document.createElement("details");
    searchSmartPromiseInterface.id = "searchSmartPromiseInterface";
    searchSmartPromiseInterface.innerHTML = searchPromiseHtml;


    // Adding Interface To Main
    main.append(interfaceSection);

    interfaceSection.append(
        createSmartPromiseInterface,
        joinPromiseInterface,
        endPromiseInterface,
        searchSmartPromiseInterface);

    createSmartPromiseInterface.open = true;

    document.body.append(header, main);
    main.append(interfaceSection);
    footer = document.createElement("footer");
    let footerInfo = document.createElement("h1");

    footer = createFooter(footer);
    document.body.append(footer);
    footer.append(footerInfo);

    homeBtn = document.getElementById("homeBtn");
    homeBtn.addEventListener("click", () => {
        landingPage();
    });

    connectWalletBtn = document.getElementById("connectWalletBtn");
    connectWalletBtn.addEventListener("click", async () => {
        connect();
    });

    const detailsElements = document.querySelectorAll("details");

    detailsElements.forEach(element => {
        element.addEventListener("click", event => {
            detailsElements.forEach(otherElement => {
                if (otherElement !== event
                    .currentTarget) {
                    createSmartPromiseInterface.classList.add("closing");
                    otherElement
                        .removeAttribute(
                            "open");
                }
            });
        });
    });
}

landingPage();

// ------ WEB 3 Functionality ------ //

const smartPromiseAddress =
    "0x7E989e0c8e43B488F2B820Ab0A4c38Fd1cD86620";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const smartPromiseContract = new ethers.Contract(smartPromiseAddress,
    smartPromiseAbi, provider);

const filter = smartPromiseContract.filters.SmartPromiseCreated(null);

const results = await smartPromiseContract.queryFilter(filter,
    8327570, 8328820);

let signer;

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

        let newPromiseDiv = document.createElement("div");
        let newPromisePara = document.createElement("p");
        newPromiseDiv.id = "newPromiseDiv";
        newPromisePara.id = "newPromisePara";
        newPromisePara.innerHTML =
            `Your promise ID is: ${data.promiseIdentifier} <br><br> Please send this to promise participants`
        otherContentWrapper.append(newPromiseDiv);
        newPromiseDiv.append(newPromisePara);
    });
}

console.log("senast log", results);

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

//----------FUNKTIONER TILL KEDJAN-----------//

const createPromiseBtn = document.getElementById("createPromiseBtn");

createPromiseBtn.addEventListener("click", () => {
    createSmartPromiseJS(titleInput.value, valueInput.value);
});

const joinPromiseBtn = document.getElementById("joinPromiseBtn");

joinPromiseBtn.addEventListener("click", () => {
    joinPromiseJS(uidInput.value, joinPromiseValue.value);
});
const endPromiseBtn = document.getElementById("endPromiseBtn");

endPromiseBtn.addEventListener("click", () => {
    endPromiseJS(endPromiseUidValue.value);
});

const searchPromiseBtn = document.getElementById("searchPromiseBtn");
const searchOutput = document.getElementById("searchOutput")

searchPromiseBtn.addEventListener('click', () => {
    searchOutput.innerHTML = searchPromiseJS(promiseId.value);
});


//----------EVENTLISTENERS TYP---------//
