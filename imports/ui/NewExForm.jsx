import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
var AutosizeInput = require('react-input-autosize');


class NewExForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleResponseInput = this.handleResponseInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBlank = this.addBlank.bind(this);
    this.state = {
      exName: '',
      problems: [
        {
          question: '',
          response: [
            {
              text: '',
              blank: false
            }
          ],
        }
      ],
      submitStatus: '',
    };
  }

  render() {
    return (
      <div>
        <h3>New Exercise Form</h3>
        <h3>
          <input
            className='new-ex-name'
            placeholder='Exercise name   '
            name='exName'
            value={ this.state.exName }
            onChange={ this.handleInput()}
          />
        </h3>
        <form onSubmit={ this.handleSubmit }>
          { this.renderProblems() }
          { JSON.stringify(this.state) }
          <input type="submit" value="Submit" />
        </form>
        { this.state.submitStatus }
      </div>
    );
  }

  renderProblems() {
    return this.state.problems.map( (problem, idx) => {
      return(
        <div key={ idx }>
          { idx + 1 }.{' '}
          <input
            placeholder='Question'
            value={ this.state.problems[idx].question }
            onChange={ this.handleQuestionInput(idx) }
          />
          <div>
            <div className='new-form-responses'>
              {this.renderResponse(idx)}
            </div>
          </div>
        </div>
      );
    });
  }


  renderResponse(problemIdx) {
    let problem = this.state.problems[problemIdx];
    return problem.response.map( (part, idx) => {
      if (part.blank) {
        return (
          <AutosizeInput
            placeholder="Answer blank"
            inputClassName='new-form-answer-input'
            key={ idx }
            value={ problem.response[idx].text }
            onChange={ this.handleResponseInput(problemIdx, idx) }
          />
        );
      } else {
        const placeholder = idx === 0 ? 'Response' : '';
        const minWidth = idx === 0 ? '' : '10';
        return (
          <div key={ idx }>
            <button className='add-blank' onClick={ this.addBlank(problemIdx, idx - 1) }>+</button>
            <AutosizeInput
              placeholder={ placeholder }
              minWidth={ minWidth }
              inputClassName='new-form-response-input'
              value={ problem.response[idx].text }
              onChange={ this.handleResponseInput(problemIdx, idx) }
              />
            <button className='add-blank' onClick={ this.addBlank(problemIdx, idx) }>+</button>
          </div>
        );
      }
    });
  }

  addBlank(problemIdx, respIdx) {
    return (event) => {
      event.preventDefault();
      const problems = Object.assign([], this.state.problems);
      problems[problemIdx].response.splice([respIdx + 1], 0,
        {
          text: '',
          blank: true
        });
      this.setState({ problems });
    };
  }

  handleInput() {
    return (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({ [name]: value });
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

  handleResponseInput(problemIdx, respIdx) {
    return (event) => {
      const value = event.target.value;
      const problems = Object.assign([], this.state.problems);
      problems[problemIdx].response[respIdx].text = value;
      this.setState({ problems });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { exName, problems } = this.state;
    debugger;
    Meteor.call('exercises.insert', {exName, problems}, (err, res) => {
      const submitStatus = err ? 'Error, check console log' : 'SUCCESS!';
      console.log(err);
      this.setState({ submitStatus });
    });
  }

}

export default NewExForm;
