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
    // const rootBalance = await arweave.wallets.getBalance(rootAddress);

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

