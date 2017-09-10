import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Problems } from '../api/problems.js';

class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderResponse = this.renderResponse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let blanks = this.genBlanks(nextProps);
    this.setState({ blanks });
  }

  genBlanks(props) {
    let blanks = {};
    props.problems.forEach( (problem, idx) => {
      problem.answers.forEach( answer => {
        if (blanks[idx]) {
          blanks[idx].push('');
        } else {
          blanks[idx] = [''];
        }
      });
    });
    return blanks;
  }

  render() {
    return (
      <div>
        <h1>Exercise Form</h1>
        <form onSubmit={ this.handleSubmit }>
          {this.renderProblems()}
          {JSON.stringify(this.state)}
          {JSON.stringify(this.props.problems)}
        </form>
      </div>
    );
  }

  removeProblem(problemId) {
    return (event) => {
      event.preventDefault();
      Meteor.call('problems.remove', problemId);
    };
  }

  renderProblems() {
    return this.props.problems.map( (problem, idx) => {
      return (
        <div key={idx}>
          <div>{idx+1}. { problem.question }</div>
          <div>{ this.renderResponse(idx) }</div>
          <button onClick={this.removeProblem(problem._id)}>Delete</button>
        </div>
      );
    });
  }

  renderResponse(problemIdx) {
    let problem = this.props.problems[problemIdx];
    let respBlankCount = -1;
    return problem.response.map( (part, idx) => {
      if (part === '[BLANK]') {
        respBlankCount ++;
        return (
          <input
            key={ idx }
            name={ [problemIdx, respBlankCount] }
            value={ this.state.blanks[problemIdx][respBlankCount] }
            onChange={ this.handleInputChange }
          />
        );
      } else {
        return <div key={ idx }>{ part }</div>;
      }
    });
  }

  handleInputChange(event) {
    const name = event.target.name.split(',');
    const problemIdx = name[0];
    const respBlankCount = name[1];
    const value = event.target.value;
    let blanks = Object.assign({}, this.state.blanks);
    blanks[problemIdx][respBlankCount] = value;
    this.setState({ blanks });
  }

}

export default createContainer(() => {
  Meteor.subscribe('problems');

  return {
    problems: Problems.find({}).fetch(),
  };
}, ExerciseForm);
