import TestWeave from '../dist/index';
import Arweave from 'arweave';

import { createContract, readContract } from 'smartweave';

import fs from 'fs';

// import the sample contract init state
import contractInitState from './fixtures/token-pst-contract.json';
// load the contract as a string
const contractSource = fs.readFileSync('tests/fixtures/token-pst-contract.js').toString();
const data = 'headsa addsada';

// test net
const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});



const testTenTransactions = async () => {
  const testWeave = await TestWeave.init(arweave);
  const txs:Array<string> = [];
  for (let i = 0; i < 10; i++) {
    const dataTransaction = await arweave.createTransaction({
      data,
    }, testWeave.rootJWK);
    await arweave.transactions.sign(dataTransaction, testWeave.rootJWK);
    await arweave.transactions.post(dataTransaction);
    txs.push(dataTransaction.id);
  }
  const res = await testWeave.mine();
  for (const txID of txs) {

    const s = `TX: ${txID}: ${(await arweave.transactions.getStatus(txID)).status}`;
    console.log(s);
  }
  console.log(res);
}

const testContractCreation = async () => {
  const testWeave = await TestWeave.init(arweave);
  console.log(contractInitState);
  console.log(contractSource);

  // creat the contract
  try {
    const c = await createContract(arweave, testWeave.rootJWK, contractSource, JSON.stringify(contractInitState));
    console.log(c);
    const d = await testWeave.mine();
    console.log(d);



    const testRead = readContract(arweave, c).then(console.log);
  } catch (err) {
    console.log(err);
  }

}

testContractCreation();

// testTenTransactions();
