import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import ExerciseForm from './ExerciseForm.jsx';
import NewExForm from './NewExForm.jsx';
import ExerciseList from './ExerciseList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.selectEx = this.selectEx.bind(this);
    this.state = {
      selectedEx: ''
    };
  }

  selectEx(selectedEx) {
    return (event) => {
      event.preventDefault();
      this.setState({ selectedEx });
    };
  }

  render() {
    return (
      <div>
        <ExerciseList selectEx={ this.selectEx }/>
        <ExerciseForm id={ this.state.selectedEx } />
        <NewExForm />
      </div>
    );
  }

}

export default App;
