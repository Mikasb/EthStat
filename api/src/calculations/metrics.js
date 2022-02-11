import getEthPrice from "../etherscan/ethPrice.js";
import getTransactionData from "../etherscan/transactions.js";
import { defiProtocols } from "./topDefiProtocols.js";
const weiToEthRatio = 0.000000000000000001; // Math.pow(10, -18);
let MAX_TRANSACTION_FEE = 0;
let NUMBER_OF_TRANSACTIONS = 0;
let AVG_TRANSACTION_FEE = 0;
let SUM_TRANSACTION_FEE = 0;
let TOP_TEN_EXPENSIVE_TRANS = [];
let TRANSACTION_DATES = [];

async function calculate(address) {
  // Get current ETH price in usd
  const ethPrice = await getEthPrice();

  //Get transaction data
  const transactions = await getTransactionData(address);

  //Reset defi protocol assigned data
  for (const index in defiProtocols) {
    defiProtocols[index].sum = 0;
  }

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
    // Add transactions identifying defi protocol usage
    addToDefiProtocols(transactionFee, transaction, ethPrice);

    TRANSACTION_DATES.push(new Date(transaction.timeStamp * 1000));

    // Increment the total sum of transactions
    SUM_TRANSACTION_FEE += transactionFee;
    // Increment total transaction number
    NUMBER_OF_TRANSACTIONS++;
  });
  // Convert transaction dates to object for json
  let transactionDates = convertTransactionDateFormat();
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
    defiMap: defiProtocols,
    transDates: transactionDates,
  };
  //Reset state
  NUMBER_OF_TRANSACTIONS = 0;
  TRANSACTION_DATES = [];
  return metrics;
}

function convertTransactionDateFormat() {
  let result = {};
  for (let index in TRANSACTION_DATES) {
    let dateProperty =
      TRANSACTION_DATES[index].getFullYear() +
      "-" +
      (TRANSACTION_DATES[index].getMonth() + 1);
    if (result[dateProperty] == undefined) {
      result[dateProperty] = 1;
    } else {
      result[dateProperty]++;
    }
  }
  return result;
}

function addToDefiProtocols(transactionFee, transaction, ethPrice) {
  if (defiProtocols[transaction.to] == undefined) {
    defiProtocols["Other"].sum =
      defiProtocols["Other"].sum + transactionFee * weiToEthRatio * ethPrice;
  } else {
    defiProtocols[transaction.to].sum =
      defiProtocols[transaction.to].sum +
      transactionFee * weiToEthRatio * ethPrice;
  }
}
export default calculate;
