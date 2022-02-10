import fetch from "node-fetch";
const startblock = "0";
const endblock = "999999999";
const mod = "account";
const action = "txlist";
const offset = "0";
const sort = "asc";

/**
 * EXAMPLE OF FETCHED DATA
 * 
 * data = {
  status: "1",
  message: "OK",
  result: [
    {
      blockNumber: '13926263',
      timeStamp: '1641130396',
      hash: '0x7bde6cb95d191e9b76666a5b9098703112a85da65b22bccb8e3a47a7cc366ca8',
      nonce: '18336',
      blockHash: '0x1f388165c95ecb8db874c0b4030f899aa7ccd6c50e623525ba25d64597f8f6dd',
      transactionIndex: '197',
      from: '0x1ec4de886d40d487366cde7664767db1df6a02e7',
      to: '0x1db3439a222c519ab44bb1144fc28167b4fa6ee6',
      value: '0',
      gas: '22900',
      gasPrice: '96000000000',
      isError: '0',
      txreceipt_status: '1',
      input: '0x68747470733a2f2f70756c73656c6561642e78797a0a68747470733a2f2f70756c7365586c6561642e636f6d0a68747470733a2f2f6769746c61622e636f6d2f70756c7365636861696e636f6d0a68747470733a2f2f70756c7365582e636f6d',
      contractAddress: '',
      cumulativeGasUsed: '11304848',
      gasUsed: '22536',
      confirmations: '252401'
    }
 */
async function getTransactionData(address) {
  const URL = `https://api.etherscan.io/api?module=${mod}&action=${action}&address=${address}&startblock=${startblock}&endblock=${endblock}&page=1&offset=${offset}&sort=${sort}&apikey=${process.env.ETHERSCAN_API_KEY}`;
  try {
    const response = await fetch(URL, { method: "GET" });
    const data = await response.json();
    return data.result;
  } catch (e) {
    console.log(e);
  }
}

export default getTransactionData;
