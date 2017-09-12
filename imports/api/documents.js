import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Documents = new Mongo.Collection('documents');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('documents', () => {
    return Documents.find({});
  });

  // Meteor.publish('userDocuments', () => {
  //   return Documents.find( {owner: this.userId} );
  // });

}

Documents.schema = new SimpleSchema({
  owner: {type: String},
  permittedUsers: {type: [String]},
  docName: {type: String},
  problems: {
    type: [Object],
  },
  'problems.$': {
    type: Object
  },
  'problems.$.question': {
    type: String
  },
  'problems.$.response': {
    type: [Object]
  },
  'problems.$.response.$.text': {
    type: String,
    optional: true
  },
  'problems.$.response.$.blank':{
    type: Boolean,
    optional: true
  }
});


Meteor.methods({
  'documents.insert'(doc) {
    Documents.schema.validate(doc);
    const {owner, docName, problems} = doc;
    Documents.insert({ owner, docName, problems,
      createdAt: new Date()
    });
  },

});
