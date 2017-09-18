## BACKEND
-design db
  +users
  +documents(exercises, worksheets, tests)
    +user-owner
    +users able to view it
    +type
  -subject hierarchy
  -seed database
+create routes: https://themeteorchef.com/tutorials/getting-started-with-react-router-v4
  +/login login page
  +/signup signup page
  +/ home page
  +/docs/:id docs/exercise form page for user to complete
  +/docs/new new doc/exercise form
  +/docs/:id/edit edit doc/exercise form (maybe same component as new exercise form)
+create user auth: http://www.mrscottmcallister.com/custom-authentication-in-meteor/

## PAGES
-home page
  -list of user-owned exercises
    -button to edit
    +button to view
  +button to create new ex,
  +docs/exercises 'subscribed to' that user can fill out but not edit.
-new doc / edit doc
  -add permitted users button, list of permitted users
  -type of doc
-doc view / form
  -add edit button if it is an owned exercise
  -submit to instructor: prompt "Are you sure?"
  -option to grade without submitting
  -option to submit to check for completion?

##FUNCTIONALITY
-ability to grade the worksheets
  +basic functionality
  -if you add a space at the end, it's counted wrong -- fix this
-add different types of documents
-smooth transition from doc view to edit, to look like actually just editing the doc view page OR have a preview
-drag and drop in NewDocForm
  +drag problems to change ordering
  -need to resolve problem id

##RE-FACTOR
-need to maybe combine the exercise forms into a single component
