import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { AxiosResponse } from 'axios';
import ITestWeave from '../interfaces/interface.TestWeave';
import TestWeaveRequest from './class.testweave-request';
import TestWeaveUtils from './class.testweave-utils';

export default class TestWeave implements ITestWeave {
  private _arweave: Arweave;
  private _utils: TestWeaveUtils;
  private _rootJWK: JWKInterface;

  /**
   * The constructor of the class. Should never be called directly, since this
   * is a static class.
   * @param arweaveInstance an arweave instance.
   */
  private constructor(arweaveInstance: Arweave) {
    // init the arweave instance
    this._arweave = arweaveInstance;
    // init the utils
    this._utils = TestWeaveUtils.init(this.arweave);
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
    // overwrite the arweave.api.request method, so that it can include the requested headers
    // get the api config
    if (arweaveInstance && Object.keys(arweaveInstance).length) {
      const apiConfig = arweaveInstance.api.config;
      const testWeaveRequest = TestWeaveRequest.init(apiConfig);
      arweaveInstance.api.request = () => testWeaveRequest.getRequest();
    }
    // return the testweave instance
    return new TestWeave(arweaveInstance);
  }
  /**
   * Returns the arweave instance on the top of which the TestWeave instance was created.
   * @returns Arweave the arweave instance on the top of which the TestWeave instance was created.
   * @throws Error if the arweave instance was not instanced
   */
  public get arweave(): Arweave {
    if (
      this._arweave &&
      this._arweave instanceof Arweave) {
      return this._arweave;
    }
    throw new Error('You must init TestWeave with a non null arweave instance before calling getArweaveInstance()');
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
    const result = await this._utils.dropFromRootAddress(targetAddress, winstonBalance);
    return result;
  }

  /**
   * Mines a new block in the TestWeave Network
   * @returns the axios response created around the call to the /mine endpoint
  */
  public async mine(): Promise<AxiosResponse> {
    const result = await this._utils.mine();
    return result;
  }

}
