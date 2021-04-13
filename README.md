# TestWeave SDK

This is the SDK of the TestWeave. TestWeave is the testing environment of the Arweave. 


## MANDATORY PREREQUISITES 

__To work with the TestWeave, you need to install a local testnet. To do so, follow the instructions here: [https://github.com/ArweaveTeam/testweave-docker](https://github.com/ArweaveTeam/testweave-docker)__


## Installation 

You can install the SDK by means of NPM, as following: 

```
npm install testweave-sdk
```

Or you can grab the package directly from the arweave, as following: 

```shell
npm install https://arweave.net/IkZLzAPt8ArujsQL6Y7Rx1CTZx8N0hgUTLvl5_Uokls
```

and then import it in your project as the following: 

```javascript
import TestWeave from 'testweave-sdk';
```
## Usage

The SDK supplies handlers for testing the followings: 

1. deploying files on the Arweave;
2. deploying and testing SmartWeave contracts on the Arweave;

Firstly you need to create a TestWeave instance on the top on an Arweave node, as following: 

```javascript
import TestWeave from 'testweave-sdk';

// init arweave as usual
const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});

// init TestWeave on the top of arweave
const testWeave = await TestWeave.init(arweave);

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
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
}); 

const testWeave = await TestWeave.init(arweave);
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

## Example 2 - Publishing and Interacting with SmartWeave Contracts

1. Initialize the arweave node and the TestWeave on it:
   
```javascript
import Arweave from 'arweave';
import TestWeave from 'testweave-sdk';

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
}); 

const testWeave = await TestWeave.init(arweave);
```

2. Create a SmartWeave PST contract (you can find a sample contract source and its init state, built on the TestWeave root address, here: [https://github.com/ArweaveTeam/testweave-sdk/tree/main/tests/fixtures](https://github.com/ArweaveTeam/testweave-sdk/tree/main/tests/fixtures):

```javascript
import { createContract, readContract, interactWrite, interactWriteDryRun } from 'smartweave';
import fs from 'fs';

// import the sample contract init state
import contractInitState from 'token-pst-contract.json';
// load the contract as a string
const contractSource = fs.readFileSync('token-pst-contract.js').toString();

// create the contract and mine the transaction for creating it
const c = await createContract(arweave, testWeave.rootJWK, contractSource, JSON.stringify(contractInitState));
await testWeave.mine();
```
3. Read the contract state, transfer some token to a generated wallet, and read again the contract state

```javascript
// read the contract before performing any interaction
const beforeTransaction = await readContract(arweave, c);
console.log(`Before interact write: ${JSON.stringify(beforeTransaction)}`)

// generate a wallet
const jkw = await arweave.wallets.generate();
const generatedAddr = await arweave.wallets.getAddress(jkw)

// interact with the contract
const iwt = await interactWrite(arweave, testWeave.rootJWK, c, {
  function: 'transfer',
  target: generatedAddr,
  qty:5000
}, [] , generatedAddr, '23999392')
console.log(`Interact write transaction: ${JSON.stringify(iwt)}`);

// mine the contract interaction transaction
await testWeave.mine();

// get the new balance of the generated address (it should be 23999392)
const generatedAddressBalance = await arweave.wallets.getBalance(generatedAddr)
console.log(generatedAddressBalance)

// read the contract after the interact write transaction (the generated wallet should own 5000 tokens)
const afterTransaction = await readContract(arweave, c);
console.log(`After interact write: ${JSON.stringify(afterTransaction)}`);
```
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





