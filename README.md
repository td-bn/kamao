# Kamao

Kamao (hindi for earn) is meant to be a simple yield aggregator and auto compounder.


### Testing

This interacts with DeFi protocols by forking off the mainnet and working with test eth from the Hardhat Network.

* We need an archival node, get one that points to mainet from Alchemy 
* Install dependencies using npm
* Fork mainnet: `npx harhdhat node --fork https://eth-mainnet.alchemyapi.io/v2/<API_KEY>`
* Run tests using `npx hardhat test`


### Current Capabilities
* ~~User withdrawal and deposit~~
* ~~Deposit into Aave~~
* ~~Withdraw from Aave~~
