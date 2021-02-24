import { JWKInterface } from 'arweave/node/lib/wallet';
import { AxiosResponse } from 'axios';

export default interface ITestWeaveUtils {
  getRootJWK(): JWKInterface;
  dropFromRootAddress(targetAddress: string, winstonBalance: string): Promise<void>;
  mine(): Promise<AxiosResponse>;
}
