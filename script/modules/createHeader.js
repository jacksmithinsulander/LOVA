export function createHeaderHome() {

    let header = document.createElement("header");
    header.id = "header";
    header.innerHTML = `
    <figure id="homeBtn"> 
		<img src="imgs/logoTransparentBackground.webp"id="homeBtnImg"></img>
    </figure>
    <button id="dappLaunchBtn">Launch dApp</button>`;  

/*     const dappLaunchBtn = document.createElement("button");
    dappLaunchBtn.innerHTML = "Launch dApp";
    dappLaunchBtn.id = "dappLaunchBtn";
    header.append(dappLaunchBtn); */
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