import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const BlockHarvestStatus = new Mongo.Collection('BlockHarvestStatus');

if (Meteor.isServer) {
  if(!BlockHarvestStatus.findOne()) {
    BlockHarvestStatus.insert({
      lastBlock: 0
    });
  }
}

export default BlockHarvestStatus;
