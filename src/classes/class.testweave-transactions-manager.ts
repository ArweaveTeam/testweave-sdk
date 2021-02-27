import Arweave from 'arweave';
import Transaction from 'arweave/node/lib/transaction';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import ITestWeaveTransactionsManager from '../interfaces/interface.testweave-transactions-manager';
import TestWeaveUtils from './class.testweave-utils';

export default class TestWeaveTransactionsManager implements ITestWeaveTransactionsManager {
  private _arweave: Arweave;
  private _transactionsPool: Array<string>;
  /**
   * The constructor of the class. Should never be called directly, since this
   * is a static class.
   * @param arweaveInstance an arweave instance.
   */
  private constructor(arweaveInstance: Arweave) {
    this._arweave = arweaveInstance;
    this._transactionsPool = [];
  }

  /**
   * Private constructor that creates the TransactionManager Instance
   * @param arweaveInstance the Arweave instance
   */
  public static init(arweaveInstance: Arweave): TestWeaveTransactionsManager {
    return new TestWeaveTransactionsManager(arweaveInstance);
  }

  /**
   * Returns the transaction pool
  */
  public get transactionsPool(): Array<string> {
    return this._transactionsPool;
  }

  /**
   * Resolve the transactions pool
   * @param minedTransactions
   */
  public async resolvePool(minedTransactions: Array<string>): Promise<Array<string>> {
    if (this._transactionsPool.length) {
      const readyForMiningTxs: Array<string> = (await this._arweave.api.get('tx/ready_for_mining')).data;
      const lastTx: string = this._transactionsPool[this._transactionsPool.length - 1];

      if (readyForMiningTxs.includes(lastTx)) {
        await this._arweave.api.post('mine', '');
        await TestWeaveUtils.init(this._arweave).delay(1001);
        minedTransactions.push(this._transactionsPool.pop() as string);
        return minedTransactions;
      }
      const results = await this.resolvePool(minedTransactions);
      return results;
    }
    return minedTransactions;
  }

  /**
   * This is a post method that is intended to replace the arwwave.api post one.
   * It does the same things of the arweave.api one, but it pull the internal transactions pool too.
   * @param endpoint the endpoint that must be called
   * @param body the Body of the post request
   * @param config the optional configurations that must be sent along the post request
   */
  public async getPost(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    body: Buffer | string | object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    try {
      const response = await this._arweave.api.request().post(endpoint, body, config);
      if (endpoint === 'tx') {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const { id } = body as Transaction;
        this._transactionsPool.push(id);
      }
      return response;
    } catch (error) {
      if (error.response && error.response.status) {
        return error.response;
      }

      throw error;
    }
  }
}
