import Arweave from 'arweave';
import Transaction from 'arweave/node/lib/transaction';
import { AxiosResponse } from 'axios';
import ITestWeave from '../interfaces/interface.TestWeave';
import TestWeaveRequest from './class.testweave-request';

export default class TestWeave implements ITestWeave {
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
  ): TestWeave {
    // overwrite the arweave.api.request method, so that it can include the requested headers
    // get the api config
    if (arweaveInstance && Object.keys(arweaveInstance).length) {
      const apiConfig = arweaveInstance.api.config;
      const testWeaveRequest = TestWeaveRequest.init(apiConfig);
      arweaveInstance.api.request = () => testWeaveRequest.getRequest();
    }
    return new TestWeave(arweaveInstance);
  }
  /**
   * Returns the arweave instance on the top of which the TestWeave instance was created.
   * @returns the arweave instance on the top of which the TestWeave instance was created.
   * @throws Error if the arweave instance was not instanced
   */
  getArweaveInstance(): Arweave {
    if (
      this.arweaveInstance &&
      this.arweaveInstance instanceof Arweave) {
      return this.arweaveInstance;
    }
    throw new Error('You must init TestWeave with a non null arweave instance before calling getArweaveInstance()');
  }

  /**
   * Mines a new block in the TestWeave Network
   * @returns the axios response created around the call to the /mine endpoint
  */
  async mine(): Promise<AxiosResponse> {
    const result = await this.getArweaveInstance().api.post(`mine`, '');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(result);
      }, 6000);
    });
  }
}
