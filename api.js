/* export default { getBalance, getTransactions };


const YOUR_API_KEY = '6M66CW4F48TDS1AVR3U2DRDD1PAIGJ8QRK';
const ADDRESS = '0xccec26e3640a0F70808F78118863d045669e271D';

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

getTransactions(); */