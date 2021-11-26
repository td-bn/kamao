# Kamao

Kamao (hindi for earn) is meant to be a simple yield aggregator and auto compounder.

## About
Protocol to earn yield on ETH by depositing into Aave's WETH pool. 

### Deployed URL for Kovan testnet
https://app.netlify.com/sites/inspiring-raman-7e09b4

### Getting started
1. Clone the repo
2. Install dependencies using `npm i`

### Compiling Contracts
* `npx hardhat compile`

**Note**: You might see warning, but those are for Mock contracts used for testing.

### Testing contracts
* `npx hardhat test` will run the tests in the test directory

### Deploying contracts to Kovan testnet
* Deployment on localhost is meaningless, unless forking mainnet and supplying Aave addresses from mainnet
* Add .env varibles needed in the hardhat config file in `hardhat.config.ts`

* `npx hardhat deploy --network kovan --export-all=web/src/artifacts/deployments.json`
This will also add a deployments.json file that can be used to get addresses of contracts and the ABIs for 
the frontend.

### Compiling Frontend
* `cd web`
* `npm i` to install dependencies
* `npm run start` to start local server

**NOTE**: Make sure to have the `web/src/artifacts/deployments.json` file, which is generated from deployment above. It is
needed to interact with contracts.


## Description
A simple DeFi protocol that allows users to earn a yield on their ETH by depositing into Aave's WETH 
lending pool. 

The protocol has three main components:
1. Vaults: allow users to deposit assets, get k-LP token (e.g. kETH) in exchange representing their share of the pool
2. Controller: governance controlled controller of a vault
3. Strategy: a strategy for earning yield for a vault controlled through controller

As of this time, the project has: an ETH vault, a controller and a strategy for earning yield from Aave.

### Workflow
1. User visits site
2. User connects wallet through metamask (use Kovan)
3. User deposits Kovan eth, get kETH LP tokens
4. User clicks earn button (no governance or keeper set up yet). This makes sure the ETH is deposited to 
earn yield on Aave
5. User can remove funds by clicking withdraw whenever they choose to

### Env variables
```
KOVAN_URL=<Node Url, Infura/Alchemy URL>
PRIVATE_KEY=<Private key here>
```

### Current Capabilities
* ~~User withdrawal and deposit~~
* ~~Deposit into Aave~~
* ~~Withdraw from Aave~~

### TODO
* Make generic IERC20 vaults
* Make more strategies
* Add token voting governance
* Improve UX

