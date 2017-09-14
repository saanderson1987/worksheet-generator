import { Meteor } from 'meteor/meteor';
import '../imports/api/problems.js';
import { Exercises } from '../imports/api/exercises.js';
import { Documents } from '../imports/api/documents.js';

// Meteor.startup(() => {
//   if(Exercises.find().count() === 0) {
//     Exercises.insert({
//       "exName" : "WS1",
//       "problems" : [
//         {
//           "question" : "Comment tu t'appelles?",
//           "response" : [
//             {
//               "text" : "Je m'appelle",
//               "blank" : true
//             },
//             {
//               "text" : "Michel.",
//               "blank" : false
//             }
//           ]
//         }
//       ],
//       "createdAt" : new Date()
//     });
//   }
// });

Meteor.startup(() => {
  if(Documents.find().count() === 0) {
    Documents.insert({
      "owner": "saanderson1987@gmail.com",
      "permittedUsers": [],
      "type": "fill-in-blank",
      "docName" : "WS1",
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

//
// ({
//   "owner": "saanderson1987@gmail.com",
//   "permittedUsers": [],
//   "type": "fill-in-blank",
//   "docName" : "WS1",
//   "problems" : [
//     {
//       "question" : "Comment tu t'appelles?",
//       "response" : [
//         {
//           "text" : "Je m'appelle",
//           "blank" : true
//         },
//         {
//           "text" : "Michel.",
//           "blank" : false
//         }
//       ]
//     },
//     {
//       "question" : "Comment ca va?",
//       "response" : [
//         {
//           "text" : "Ca va",
//           "blank" : true
//         },
//         {
//           "text" : "bien.",
//           "blank" : false
//         }
//       ]
//     }
//   ],
//   "createdAt" : new Date()
// })
