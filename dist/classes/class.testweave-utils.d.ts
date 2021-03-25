import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import ITestWeaveUtils from '../interfaces/interface.testweave-utils';
import TestWeaveTransactionsManager from './class.testweave-transactions-manager';
export default class TestWeaveUtils implements ITestWeaveUtils {
    private _arweave;
    /**
     * The constructor of the class. Should never be called directly, since this
     * is a static class.
     * @param arweaveInstance an arweave instance.
     */
    private constructor();
    /**
     * Returns a TestWeave instance
     * @param arweaveInstance the arweave instance on the top of with the TestWeave must be created. The instance should be created with arweave.init().
     * @returns a TestWeave instance.
    */
    static init(arweaveInstance: Arweave): TestWeaveUtils;
    /**
     * Returns the JWK of the root address
     * @returns JWKInterface the JWK of the root address
     */
    getRootJWK(): JWKInterface;
    /**
     * Drops the given winston from the root JWK to the given address.
     * @param targetAddress the address to which drop the winston
     * @param winstonBalance the amount of winston that must be dropped
     * @param transactionsPool the array containing the transactions pool
     */
    dropFromRootAddress(targetAddress: string, winstonBalance: string, transactionsManager: TestWeaveTransactionsManager): Promise<string>;
    /**
     * Mines a new block in the TestWeave Network
     * @returns the axios response created around the call to the /mine endpoint
    */
    mine(transactionManager: TestWeaveTransactionsManager): Promise<Array<string>>;
    /**
     * Utility function to stop execution for a specific amount of time.
     * @param ms the amount of ms for which the execution must be stopped
     */
    delay(ms: number): Promise<void>;
}
