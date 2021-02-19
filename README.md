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

// init a TestWeave instance
const testWeave = TestWeave.init({
  host: 'localhost',
  port: 3000,
  protocol: 'http',
});

// generate a TestWeave wallet having a balance of 20 AR

const testWallet = await testWeave.wallets.generate({
  balanceAr: 20,
});



```


### TO BE DELETED

#### Sample Transaction

```json
{
    "format": 2,
    "id": "7T4LA4BDpq-5Z4_S7efiXfo1Vze6eptx7nU0MQxP0TA",
    "last_tx": "1-TGqngekffwXZqn7G9Fef4bwhuRcMwzRFJ6RnhWCo2jscueJN4-yV4V9_LLIOps",
    "owner": "tG8i8cPhpLAEMTdgDF0t1tnWP5yCCGoeONrgkD8nVENz2juqUOpKSdXHI2UgsIUD40XQviaFNti_V38_zFDiS3I-Uzg-AFCTyM7Q7aKRxKV0fnNJHIx03QJ56BQ0RypmDOZ28EIFFpmtZNEuLDGUyha9bnhjunTpYJkFwdCSeTYv8dc0EdaKNwR3avnNLzkYHT1LqwB7Whmk-qfzz5aUFC-7Zk-GeVuiBDehkz_4E19btPLWpmfrCN70EHoqFiJkDErCxIMvudnyv1xrYpMBZCC1vhTnJFIEg1wFCA2dDBD4QcJRR6kDKIk5DBmTB_XqLCe_x-33JH3hr6b2O8iTq8hmRsYfk47Y4L_JUc-1ufJow0yiM6b_L-a7ODTSD3vVbboT_w9vjnVIQ-cwwIXSj2ORcvzQ4wS0gc-1Ol0eF7PbWxmVp2Ydjbcw5XwSNYOo9pOMafpuffhHEMXY12LAqkFbD4o4Xynav64AIJCPRVm7bpPcKqvYt4MwZD1BsYktR6NP4C7FAnqrbgLsO3uSxVC-h660_if2yShHIDoYCF6OYDcPIJFDfSwFyABAaISTT9CCHnb-3S3kSxt4witZs4gGk9zTqtqawyQS687ZoYhQgZ4lrOg5WEJ9ZKtMc3RC5PceQJlxecXh2IUabM6oZjyRvuNUy_nQoeB50-V1Oec",
    "tags": [],
    "target": "",
    "quantity": "0",
    "data": "QSBzdXBlciB0ZXN0",
    "data_size": "12",
    "data_root": "O1pxE5h3t7r47u6GhTYtb1fr5HNdeMFKUfIE_QmrXz8",
    "reward": "5010193",
    "signature": "aclNiJwfszZsIOl7p80I1VBBP8MqDi6NcVHl2txvhIvWZwy0bq9qr_4sSIqF2g1oP-ReFi6l-V8LPnQCZJK7UeubEqzeafEOz7NvwuKwxtXFrdQJFGX4swT1xGbv107Hiv5xjEqHhiNfKO9XhQtyVr-btsgnqcn7U_LLbEVC_RLd92YVf5aKAfyba2XbZYXJhWSMFoonjN2TIxbJXXQUsbus91MLe5wR78-8wzE7QPdyDecfrUwCcrZTz3hmr08S1AczJ0HKwVNELk2Idtglnq_9fZTVFuMD4jDsVC4efPtk_TE4DPhCYjoYnsnJMOgbf8eCEHCqRvFr0fbRDZCAOzP4TmQX-ZEQ-Ivyhawa3nE8LGfv_6YvuRCnad2G8x1kzlPS3iu-q34Vjoxx5HQco4cATXp8qyNCztmN3zE7Mvjjn_hJartMgudZA_fvqlm_GbkOA5HkCx0gCiCpdoFEV0Q8yQrS5_B4cRMl58z-C-JDXZDC10B1qDqzqcxfenveKKcOpZfF22sL1OqA8cdJZsN5hSOlBPA9HsFsCTBFTdGFjgBftittNiX_BrTtIgUdR7OMTGPLRhHQQCkFlqy_u7XYqFDsd9z2MmZ1wl7CYTNgATYDe850Xc8LAebpGg3FQhDMixKc5zTfXxsPUYSbtx3omk2muy0UR4N0trYozHE"
}
```
#### Sample Transaction Response

```json
{ 
    "status": 200, 
    "statusText": "OK", 
    "data": {

    } 
}
```
#### Sample transaction status

```json
{
  "status": 200,
  "confirmed": {
    "block_height": "620694",
    "block_indep_hash": "J73oVxhDfmtR7cgwTt-VcwMfjNRpWemtN8PX6EBNEtkAji_44A6UiOIrRlQRgFIN",
    "number_of_confirmations": "29"
  }
}
```