import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class NewExForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleResponseInput = this.handleResponseInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBlank = this.addBlank.bind(this);
    this.state = {
      problems: [
        {
          question: '',
          response: [''],
          answers: []
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>New Exercise Form</h1>
        <form onSubmit={ this.handleSubmit }>
          { this.renderProblems() }
          { JSON.stringify(this.state) }
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  renderProblems() {
    return this.state.problems.map( (problem, idx) => {
      return(
        <div key={idx}>
          Question:
          <input
            name={ [idx] }
            value={ this.state.problems[idx].question }
            onChange={ this.handleQuestionInput(idx) }
          />
          Response:
          <div className='new-form-responses'>
            {this.renderResponse(idx)}
          </div>
          <button onClick={ this.addBlank(idx) }>Add Blank</button>
        </div>
      );
    });
  }

  renderResponse(problemIdx) {
    let problem = this.state.problems[problemIdx];
    let respBlankCount = -1;
    return problem.response.map( (part, idx) => {
      if (part === '[BLANK]') {
        respBlankCount ++;
        return (
          <input
            key={ idx }
            name={ respBlankCount }
            value={ problem.answers[respBlankCount] }
            onChange={ this.handleResponseInput('answers', problemIdx) }
          />
        );
      } else {
        return (
          <input
            className='new-form-response-input'
            key={ idx }
            name={ idx }
            value={ problem.response[idx] }
            onChange={ this.handleResponseInput('response', problemIdx) }
          />
        );
      }
    });
  }

  addBlank(problemIdx) {
    return (event) => {
      event.preventDefault();
      const problems = Object.assign([], this.state.problems);

      problems[problemIdx].answers.push('');
      problems[problemIdx].response.push('[BLANK]', '');
      this.setState({ problems });
    };
  }

  handleQuestionInput(problemIdx) {
    return (event) => {
        const value = event.target.value;
        const problems = Object.assign([], this.state.problems);
        problems[problemIdx].question = value;
        this.setState( { problems });
      };
  }

  handleResponseInput(valType, problemIdx) {
    return (event) => {
      const idx = event.target.name;
      const value = event.target.value;
      const problems = Object.assign([], this.state.problems);
      problems[problemIdx][valType][idx] = value;
      this.setState({ problems });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.problems.forEach( (problem) => {
      const { question, response, answers } = problem;
      Meteor.call('problems.insert', question, response, answers);
    });
  }

}

export default NewExForm;
