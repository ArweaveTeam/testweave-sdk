import TestWeave from '../dist/index';
import Arweave from 'arweave';

import { createContract, readContract, interactWrite, interactWriteDryRun } from 'smartweave';

import fs from 'fs';

// import the sample contract init state
import contractInitState from './fixtures/token-pst-contract.json';
// load the contract as a string
const contractSource = fs.readFileSync('tests/fixtures/token-pst-contract.js').toString();
const data = 'headsa addsada';

// test net
const arweave = Arweave.init({});



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

  const c = await createContract(arweave, testWeave.rootJWK, contractSource, JSON.stringify(contractInitState));
  const d = await testWeave.mine();


  console.log('Contract creations TXIDs:')
  console.log(d);


  const beforeTransaction = await readContract(arweave, c);
  console.log(`Status before any interact write: ${JSON.stringify(beforeTransaction)}`);

  // try to interact with the contract
  const jkw = await arweave.wallets.generate();
  const generatedAddr = await arweave.wallets.getAddress(jkw);

  for (let i = 0; i < 1; i++) {
    console.log(`Interaction number ${i}`);
    const iwt = await interactWrite(arweave, testWeave.rootJWK, c, {
      function: 'transfer',
      target: generatedAddr,
      qty:1
    }, [], generatedAddr, '1')

    const a = await arweave.transactions.getStatus(iwt)
    console.log(a);
    try {
      await testWeave.mine();
    } catch (e) {
      console.log(e);
    }
    const b = await arweave.transactions.getStatus(iwt)
    console.log(b);
    /* for (let y = 0; y < 101; y++) {
      const afterTransaction = await readContract(arweave, c);
      console.log(`${y}: ${JSON.stringify(afterTransaction)}`);
    }*/
    /* console.log(`Interact write transaction n ${i}: ${JSON.stringify(iwt)}`);
    await testWeave.mine();

    const generatedAddressBalance = await arweave.wallets.getBalance(generatedAddr)
    console.log(`AR balance after interact write n ${i}: ${generatedAddressBalance}`);

    const afterTransaction = await readContract(arweave, c);
    console.log(`After interact write n ${i}: ${JSON.stringify(afterTransaction)}`); */
  }

  // make an interact write by hand
  // create the transaction
  /* const transaction = await arweave.createTransaction({
    target: generatedAddr,
    quantity: '12212121',
  }, testWeave.rootJWK);
  // add tags to the transaction in order to make it a contract call
  transaction.addTag('App-Name', 'SmartWeaveAction');
  transaction.addTag('App-Version', '0.3.0');
  transaction.addTag('Contract', c);
  transaction.addTag('Input', JSON.stringify({
    function: 'transfer',
    target: generatedAddr,
    qty:101
  }));
  await arweave.transactions.sign(transaction, testWeave.rootJWK);
  await arweave.transactions.post(transaction);
  await testWeave.mine();

  const afterManualTransaction = await readContract(arweave, c);
  console.log(`After manual transaction write: ${JSON.stringify(afterManualTransaction)}`);

  const generatedAddressBalances = await arweave.wallets.getBalance(generatedAddr)
  console.log(generatedAddressBalances); */
};

const testContractInteraction = async (contractID: string) => {
  const testWeave = await TestWeave.init(arweave);

  const testRead = await readContract(arweave, contractID);
  console.log(`before interact write: ${JSON.stringify(testRead)}`);

  const jkw = await arweave.wallets.generate();
  const generatedAddr = await arweave.wallets.getAddress(jkw);

  await interactWrite(arweave, testWeave.rootJWK, contractID, {
    function: 'transfer',
    target: generatedAddr,
    qty: 42
  }, [], generatedAddr, '1')

  await testWeave.mine();

  const afterTransaction = await readContract(arweave, contractID);
  console.log(`After interact write: ${JSON.stringify(afterTransaction)}`);



};

testContractCreation();
// testContractInteraction('bzXGTk5QtMH5MQ7t8OCofafVy-y3d82CLSOzn-aus6E');
// anuB7d7yEh4E2y_Uo0dYasieRVY8z6_3myOl7n7w3PU


// Nz-grrERx1-sWKNHhgipwPC8g0fRg7I20-FDErIzti8
// r8fqwSs4hptJwP9cMiXXqBcIbV2lIn81HCJGLiC1vWc
// iw transaction 9UmmsDY5-fnc6As2PlMXgPA2t0A92arPkaUX1nQyMTU

// testTenTransactions();
