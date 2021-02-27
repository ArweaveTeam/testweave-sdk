import TestWeave from '../dist/index';
import Arweave from 'arweave';

// test net
const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});


const testWeave = TestWeave.init(arweave);

const data = `
<html>
  <head>
    <meta charset="UTF-8">
    <title>Info about arweave</title>
  </head>
  <body>
    Arweave is the best web3-related thing out there!!!
  </body>
</html>`;

const test = async () => {
  const txs = [];
  for (let i = 0; i < 100; i++) {
    const dataTransaction = await arweave.createTransaction({
      data,
    }, testWeave.rootJWK);
    await arweave.transactions.sign(dataTransaction, testWeave.rootJWK);
    await arweave.transactions.post(dataTransaction);
    console.log(dataTransaction.id);
    txs.push(dataTransaction.id);
  }
  testWeave.mine().then(() => {
    txs.forEach(async (e) => {
      console.log(e);
      const s = await arweave.transactions.getStatus(e);
      console.log(s);
    })
  });
}

test();
