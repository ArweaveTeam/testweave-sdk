import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import ITestWeave from '../interfaces/interface.testweave';
declare class TestWeave implements ITestWeave {
    private _arweave;
    private _utils;
    private _transactionManager;
    private _rootJWK;
    /**
     * The constructor of the class. Should never be called directly, since this
     * is a static class.
     * @param arweaveInstance an arweave instance.
     */
    private constructor();
    /**
     * Returns a TestWeave instance
     * @param arweaveInstance the arweave instance on the top of with the TestWeave must be created. The instance should be created with arweave.init().
     * @returns TestWeave a TestWeave instance.
    */
    static init(arweaveInstance: Arweave): Promise<TestWeave>;
    /**
     * Returns the root JWK, its address should be MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y and its initial balance is 100000000000000000
     * @returns JWKInterface a JSON containing the test weave root wallet
     */
    get rootJWK(): JWKInterface;
    /**
     * Drops the given winston from the root JWK to the given address.
     * @param targetAddress the address to which drop the winston
     * @param winstonBalance the amount of winston that must be dropped
     */
    drop(targetAddress: string, winstonBalance: string): Promise<string>;
    /**
     * Mines a new block in the TestWeave Network
     * @returns the axios response created around the call to the /mine endpoint
    */
    mine(): Promise<Array<string>>;
}
export default TestWeave;
