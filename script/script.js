///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// FUNCTIONS IMPORTS /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

import { connect } from "./modules/promiseInterface.js";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// PROMISE INTERFACE IMPORTS //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

import { createSmartPromiseJS, 
    joinPromiseJS, 
    endPromiseJS, 
    searchPromiseJS, 
    signFullfilledPromiseJS, 
    checkConnection } from "./modules/promiseInterface.js";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INNER HTML VARIABLES ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

import { sectionOneHtml as sectionOneHtml } from "./htmlExports/sectionOne.js";
import { sectionTwoHtml as sectionTwoHtml } from "./htmlExports/sectionTwo.js";
import { sectionThreeHtml as sectionThreeHtml } from "./htmlExports/sectionThree.js";
import { createFooter } from "./htmlExports/createFooter.js";
import { createHeaderHome, createHeaderApp } from "./htmlExports/createHeader.js";
import { createPromiseHtml, joinPromiseHtml, endPromiseHtml, searchPromiseHtml } from "./htmlExports/promiseInterfaces.js";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// GLOBAL VARIABLES ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

/*let header;
let main;
let homeBtn;
let footer;
let connectWalletBtn;
let dappLaunchBtn;*/

let header, main, homeBtn, footer, connectWalletBtn, dappLaunchBtn;

//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// WEBSITE HOME //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

function clearPage() {
    if (header || main || footer) {
        document.body.innerHTML = "";
    }
}

function landingPage() {
    clearPage();

    //---------- REGENERATING MAIN -----------//
    document.body.removeAttribute("id");
    main = document.createElement("main");
    main.id = "main";

    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// LANDING PAGE TXT ///////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    //---------- SECTION ONE TXT -----------//
    let sectionOne = document.createElement("section");
    sectionOne.id = "sectionOne";
    sectionOne.classList.add("section");
    sectionOne.innerHTML = sectionOneHtml;

    //---------- SECTION TWO TXT -----------//
    let sectionTwo = document.createElement("section");
    sectionTwo.id = "sectionTwo";
    sectionTwo.classList = "section";
    sectionTwo.innerHTML = sectionTwoHtml;

    //---------- SECTION THREE TXT -----------//
    let sectionThree = document.createElement("section");
    sectionThree.id = "sectionThree";
    sectionThree.classList = "section";
    sectionThree.innerHTML = sectionThreeHtml;

    //---------- APPENDING CONTENT TO DOC -----------//
    header = createHeaderHome();
    main.append(sectionOne, sectionTwo, sectionThree);
    footer = createFooter(footer);
    document.body.append(header, main, footer);

    //---------- EVENT LISTENERS -----------//
    homeBtn = document.getElementById("homeBtn");
    dappLaunchBtn = document.getElementById("dappLaunchBtn");

    homeBtn.addEventListener("click", () => {
        landingPage();
    });

    dappLaunchBtn.addEventListener("click", () => {
        launchApp();
    }); 
}

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////  dApp  /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function launchApp() {
    clearPage();

    //---------- REGENERATING MAIN -----------//
    main = document.createElement("main");
    main.id = "main";

    //---------- BODY SETUP -----------//
    document.body.id = "bodyApp";
    let interfaceSection = document.createElement("section");
    interfaceSection.id = "interfaceSection";

    //---------- CREATE PROMISE DOM -----------//
    let createSmartPromiseInterface = document.createElement("details");
    createSmartPromiseInterface.id = "createPromiseInterface";
    createSmartPromiseInterface.innerHTML = createPromiseHtml;

    //---------- JOIN PROMISE DOM -----------//
    let joinPromiseInterface = document.createElement("details");
    joinPromiseInterface.id = "joinPromiseInterface";
    joinPromiseInterface.innerHTML = joinPromiseHtml;

    //---------- END PROMISE DOM -----------//
    let endPromiseInterface = document.createElement("details");
    endPromiseInterface.id = "endPromiseInterface";
    endPromiseInterface.innerHTML = endPromiseHtml;

    //---------- SEARCH PROMISE DOM -----------//
    let searchSmartPromiseInterface = document.createElement("details");
    searchSmartPromiseInterface.id = "searchPromiseInterface";
    searchSmartPromiseInterface.innerHTML = searchPromiseHtml;

    //---------- CREATING HEADER AND FOOTER -----------//
    header = createHeaderApp();
    footer = createFooter(footer);

    //---------- APPENDING CONTENT -----------//

    interfaceSection.append(
        createSmartPromiseInterface,
        joinPromiseInterface,
        endPromiseInterface,
        searchSmartPromiseInterface);

    createSmartPromiseInterface.open = true;
    main.append(interfaceSection);

    document.body.append(header, main, footer);

    //---------- EVENT LISTENERS -----------//
    homeBtn = document.getElementById("homeBtn");
    homeBtn.addEventListener("click", () => {
        landingPage();
    });

    connectWalletBtn = document.getElementById("connectWalletBtn");
    async function loadWalletBtn () {
        if (await checkConnection() === false) {
            connectWalletBtn.addEventListener("click", async () => {
                if (await connect() === true) {
                    connectWalletBtn.innerText = "Wallet Connected";
                } else {
                    alert("Connection to Metamask failed!");
                }
            });
        } 
        else {
            connectWalletBtn.innerText = "Wallet Connected";
        }
    }
    loadWalletBtn();

    //---------- DETAILS -----------//
    const detailsElements = document.querySelectorAll("details");
    detailsElements.forEach(element => {
        element.addEventListener("click", event => {
            detailsElements.forEach(otherElement => {
                if (otherElement !== event
                    .currentTarget) {
                    createSmartPromiseInterface.classList.add("closing");
                    otherElement.removeAttribute("open");
                }
            });
        });
    });
    dappButtons();
}
landingPage();

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// INTERFACE BTN EVENT LISTENERS ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

