import TestWeave from '../src/index';
import arweave from './_init_arweave';

import { expect } from 'chai';

describe('testing TestWeave', function (): void {
  this.timeout(10000);
  it('should correctly init a TestWeave instance', () : void => {
    const testWeave = TestWeave.init(arweave);
    expect(testWeave.arweave.api).to.not.be.null;
    expect(testWeave.arweave.wallets).to.not.be.null;
    expect(testWeave.arweave.transactions).to.not.be.null;
    expect(testWeave.arweave.silo).to.not.be.null;
    expect(testWeave.arweave.network).to.not.be.null;
    expect(testWeave.arweave.ar).to.not.be.null;
  });

  it('This should correctly retrieve the testweave root JWK and its address must be MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y', async (): Promise<void> => {
    const testWeave = TestWeave.init(arweave);
    const rootAddress = await arweave.wallets.getAddress(testWeave.rootJWK);
    const rootBalance = await arweave.wallets.getBalance(rootAddress);

    console.log(await arweave.wallets.getBalance('ULaxboFQDf3jDEyHcv5q3UxTjDvp2GKVfyRxgVPm4Jc'));

    // the address should be equal to MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y
    expect(rootAddress).equal('MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y');
    // the balance of the root wallet should be equal to 10000000000000000000
    expect(rootBalance).equal('10000000000000000000');

    const jkw = await arweave.wallets.generate();
    const generatedAddr = await arweave.wallets.getAddress(jkw);
    console.log(generatedAddr);
    console.log(await arweave.wallets.getBalance('B057ekCSC6-PNIdOK1_JhJawqylWxU-DiU_IUYKW7ns'));
    await testWeave.drop(generatedAddr, '10000');
    console.log(await arweave.wallets.getBalance('B057ekCSC6-PNIdOK1_JhJawqylWxU-DiU_IUYKW7ns'));

    // get the root wallet balance

    // generate a wallets
    /*const jkw = await arweave.wallets.generate();
    const generatedAddr = await arweave.wallets.getAddress(jkw);

    const transaction = await arweave.createTransaction({
      target: generatedAddr,
      quantity: await arweave.ar.arToWinston('1')
    }, rootJWK);

    await arweave.transactions.sign(transaction, rootJWK)
    await arweave.transactions.post(transaction);
    // await testWeave.mine();

    console.log(`Status: ${(await arweave.transactions.getStatus(transaction.id)).status} - ${transaction.id} not found`);
    await testWeave.mine();
    console.log(`Status: ${(await arweave.transactions.getStatus(transaction.id)).status} - ${transaction.id} pending`);
    // await testWeave.mine();
    console.log(`Status: ${(await arweave.transactions.getStatus(transaction.id)).status} - ${transaction.id} confirmed`);
    // const test = await TestWeave.getArweaveInstance().transactions.getStatus('7T4LA4BDpq-5Z4_S7efiXfo1Vze6eptx7nU0MQxP0TA');
    // console.log(test); */
  });
});

