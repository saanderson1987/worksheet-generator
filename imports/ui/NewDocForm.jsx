import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
var AutosizeInput = require('react-input-autosize');
import {cloneDeep} from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Problem from './Problem.jsx';


class NewDocForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleResponseInput = this.handleResponseInput.bind(this);
    this.addProblem = this.addProblem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBlank = this.addBlank.bind(this);
    this.moveProblem = this.moveProblem.bind(this);
    this.state = {
      docName: '',
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
        <h3>New Document Form</h3>
        <h3>
          <input
            className='new-doc-name'
            placeholder='Document name   '
            name='docName'
            value={ this.state.docName }
            onChange={ this.handleInput()}
          />
        </h3>
        <form onSubmit={ this.handleSubmit }>
          { this.renderProblems() }
          <button onClick={ this.addProblem }>Add Problem</button>
          { JSON.stringify(this.state) }
          <input type="submit" value="Submit" />
        </form>
        { this.state.submitStatus }
      </div>
    );
  }

  moveProblem() {

  }

  renderProblems() {
    return this.state.problems.map( (problem, idx) => {
      return(
        <Problem
          index={idx}
          moveProblem={this.moveProblem}
        >
          <div key={ idx } style={{border: '1px dotted black', padding: '10px'}}>
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
        </Problem>
      );
    });
  }


  renderResponse(problemIdx) {
    let problem = this.state.problems[problemIdx];
    return problem.response.map( (part, idx) => {
      if (part.blank) {
        return (
          <div key={ idx }>
            <AutosizeInput
              placeholder="Answer blank"
              inputClassName='new-form-answer-input'
              value={ problem.response[idx].text }
              onChange={ this.handleResponseInput(problemIdx, idx) }
            />
          <button className='modify-blank remove-blank' onClick={ this.removeBlank(problemIdx, idx) }>-</button>
          </div>

        );
      } else {
        const placeholder = idx === 0 ? 'Response' : '...continue respone';
        const minWidth = idx === 0 ? '' : '10';
        const addPreBlankButton = idx === 0 ?
          <button className='modify-blank' onClick={ this.addBlank(problemIdx, idx - 1, 'pre') }>+</button>
          : '';
        return (
          <div key={ idx }>
            { addPreBlankButton }
            <AutosizeInput
              placeholder={ placeholder }
              minWidth={ minWidth }
              inputClassName='new-form-response-input'
              value={ problem.response[idx].text }
              onChange={ this.handleResponseInput(problemIdx, idx) }
              />
            <button className='modify-blank' onClick={ this.addBlank(problemIdx, idx, 'post') }>+</button>
          </div>
        );
      }
    });
  }

  removeBlank(problemIdx, respIdx) {
    return (event) => {
      event.preventDefault();
      const problems = cloneDeep(this.state.problems);
      const response = problems[problemIdx].response;
      response.splice(respIdx, 1);
      if (respIdx > 0) {
        // Combine the response text that followed the blank with the text
        // that came before the blank:
        response[respIdx -1].text += ' ' + response.splice(respIdx, 1)[0].text;
      }
      this.setState({ problems });
    };
  }

  addBlank(problemIdx, respIdx, pos) {
    return (event) => {
      event.preventDefault();
      const problems = cloneDeep(this.state.problems);
      if (pos === 'post') {
        problems[problemIdx].response.splice([respIdx + 1], 0,
          {
            text: '',
            blank: false
          });
      }
      problems[problemIdx].response.splice([respIdx + 1], 0,
        {
          text: '',
          blank: true
        });

      this.setState({ problems });
    };
  }

  addProblem(event) {
    event.preventDefault();
    const problem = {
      question: '',
      response: [
        {
          text: '',
          blank: false
        }
      ],
    };
    const problems = cloneDeep(this.state.problems);
    problems.push(problem);
    this.setState({ problems });
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
        const problems = cloneDeep(this.state.problems);
        problems[problemIdx].question = value;
        this.setState( { problems });
      };
  }

  handleResponseInput(problemIdx, respIdx) {
    return (event) => {
      const value = event.target.value;
      const problems = cloneDeep(this.state.problems);
      problems[problemIdx].response[respIdx].text = value;
      this.setState({ problems });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { docName, problems } = this.state;
    const owner = Meteor.user().id;
    Meteor.call('documents.insert', {owner, docName, problems},
      (err, res) => {
        const submitStatus = err ? 'Error, check console log' : 'SUCCESS!';
        console.log(err);
        this.setState({ submitStatus });
      });
  }
}

export default DragDropContext(HTML5Backend)(NewDocForm);
