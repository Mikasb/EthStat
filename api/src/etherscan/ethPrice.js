import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("../.env") });
/**
 * EXAMPLE OF FETCHED DATA
 *  result: {
    ethbtc: '0.03191',
    ethbtc_timestamp: '1610750751',
    ethusd: '1172.48',
    ethusd_timestamp: '1610750749'
  }
 */
async function getEthPrice() {
  const URL =
    "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" +
    process.env.ETHERSCAN_API_KEY;

  try {
    const response = await fetch(URL, { method: "GET" });
    const data = await response.json();
    const ethusd = data.result.ethusd;
    console.log("ETH price fetched successfully: " + ethusd);
    return ethusd;
  } catch (e) {
    console.log("Error while fetching ETH price.", e);
  }
}

export default getEthPrice;
