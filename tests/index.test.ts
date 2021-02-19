import TestWeave from '../src/index';
import arweave from './_init_arweave';

import { expect } from 'chai';
import rootJWK from './fixtures/arweave-keyfile-MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y.json'


describe('testing TestWeave', function (): void {
  it('should correctly init a TestWeave instance', () : void => {
    const testWeave = TestWeave.init(arweave);

    expect(testWeave.getArweaveInstance().api).to.not.be.null;
    expect(testWeave.getArweaveInstance().wallets).to.not.be.null;
    expect(testWeave.getArweaveInstance().transactions).to.not.be.null;
    expect(testWeave.getArweaveInstance().silo).to.not.be.null;
    expect(testWeave.getArweaveInstance().network).to.not.be.null;
    expect(testWeave.getArweaveInstance().ar).to.not.be.null;
  });
  it('getArweaveInstance() should throw an error when TestWeave was init with an empty arweave instance', (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const testWeave = TestWeave.init({});
    expect(() => testWeave.getArweaveInstance()).to.throw();
  });

  it('Random tests', async (): Promise<void> => {
    this.timeout(10000);
    const testWeave = TestWeave.init(arweave);
    // generate a wallets
    const jkw = await arweave.wallets.generate();
    const generatedAddr = await arweave.wallets.getAddress(jkw);

    const transaction = await arweave.createTransaction({
      target: generatedAddr,
      quantity: await arweave.ar.arToWinston('1')
    }, rootJWK);

    await arweave.transactions.sign(transaction, rootJWK)
    await arweave.transactions.post(transaction);

    console.log(`Status: ${(await arweave.transactions.getStatus(transaction.id)).status} - ${transaction.id} not yet mined`);
    await testWeave.mine();
    await testWeave.mine();
    console.log(`Status: ${(await arweave.transactions.getStatus(transaction.id)).status} - ${transaction.id} not yet mined`);
    // const test = await TestWeave.getArweaveInstance().transactions.getStatus('7T4LA4BDpq-5Z4_S7efiXfo1Vze6eptx7nU0MQxP0TA');
    // console.log(test);
  });
});


