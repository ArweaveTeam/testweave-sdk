# TestWeave SDK

This is the SDK of the TestWeave. TestWeave is the testing environment of the Arweave. 

> Note that to work with the TestWeave, you need to install a local testnet. To do so, checkout the [TestWeave Docker Repository](https://github.com/ArweaveTeam/testweave-docker).

## Installation

Install the SDK with: 

```shell
npm install TestWeave
```

and then import it in your project as the following: 

```javascript
import TestWeave from 'TestWeave';
```
## Usage

The SDK supplies handlers for testing the followings: 

1. deploying files on the Arweave;
2. deploying and testing SmartWeave contracts on the Arweave;

Firstly you need to create a TestWeave instance on the top on an Arweave node, as following: 

```javascript
import TestWeave from 'TestWeave';

// init arweave as usual
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
});

// init TestWeave on the top of arweave
const testWeave = TestWeave.init(arweave);

```

And here you go! Now you can use your arweave instance as usual, but every interaction will be performed on the test network! 

For a fast bootstrap checkout the examples in the following sections.

To check all the useful helpers that the SDK supplies, checkout the XXX section. 

## Example 1 - Submitting a data transaction

1. Initialize the arweave node and the TestWeave on it:
   
```javascript
import Arweave from 'arweave';
import TestWeave from 'testweave-sdk';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
}); 

const testWeave = TestWeave.init(arweave);
```

2. Create a data transaction, sign and post it

```javascript
const data = `
<html>
  <head>
    <meta charset="UTF-8">
    <title>Info about arweave</title>
  </head>
  <body>
    Arweave is the best web3-related thing out there!!!
  </body>
</html>`
const dataTransaction = await arweave.createTransaction({
  data,
}, testWeave.rootJWK)

await arweave.transactions.sign(dataTransaction, testWeave.rootJWK)
const statusBeforePost = await arweave.transactions.getStatus(dataTransaction.id)
console.log(statusBeforePost); // this will return 404
await arweave.transactions.post(dataTransaction)
const statusAfterPost = await arweave.transactions.getStatus(dataTransaction.id)
console.log(statusAfterPost); // this will return 202
```

3. Use the TestWeave to instantly mine the block that contains the transaction

```javascript
await testWeave.mine();
const statusAfterMine = await arweave.transactions.getStatus(dataTransaction.id)
console.log(statusAfterMine); // this will return 200
```

Thats it! 

## SDK helpers

For easily test Arweave applications, the SDK supplies the helpers described in the following sections. 
### drop(wallet, quantity) 

Drops AR from the root wallet to another one. Use it as followings: 

```javascript
const jkw = await arweave.wallets.generate();
const generatedAddr = await arweave.wallets.getAddress(jkw);
await testWeave.drop(generatedAddr, '10000');
const generatedAddressBalance = await arweave.wallets.getBalance(generatedAddr) // returns 10000
```

### mine()

Mines the following block of the testnet and all the transactions contained in it.

```javascript
await testWeave.mine();
```

### getter rootJWK

Returns the root JWK, it has an initial balance of 10000000 and the address MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y

```javascript
const rootJWK = await testWeave.rootJWK;
```





