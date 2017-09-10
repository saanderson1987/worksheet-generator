import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Exercises = new Mongo.Collection('exercises');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('exercises', function exercisesPublication() {
    return Exercises.find({});
  });

  Meteor.publish('exercise', function exercisePublication(exId) {
    return Exercises.find(exId);
  });
}

Exercises.schema = new SimpleSchema({
  exName: {type: String},
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
  'exercises.insert'(exercise) {
    Exercises.schema.validate(exercise);
    const {exName, problems} = exercise;
    Exercises.insert({ exName, problems,
      createdAt: new Date()
    });
  },

});
