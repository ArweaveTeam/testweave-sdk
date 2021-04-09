import Arweave from 'arweave';

// test net
/* const arweave = Arweave.init({
  host: 'localhost',
  port: 80,
  protocol: 'http',
  timeout: 20000,
  logging: false,
}); */

// public testnet
const arweave = Arweave.init({
});


// production net
/* const arweaveInstace = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
}); */

export default arweave;
