import TestWeave from '../src/index';
import arweave from './_init_arweave';

import { expect } from 'chai';

describe('testing TestWeave data transactions', function (): void {
  this.timeout(10000);
  it('This should correctly create a test data transaction', async (): Promise<void> => {
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

    const dataTransaction = await arweave.createTransaction({
      data,
    }, testWeave.rootJWK);

    await arweave.transactions.sign(dataTransaction, testWeave.rootJWK)
    const statusBeforePost = await arweave.transactions.getStatus(dataTransaction.id)
    console.log(statusBeforePost);
    await arweave.transactions.post(dataTransaction);

    console.log(dataTransaction.id);
    const statusBefore = await arweave.transactions.getStatus(dataTransaction.id)
    console.log(statusBefore);
    await testWeave.mine();
    const statusAfter = await arweave.transactions.getStatus(dataTransaction.id)
    console.log(statusAfter);

  });
});

