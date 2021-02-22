import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import rootJWK from '../assets/arweave-keyfile-MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y.json';
import ITestWeaveUtils from '../interfaces/interface.testweave-utils';

export default class TestWeaveUtils implements ITestWeaveUtils {
  private arweaveInstance: Arweave;
  /**
   * The constructor of the class. Should never be called directly, since this
   * is a static class.
   * @param arweaveInstance an arweave instance.
   */
  private constructor(arweaveInstance: Arweave) {
    this.arweaveInstance = arweaveInstance;
  }
  /**
   * Returns a TestWeave instance
   * @param arweaveInstance the arweave instance on the top of with the TestWeave must be created. The instance should be created with arweave.init().
   * @returns a TestWeave instance.
  */
  public static init(
    arweaveInstance: Arweave,
  ): TestWeaveUtils {
    return new TestWeaveUtils(arweaveInstance);
  }

  public getRootJWK(): JWKInterface {
    return rootJWK;
  }

  public dropFromRootAddress(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 6000);
    });
  }

}
