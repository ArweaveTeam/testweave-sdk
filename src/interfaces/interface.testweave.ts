import { JWKInterface } from 'arweave/node/lib/wallet';
export default interface ITestWeave {
  readonly rootJWK: JWKInterface;
  drop(targetAddress: string, winstoBalance: string): Promise<void>;
  mine(): Promise<Array<string>>;
}
