import Web3 from 'web3';

const web3 = new Web3();

const ethUrl = process.env.ETH_INSTANCE_URL || 'http://localhost:8545';

web3.setProvider(new web3.providers.HttpProvider(ethUrl));

export default web3;
