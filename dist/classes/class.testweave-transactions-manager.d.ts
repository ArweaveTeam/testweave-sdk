/// <reference types="node" />
import Arweave from 'arweave';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import ITestWeaveTransactionsManager from '../interfaces/interface.testweave-transactions-manager';
export default class TestWeaveTransactionsManager implements ITestWeaveTransactionsManager {
    private _arweave;
    /**
     * The constructor of the class. Should never be called directly, since this
     * is a static class.
     * @param arweaveInstance an arweave instance.
     */
    private constructor();
    /**
     * Private constructor that creates the TransactionManager Instance
     * @param arweaveInstance the Arweave instance
     */
    static init(arweaveInstance: Arweave): Promise<TestWeaveTransactionsManager>;
    /**
     * Resolve the transactions pool
     * @param minedTransactions
     */
    resolvePool(): Promise<Array<string>>;
    /**
     * This is a get method that is intended to replace the arwwave.api get one.
     * It does the same things of the arweave.api one, but it pull the internal rewrites the baseUrl if needed
     * @param endpoint the endpoint that must be called
     * @param config the optional configurations that must be sent along the post request
     */
    getGet(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    /**
     * This is a post method that is intended to replace the arwwave.api post one.
     * It does the same things of the arweave.api one, but it pull the internal transactions pool too.
     * @param endpoint the endpoint that must be called
     * @param body the Body of the post request
     * @param config the optional configurations that must be sent along the post request
     */
    getPost(endpoint: string, body: Buffer | string | object, config?: AxiosRequestConfig): Promise<AxiosResponse>;
}
