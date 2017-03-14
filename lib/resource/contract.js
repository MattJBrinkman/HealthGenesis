import abi from './abi';
import web3 from '../web3';

const contract = web3.eth.contract(abi);

export default contract;
