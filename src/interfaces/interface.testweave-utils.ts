import { JWKInterface } from 'arweave/node/lib/wallet';
import TestWeaveTransactionsManager from '../classes/class.testweave-transactions-manager';

export default interface ITestWeaveUtils {
  getRootJWK(): JWKInterface;
  dropFromRootAddress(targetAddress: string, winstonBalance: string, transactionsManager: TestWeaveTransactionsManager): Promise<string>;
  mine(transactionsManager: TestWeaveTransactionsManager): Promise<Array<string>>;
}
