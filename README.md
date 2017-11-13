# Worksheet Generator
[View a sample](https://saanderson1987.github.io/worksheet-generator-sample/) of the work in progress!

Worksheet Generator is a tool to create digital educational worksheets. Teachers can create digital worksheets for their students to complete. Also, students will be able to create their own worksheets to help them study. Currently, the application supports fill-in-blank worksheets, and in the future it will support other types of worksheets such as matching, multiple-choice, etc.

The application is built using Meteor and MongoDB on the back end, and React on the front end.

This is the first time that I've worked with Meteor. I've found that while working on the front end, every time I make a change to file and reload the browser to see the updated view, Meteor has to restart the server, which takes a good 5-7 seconds. This doesn't sound that long, but if I'm making lots of edits, it can get very irritating. As a result, I've extracted the front end from the project and I'm constructing it without a database. I will later re-integrate it. As a result, new updates have been made to the front end repo, found [here](https://github.com/saanderson1987/worksheet-generator-frontend)

My most notable feature is the ability for users to edit worksheets by using a drag and drop interface. You can witness a sample of this [here](https://saanderson1987.github.io/worksheet-generator-sample/).
