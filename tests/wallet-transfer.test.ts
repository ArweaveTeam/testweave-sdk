import TestWeave from '../src/index';
import arweave from './_init_arweave';

import { expect } from 'chai';

describe('testing TestWeave wallet transfers transactions', function (): void {
  this.timeout(20000);
  it('should correctly init a TestWeave instance', () : void => {
    TestWeave.init(arweave);
    expect(arweave.api).to.not.be.null;
    expect(arweave.wallets).to.not.be.null;
    expect(arweave.transactions).to.not.be.null;
    expect(arweave.silo).to.not.be.null;
    expect(arweave.network).to.not.be.null;
    expect(arweave.ar).to.not.be.null;
  });

  it('This should correctly retrieve the testweave root JWK and its address must be MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y', async (): Promise<void> => {
    const testWeave = await TestWeave.init(arweave);
    const rootAddress = await arweave.wallets.getAddress(testWeave.rootJWK);

    const jkw = await arweave.wallets.generate();
    const generatedAddr = await arweave.wallets.getAddress(jkw);
    await testWeave.drop(generatedAddr, '10000');
    const generatedAddressBalance = await arweave.wallets.getBalance(generatedAddr)

    // the address should be equal to MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y
    expect(rootAddress).equal('MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y');
    // the balance of the generated wallet should be equal to generatedAddressBalance
    expect(generatedAddressBalance).equal('10000');
  });
});

