# TestWeave SDK

This is the SDK of the TestWeave. TestWeave is the testing environment of the Arweave. 

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
const arweave = TestWeave.init().getArweaveInstance();

// init TestWeave on the top of arweave
const testWeave = TestWeave.init(arweave);

```

And thats it! Now you can use your arweave instance as usual, but every interaction will be performed on the test network! 

The SDK supplies some useful helpers as described in the following section. 

## SDK helpers

