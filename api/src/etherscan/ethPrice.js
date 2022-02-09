import fetch from "node-fetch";

async function ethPrice() {
  const URL =
    "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" +
    process.env.ETHERSCAN_API_KEY;

  try {
    const response = await fetch(URL, { method: "GET" });
    const data = await response.json();
    const ethusd = data.result.ethusd;
    console.log("ETH price fetched successfully.");
    return ethusd;
  } catch (e) {
    console.log("Error while fetching ETH price.", e);
  }
}

export default ethPrice;
