import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Exercises } from '../api/exercises.js';


class ExerciseList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const exercises = this.props.exercises ? this.props.exercises.map( (exercise, idx) => {
      return <li key={ idx }><a onClick={ this.props.selectEx(exercise._id) }>{ exercise.exName }</a></li>;
    }) : '';
    return (
      <div>
        <h3>Exercise List</h3>
        <ul>
          {exercises}
        </ul>
        Props: {JSON.stringify(this.props)}
      </div>
    );
  }

}

export default createContainer(() => {
  Meteor.subscribe('exercises');
  return ({
    exercises: Exercises.find({}).fetch()
  });
}, ExerciseList);
