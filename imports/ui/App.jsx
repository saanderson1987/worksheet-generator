import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import ExerciseForm from './ExerciseForm.jsx';
import NewExForm from './NewExForm.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <ExerciseForm />
        <NewExForm />
      </div>
    );
  }

}

export default App;
