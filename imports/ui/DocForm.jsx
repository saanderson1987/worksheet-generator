import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Exercises } from '../api/exercises.js';
import { Documents } from '../api/documents.js';
import {cloneDeep} from 'lodash';
import DocResults from './DocResults.jsx';


class DocForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      problems: this.props.problems,
      graded: false
    };
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.problems.length > 0) {
      this.setState( {problems: nextProps.problems});
    }
  }

  render() {
    if (this.props.problems.length < 1) {
      return(<div>Loading...
          <br /> this.state:
          {JSON.stringify(this.state)}
          <br />this.props:
          {JSON.stringify(this.props)}</div>);
    }
    return (
      <div>
        <h3>Exercise Form</h3>
        <h1>{ this.props.docName }</h1>
        <form onSubmit={ this.handleSubmit }>
          { this.renderProblems() }
          <input type="submit" value="Submit"/>
        </form>
        { this.state.graded ?
           <DocResults
             docId={this.props.match.params._id}
             submitted={this.state.problems}
           /> : ''
        }
        this.state:
        {JSON.stringify(this.state)}
        <br />this.props:
        {JSON.stringify(this.props)}
      </div>
    );
  }

  renderProblems() {
    return this.state.problems.map( (problem, idx) => {
      return (
        <div key={idx}>
          <div>{idx+1}. { problem.question }</div>
          <div>{ this.renderResponse(idx) }</div>
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

  handleSubmit(event) {
    event.preventDefault();
    this.setState({graded: true});
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
  const doc = Documents.findOne(match.params._id);
  const props = {
    problems: doc ? genBlanks(doc.problems) : [],
    docName: doc ? doc.docName : ''
  };
  return props;
}, DocForm);
