import { JWKInterface } from 'arweave/node/lib/wallet';
export default interface ITestWeave {
  readonly rootJWK: JWKInterface;
  drop(targetAddress: string, winstonBalance: string): Promise<string>;
  mine(): Promise<Array<string>>;
}
