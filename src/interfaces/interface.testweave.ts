import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
export default interface ITestWeave {
  readonly arweave: Arweave;
  readonly rootJWK: JWKInterface;
}
