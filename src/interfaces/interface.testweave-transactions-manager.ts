import { AxiosRequestConfig, AxiosResponse } from 'axios';

export default interface ITestWeaveTransactionsManager {
  readonly transactionsPool: Array<string>;
  resolvePool(minedTransactions: Array<string>): Promise<Array<string>>;
  getPost(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    body: Buffer | string | object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse>;
}
