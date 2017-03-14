import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SharesSchema from './sharesSchema';

const SharesCollection = new Mongo.Collection('Shares');

if (Meteor.isServer) {
  SharesCollection.attachSchema(SharesSchema);

  Meteor.publish('shares', function sharesPublication(recipientAddress) {
    return SharesCollection.find({
      recipientAddress
    });
  });

  SharesCollection._ensureIndex({ resourceId: 1 }, { unique: true })
}

export default SharesCollection;