//----------CREATE PROMISE-----------//
function dappButtons() {
    const createPromiseBtn = document.getElementById("createPromiseBtn");
    createPromiseBtn.addEventListener("click", () => {
        if (promiseCollateral.value < 0.001) {
            alert("Please input a minimum collateral of 0.001 ETH to continue")
        }
        else {
            createSmartPromiseJS(promiseTitle.value, promiseCollateral.value);
        }  
    });

    //----------JOIN PROMISE-----------//
    const joinPromiseBtn = document.getElementById("joinPromiseBtn");
    const joinPromiseSearchOutput = document.getElementById("joinPromiseSearchOutput");
    const promiseIDInput = document.getElementById("promiseID");
    joinPromiseBtn.addEventListener("click", async () => {
        await searchPromiseJS(promiseIDInput.value)
        .then((data) => {
            displayJoinSearchData(promiseIDInput.value, data)});
    });

    //----------END PROMISE-----------//
    const endPromiseBtn = document.getElementById("endPromiseBtn");
    endPromiseBtn.addEventListener("click", async () => {
        const endSelect = document.getElementById("endSelect");
        switch (endSelect.value) {
            case "sign":
                await signFullfilledPromiseJS(promiseIDToEnd.value)
                .then((data) => {  
                    alert("sign successful, please end promise once all participants have signed");
                }); 

            case "end":
                await endPromiseJS(promiseIDToEnd.value)
                .then((data) => {
                    alert("Promise is now complete and funds have been released");
                });

            case "":
                alert("Please select an option from the dropdown list");
        }
    });
    const endPromiseP = document.getElementById("endP");
    
    const signPromiseOption = document.getElementById("signPromiseOption"); 
    signPromiseOption.addEventListener('click', () => {
        endPromiseP.innerHTML = "Sign Promise"
    });

    const endPromiseOption = document.getElementById("endPromiseOption");
    endPromiseOption.addEventListener('click', () => {
        endPromiseP.innerHTML = "End Promise"
    });

    //----------SEARCH PROMISE-----------//
    const searchPromiseBtn = document.getElementById("searchPromiseBtn");
    const searchOutput = document.getElementById("searchOutput")
    searchPromiseBtn.addEventListener('click', async () => {
        await searchPromiseJS(promiseId.value)
        .then((data) => {displaySearchData(data)});
    });


    function displaySearchData(data) {
        searchOutput.innerHTML = `
        <p class="interfaceTXT">Promise Title: ${data[1]} </p>
        <p class="interfaceTXT">Promise Collateral: ${data[2]/1000000000000000000}ETH</p>
        `;
        for(let i = 0; i < data[0].length; i++){
            const participator = document.createElement("p");
            participator.className = "interfaceTXT";
            participator.innerHTML = `<p class="interfaceTXT">Participator ${i + 1} : ${data[0][i]}</p>`
            searchOutput.appendChild(participator);
        }
    }
    const joinPromiseP = document.getElementById("joinP");
    function displayJoinSearchData(promiseUID, data) {
        joinPromiseSearchOutput.innerHTML = `
        <p class="interfaceTXT">Promise Title: ${data[1]} </p>
        <p class="interfaceTXT">Promise Collateral: ${data[2]/1000000000000000000}ETH</p>
        `;
        joinPromiseP.innerHTML = "Join Promise"
        joinPromiseBtn.removeEventListener;
        joinPromiseBtn.addEventListener('click', async () => {
            joinPromiseJS(promiseUID, await data[2]);
        });
    }
}
