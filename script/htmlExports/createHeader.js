export function createHeaderHome() {

    let header = document.createElement("header");
    header.id = "header";
    header.innerHTML = `
    <figure id="homeBtn"> 
        <img src="imgs/logoTransparentBackground.webp"id="homeBtnImg"></img>
    </figure>
    <button id="dappLaunchBtn">Launch dApp</button>`;  
    return header;

}


export function createHeaderApp() {

    let header = document.createElement("header");
    header.id = "header";
    header.innerHTML = `
    <figure id="homeBtn">
        <img src="imgs/logoTransparentBackground.webp"
        id="homeBtnImg"></img></figure>
        <button id="connectWalletBtn">Connect Wallet</button>
    </figure>`;

    return header;
}