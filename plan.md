
-design db
  -users
  -documents(exercises, worksheets, tests)
    -user-owner
    -users able to view it
    -type:
-create user auth: http://www.mrscottmcallister.com/custom-authentication-in-meteor/
-create routes
  -/login login page
  -/signup signup page
  -/ home page:
    -list of user-owned exercises(button to edit and view),
    -button to create new ex,
    -docs/exercises 'subscribed to' that user can fill out but not edit.
  -/docs/:id docs/exercise form page for user to complete
  -/docs/new new doc/exercise form
  -/docs/:id/edit edit doc/exercise form (maybe same component as new exercise form)
-need to maybe combine the exercise forms into a single component
-ability to grade the worksheets
-add different types of documents