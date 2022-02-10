import getEthPrice from "../etherscan/ethPrice.js";
import getTransactionData from "../etherscan/transactions.js";
import { defiProtocolMap } from "./topDefiProtocols.js";
const weiToEthRatio = 0.000000000000000001; // Math.pow(10, -18);
let MAX_TRANSACTION_FEE = 0;
let NUMBER_OF_TRANSACTIONS = 0;
let AVG_TRANSACTION_FEE = 0;
let SUM_TRANSACTION_FEE = 0;
let TOP_TEN_EXPENSIVE_TRANS = [];

async function calculate() {
  // Get current ETH price in usd
  const ethPrice = await getEthPrice();

  //Get transaction data
  const transactions = await getTransactionData(
    "0x82f9dcf1812b990b4596e64e0c10a43e8d9ecc64"
  );

  transactions.forEach((transaction) => {
    let transactionFee = transaction.gasUsed * transaction.gasPrice;
    // Get max transaction fee
    MAX_TRANSACTION_FEE =
      MAX_TRANSACTION_FEE < transactionFee
        ? transactionFee
        : MAX_TRANSACTION_FEE;
    // Add all transactions for top 10
    TOP_TEN_EXPENSIVE_TRANS.push({
      fee: transactionFee,
      txHash: transaction.hash,
    });
    addToDefiProtocols(transactionFee, transaction, ethPrice);
    // Increment the total sum of transactions
    SUM_TRANSACTION_FEE += transactionFee;
    // Increment total transaction number
    NUMBER_OF_TRANSACTIONS++;
  });
  // Get average
  AVG_TRANSACTION_FEE = SUM_TRANSACTION_FEE / NUMBER_OF_TRANSACTIONS;
  // Extract top 10 transactions
  TOP_TEN_EXPENSIVE_TRANS = TOP_TEN_EXPENSIVE_TRANS.sort(
    ({ fee: a }, { fee: b }) => b - a
  ).slice(0, 10);

  // Convert everything to ETH
  TOP_TEN_EXPENSIVE_TRANS = TOP_TEN_EXPENSIVE_TRANS.map(({ fee, txHash }) => ({
    fee: (fee * weiToEthRatio * ethPrice).toFixed(2),
    txHash: txHash,
  }));

  MAX_TRANSACTION_FEE *= weiToEthRatio * ethPrice;
  AVG_TRANSACTION_FEE *= weiToEthRatio * ethPrice;
  SUM_TRANSACTION_FEE *= weiToEthRatio * ethPrice;

  // return metrics object with data
  const metrics = {
    maxFee: MAX_TRANSACTION_FEE.toFixed(2),
    avgFee: AVG_TRANSACTION_FEE.toFixed(2),
    feeSum: SUM_TRANSACTION_FEE.toFixed(2),
    topTen: TOP_TEN_EXPENSIVE_TRANS,
    transNum: NUMBER_OF_TRANSACTIONS,
    defiMap: defiProtocolMap,
  };
  NUMBER_OF_TRANSACTIONS = 0;
  return metrics;
}

function addToDefiProtocols(transactionFee, transaction, ethPrice) {
  if (defiProtocolMap.get(transaction.to) == undefined) {
    defiProtocolMap.set(
      "OTHER",
      defiProtocolMap.get("OTHER") + transactionFee * weiToEthRatio * ethPrice
    );
  } else {
    defiProtocolMap.set(
      transaction.to,
      defiProtocolMap.get(transaction.to) +
        transactionFee * weiToEthRatio * ethPrice
    );
  }
}
export default calculate;
