import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Exercises } from '../api/exercises.js';
import { Documents } from '../api/documents.js';
import {cloneDeep} from 'lodash';


class DocForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      problems: this.props.problems
    }
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.problems.length > 0) {
      this.setState( {problems: nextProps.problems});
    }
  }

  render() {
    if (this.props.problems.length < 1) {
      return(<div>Loading..</div>);
    }
    return (
      <div>
        <h3>Exercise Form</h3>
        <h1>{ this.props.docName }</h1>
        <form onSubmit={ this.handleSubmit }>
          { this.renderProblems() }
          this.state:
          {JSON.stringify(this.state)}
          <br />this.props:
          {JSON.stringify(this.props)}
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
    return this.state.problems.map( (problem, idx) => {
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
    let problem = this.state.problems[problemIdx];
    return problem.response.map( (part, idx) => {
      if (part.blank) {
        return (
          <input
            key={ idx }
            value={ problem.response[idx].text }
            onChange={ this.handleInputChange(problemIdx, idx) }
          />
        );
      } else {
        return <div key={ idx }>{ part.text }</div>;
      }
    });
  }

  handleInputChange(problemIdx, respIdx) {
    return (event) => {
      const value = event.target.value;
      const problems = cloneDeep(this.state.problems);
      problems[problemIdx].response[respIdx].text = value;
      this.setState({ problems });
    };
  }
}

const genBlanks = (problems) => {
  let probsWithBlanks = cloneDeep(problems);
  problems.forEach( (problem, problemIdx) => {
    problem.response.forEach( (part, idx) => {
      if (part.blank) {
        probsWithBlanks[problemIdx].response[idx].text = '';
      }
    });
  });
  return probsWithBlanks;
};

export default createContainer( ({match}) => {
  Meteor.subscribe('documents');
  const doc = Documents.findOne(match.params.id);
  const props = {
    problems: doc ? genBlanks(doc.problems) : [],
    docName: doc ? doc.docName : ''
  };
  return props;
}, DocForm);
