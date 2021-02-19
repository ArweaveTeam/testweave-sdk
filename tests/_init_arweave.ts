import Arweave from 'arweave';

// test net
const arweaveInstace = Arweave.init({
  host: '46.101.45.117',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});

// production net
/* const arweaveInstace = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
}); */

export default arweaveInstace;
