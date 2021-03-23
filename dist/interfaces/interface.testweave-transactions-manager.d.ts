/// <reference types="node" />
import { AxiosRequestConfig, AxiosResponse } from 'axios';
export default interface ITestWeaveTransactionsManager {
    resolvePool(): Promise<Array<string>>;
    getPost(endpoint: string, body: Buffer | string | object, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    getGet(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
}
