import abi from './abi.js';
import web3 from '../web3.js';

var contract = web3.eth.contract(abi);

export default contract;
