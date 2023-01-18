/* export default {};


const YOUR_API_KEY = '6M66CW4F48TDS1AVR3U2DRDD1PAIGJ8QRK';
const ADDRESS = '0x7E989e0c8e43B488F2B820Ab0A4c38Fd1cD86620';
const transactionHash = "0x0adc45cc71bf201ac79cc680a53284b2287b1a2809476437ecfde858e4167234";

const url = `https://api-goerli.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0x7E989e0c8e43B488F2B820Ab0A4c38Fd1cD86620&topic0=0x56df64f263de76ba2e6c9f941eaeb2b4d4b99fbf9e729461f20537d17fa77a82&apikey=${YOUR_API_KEY}`

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Iterate through the logs array and extract the necessary information
  })
  .catch(error => {
    console.log(error);
  });


/* 

async function getBalance() {
    const url = `https://api-goerli.etherscan.io/api?module=account&action=balance&address=${ADDRESS}&tag=latest&apikey=${YOUR_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`Balance of ${ADDRESS} is: ${data.result / (10 ** 18)} ether`);
    } catch (error) {
        console.error(error);
    }
}
getBalance();
async function getTransactions() {
    const url = `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${ADDRESS}&startblock=0&endblock=99999999&sort=asc&apikey=${YOUR_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.result);
    } catch (error) {
        console.error(error);
    }
}
getTransactions(); 
 */
