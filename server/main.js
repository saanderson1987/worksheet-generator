import { Meteor } from 'meteor/meteor';
import '../imports/api/problems.js';
import { Exercises } from '../imports/api/exercises.js';

Meteor.startup(() => {
  if(Exercises.find().count() === 0) {
    Exercises.insert({
      "exName" : "WS1",
      "problems" : [
        {
          "question" : "Comment tu t'appelles?",
          "response" : [
            {
              "text" : "Je m'appelle",
              "blank" : true
            },
            {
              "text" : "Michel.",
              "blank" : false
            }
          ]
        }
      ],
      "createdAt" : new Date()
    });
  }
});
