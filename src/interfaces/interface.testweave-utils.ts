import { JWKInterface } from 'arweave/node/lib/wallet';

export default interface ITestWeaveUtils {
  getRootJWK(): JWKInterface;
  dropFromRootAddress(targetAddress: string, winstonBalance: string): Promise<void>;
}
