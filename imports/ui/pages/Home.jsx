import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Exercises } from '../api/exercises.js';
import { Link } from 'react-router-dom';
import ExerciseList from '../ExerciseList';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Link to='exercises/new'>Create New Worksheet</Link>
        <ExerciseList />
      </div>

    );
  }
}

export default createContainer( () => {
  Meteor.subscribe('exercises');

}, Home);
