// Försökte skapa en onload där BARA connect wallet knapp syns
// därefter visa resten av sidan vid connectad wallet.


/* const connectButton = document.getElementById("walletConnectBtn");
const restOfPage = document.getElementById("otherContentWrapper");

window.onload = () => {
    // Hide the rest of the page by default
    restOfPage.style.display = "none";
    // Show the "Connect" button
    connectButton.style.display = "block";
}

connectButton.onclick = async () => {
    // Connect to MetaMask
    await connectMetamask();
    // Get the user's account
    const account = await provider.getSigner().getAddress();
    // Check if the user's account is valid
    if (account) {
        // If the account is valid, hide the "Connect" button and show the rest of the page
        connectButton.style.display = "none";
        restOfPage.style.display = "block";
    }
} */