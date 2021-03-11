import { AxiosRequestConfig, AxiosResponse } from 'axios';

export default interface ITestWeaveTransactionsManager {
  resolvePool(): Promise<Array<string>>;
  getPost(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    body: Buffer | string | object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse>;
  getGet(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse>;
}
