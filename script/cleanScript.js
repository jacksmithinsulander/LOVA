///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// FUNCTIONS IMPORTS /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

import { connect } from "./modules/promiseInterface.js";
import { createFooter } from "./modules/createFooter.js";
import { createHeaderHome } from "./modules/createHeader.js";
import { createHeaderApp } from "./modules/createHeader.js";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// PROMISE INTERFACE IMPORTS //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

import { createSmartPromiseJS } from "./modules/promiseInterface.js";
import { joinPromiseJS } from "./modules/promiseInterface.js";
import { endPromiseJS } from "./modules/promiseInterface.js";
import { searchPromiseJS } from "./modules/promiseInterface.js";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INNER HTML VARIABLES ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

import { sectionOneHtml as sectionOneHtml } from "./htmlExports/sectionOne.js";
import { sectionTwoHtml as sectionTwoHtml } from "./htmlExports/sectionTwo.js";
import { sectionThreeHtml as sectionThreeHtml } from "./htmlExports/sectionThree.js";

import { createPromiseHtml } from "./htmlExports/promiseInterfaces.js";
import { joinPromiseHtml } from "./htmlExports/promiseInterfaces.js";
import { endPromiseHtml } from "./htmlExports/promiseInterfaces.js";
import { searchPromiseHtml } from "./htmlExports/promiseInterfaces.js";


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// GLOBAL VARIABLES ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

let header;
let main;
let homeBtn;
let footer;
let connectWalletBtn;

//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// WEBSITE HOME //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

function landingPage() {
    if (header) header.remove();
    if (main) main.remove();
    if (footer) footer.remove();
    document.body.removeAttribute("id");

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

    header = createHeaderHome();
    footer = createFooter(footer);
    document.body.append(header, main, footer);

    main = document.createElement("main");
    main.id = "main";
    main.append(sectionOne, sectionTwo, sectionThree);

    homeBtn = document.getElementById("homeBtn");
    homeBtn.addEventListener("click", () => {
        landingPage();
    });

    const dappLaunchBtn = document.getElementById("dappLaunchBtn");
    dappLaunchBtn.addEventListener("click", () => {
        launchApp();
    });
}

landingPage();


///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////  dApp  /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function launchApp() {

    // Removing Homepage Content
    if (header) header.remove();
    if (main) main.remove();
    if (footer) footer.remove(); 

    //----------CREATE PROMISE DOM-----------//
    let createSmartPromiseInterface = document.createElement("details");
    createSmartPromiseInterface.id = "createSmartPromiseInterface";
    createSmartPromiseInterface.innerHTML =  createPromiseHtml;

    //----------JOIN PROMISE DOM-----------//
    let joinPromiseInterface = document.createElement("details");
    joinPromiseInterface.id = "joinPromiseInterface";
    joinPromiseInterface.innerHTML = joinPromiseHtml;

    //----------END PROMISE DOM-----------//
    let endPromiseInterface = document.createElement("details");
    endPromiseInterface.id = "endPromiseInterface";
    endPromiseInterface.innerHTML = endPromiseHtml;

    //----------SEARCH PROMISE DOM-----------//
    let searchSmartPromiseInterface = document.createElement("details");
    searchSmartPromiseInterface.id = "searchSmartPromiseInterface";
    searchSmartPromiseInterface.innerHTML = searchPromiseHtml;

    
    header = createHeaderApp();
    footer = createFooter();
    let footerInfo = document.createElement("h1");
    footer.append(footerInfo);

    document.body.id = "bodyApp";
    let interfaceSection = document.createElement("section");
    interfaceSection.id = "interfaceSection";
    interfaceSection.append(createSmartPromiseInterface, joinPromiseInterface, endPromiseInterface, searchSmartPromiseInterface);

    main = document.createElement("main");
    main.id = "main";
    main.innerHTML="";    
    main.append(interfaceSection);
    
    createSmartPromiseInterface.open = true;

    document.body.append(header, main, footer);

    homeBtn = document.getElementById("homeBtn");
    homeBtn.addEventListener("click", () => {
        landingPage();
    });

    connectWalletBtn = document.getElementById("connectWalletBtn");
    connectWalletBtn.addEventListener("click", async () => {
        connect();
    });
    

    //---------- DETAILS -----------//
    const detailsElements = document.querySelectorAll("details");
    detailsElements.forEach(element => {
        element.addEventListener("click", event => {
            detailsElements.forEach(otherElement => {
                if (otherElement !== event.currentTarget) {
                    createSmartPromiseInterface.classList.add("closing");
                    otherElement.removeAttribute("open");
                }
            });
        });
    });
}

landingPage();

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// INTERFACE BTN EVENT LISTENERS ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

//----------CREATE PROMISE-----------//
const createPromiseBtn = document.getElementById("createPromiseBtn");
createPromiseBtn.addEventListener("click", () => {
    createSmartPromiseJS(titleInput.value, valueInput.value);
});

//----------JOIN PROMISE-----------//
const joinPromiseBtn = document.getElementById("joinPromiseBtn");
joinPromiseBtn.addEventListener("click", () => {
    joinPromiseJS(uidInput.value, joinPromiseValue.value);
});

//----------END PROMISE-----------//
const endPromiseBtn = document.getElementById("endPromiseBtn");
endPromiseBtn.addEventListener("click", () => {
    endPromiseJS(endPromiseUidValue.value);
});

//----------SEARCH PROMISE-----------//
const searchPromiseBtn = document.getElementById("searchPromiseBtn");
const searchOutput = document.getElementById("searchOutput")
searchPromiseBtn.addEventListener('click', () => {
    searchOutput.innerHTML = searchPromiseJS(promiseId.value);
});

