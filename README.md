# Worksheet Generator

I haven't yet thought of a clever, marketable name for this application, but the current one spells out what it does pretty nicely. It is a tool to create digital educational worksheets. Teachers can create digital worksheets for their students to complete. Also, students can create their own worksheets to help them study. Currently, the application supports just fill-in-blank worksheets, but in the future will support other types of worksheets such as matching, multiple-choice, etc.

The application is built using Meteor and MongoDB on the back end, and React on the front end.

This is the first time that I've worked with Meteor. While working on the front end, every time I make a change to file and reload the browser to see the updated view, Meteor has to restart the server, which takes a good 5-7 seconds. This doesn't sound that long, but if I'm making lots of edits, it can get very irritating. As a result, I've extracted the front end from the project and I'm constructing it without a database. I will later re-integrate it.

New updates have been made to the front end repo, found [here](https://github.com/saanderson1987/worksheet-generator-frontend)
