import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { AxiosRequestConfig } from 'axios';
import ITestWeave from '../interfaces/interface.TestWeave';
import TestWeaveRequest from './class.testweave-request';
import TestWeaveTransactionsManager from './class.testweave-transactions-manager';
import TestWeaveUtils from './class.testweave-utils';

class TestWeave implements ITestWeave {
  private _arweave: Arweave;
  private _utils: TestWeaveUtils;
  private _transactionManager: TestWeaveTransactionsManager;
  private _rootJWK: JWKInterface;

  /**
   * The constructor of the class. Should never be called directly, since this
   * is a static class.
   * @param arweaveInstance an arweave instance.
   */
  private constructor(arweaveInstance: Arweave) {
    // init the transaction TransactionManager
    this._transactionManager = TestWeaveTransactionsManager.init(arweaveInstance);
    // get the api config
    const apiConfig = arweaveInstance.api.config;
    const testWeaveRequest = TestWeaveRequest.init(apiConfig);
    // overwrite the arweave.api.request method, so that it can include the requested headers
    arweaveInstance.api.request = () => testWeaveRequest.getRequest();
    // overwrite the arweave.api.request method, so that it can save requests bye means of the transaction manager
    arweaveInstance.api.post = (
      endpoint: string,
      // eslint-disable-next-line @typescript-eslint/ban-types
      body: Buffer | string | object,
      config?: AxiosRequestConfig,
    ) => this._transactionManager.getPost(endpoint, body, config);
    // init the arweave instance
    this._arweave = arweaveInstance;
    // init the utils
    this._utils = TestWeaveUtils.init(this._arweave);
    // sets the root JWL
    this._rootJWK = this._utils.getRootJWK();
  }
  /**
   * Returns a TestWeave instance
   * @param arweaveInstance the arweave instance on the top of with the TestWeave must be created. The instance should be created with arweave.init().
   * @returns TestWeave a TestWeave instance.
  */
  public static init(
    arweaveInstance: Arweave,
  ): TestWeave {
    try {
      // create the testweave instace
      const testWeaveInstance = new TestWeave(arweaveInstance);
      // return the testweave instance
      return testWeaveInstance;
    } catch (err) {
      console.log(err);
      throw new Error('o cazzo');
    }
  }

  /**
   * Returns the root JWK, its address should be MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y and its initial balance is 100000000000000000
   * @returns JWKInterface a JSON containing the test weave root wallet
   */
  public get rootJWK(): JWKInterface {
    return this._rootJWK;
  }

  /**
   * Drops the given winston from the root JWK to the given address.
   * @param targetAddress the address to which drop the winston
   * @param winstonBalance the amount of winston that must be dropped
   */
  public async drop(targetAddress: string, winstonBalance: string): Promise<void> {
    const result = await this._utils.dropFromRootAddress(targetAddress, winstonBalance, this._transactionManager);
    return result;
  }

  /**
   * Mines a new block in the TestWeave Network
   * @returns the axios response created around the call to the /mine endpoint
  */
  public async mine(): Promise<Array<string>> {
    const result = await this._utils.mine(this._transactionManager);
    return result;
  }
}

export default TestWeave;
