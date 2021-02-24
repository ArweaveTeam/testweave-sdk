import Arweave from 'arweave';
import Transaction from 'arweave/node/lib/transaction';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { AxiosResponse } from 'axios';
import rootJWK from '../assets/arweave-keyfile-MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y.json';
import ITestWeaveUtils from '../interfaces/interface.testweave-utils';

export default class TestWeaveUtils implements ITestWeaveUtils {
  private _arweave: Arweave;
  /**
   * The constructor of the class. Should never be called directly, since this
   * is a static class.
   * @param arweaveInstance an arweave instance.
   */
  private constructor(arweaveInstance: Arweave) {
    this._arweave = arweaveInstance;
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

  /**
   * Returns the JWK of the root address
   * @returns JWKInterface the JWK of the root address
   */
  public getRootJWK(): JWKInterface {
    return rootJWK;
  }

  /**
   * Drops the given winston from the root JWK to the given address.
   * @param targetAddress the address to which drop the winston
   * @param winstonBalance the amount of winston that must be dropped
   */
  public async dropFromRootAddress(targetAddress:string, winstonBalance: string): Promise<void> {
    const transaction = await this._arweave.createTransaction({
      target: targetAddress,
      quantity: winstonBalance
    }, this.getRootJWK());
    await this._arweave.transactions.sign(transaction, rootJWK)
    await this._arweave.transactions.post(transaction);
    await this.mine();
  }

  /**
   * Mines a new block in the TestWeave Network
   * @returns the axios response created around the call to the /mine endpoint
  */
  public async mine(): Promise<AxiosResponse> {
    await this.delay(1000);
    // check if there are transactions in the pool
    // const transactionsInThePool = await this._arweave.api.get('tx/ready_for_mining');
    // console.log(transactionsInThePool.data);
    const result = await this._arweave.api.post('mine', '');
    await this.delay(1000);
    return result;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(res => setTimeout(res, ms));
  }
}
