import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Problems = new Mongo.Collection('problems');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('problems', function tasksPublication() {
    return Problems.find();
  });
}

Meteor.methods({
  'problems.insert'(question, response, answers) {
    Problems.insert({ question, response, answers,
      createdAt: new Date()
    });
  },

  'problems.remove'(problemId) {
    Problems.remove(problemId);
  }

});
