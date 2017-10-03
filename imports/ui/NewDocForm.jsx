import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
var AutosizeInput = require('react-input-autosize');
import {cloneDeep} from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import shortid from 'shortid';

import Problem from './Problem.jsx';
import NewBlank from './NewBlank.jsx';
import NewProblem from './NewProblem.jsx';
import Box from './Box.jsx';
import Response from './Response.jsx';

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
    this.addNewProblem = this.addNewProblem.bind(this);
    this.drop = this.drop.bind(this);
    this.dropBlank = this.dropBlank.bind(this);
    this.state = {
      docName: '',
      problemCount: 3,
      problems: [
        {
          question: 'a',
          id: '1',
          response: [
            {
              text: '',
              blank: false
            }
          ],
        },
        {
          question: 'b',
          id: '2',
          response: [
            {
              text: '',
              blank: false
            }
          ],
        },
        {
          question: 'c',
          id: '3',
          response: [
            {
              text: '',
              blank: false
            }
          ],
        },
      ],
      submitStatus: '',
      boxes: [],
    };
  }


  render() {
    // debugger;
    return (
      <div>
        <h3>New Document Form</h3>
        <div className='new-doc-container'>
          <div className='new-doc-form'>
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
          </div>
          <div className='toolbox'>
            <div>Toolbox</div>
            <NewBlank drop={this.drop}/>
            <NewProblem />
          </div>
        </div>
        { this.state.submitStatus }
      </div>
    );
  }

  drop(sourceType, targetType) {
    if (sourceType === 'blank') {
      const boxes = cloneDeep(this.state.boxes);
      boxes.push(
        <input
          className='new-form-answer-input'
          disabled
          placeholder='New blank'
          key={shortid.generate()}
        />
      );
      this.setState({ boxes });
    }
  }

  dropBlank(problemIdx, respIdx) {
    const problems = cloneDeep(this.state.problems);
    problems[problemIdx].response.splice(respIdx, 0,
      {
        text: '',
        blank: true
      });
    this.setState({ problems });
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


  moveProblem(dragIndex, hoverIndex) {
    // const problems = cloneDeep(this.state.problems);
    // const dragProblem = problems.splice(dragIndex, 1)[0];
    // problems.splice(hoverIndex, 0, dragProblem);
    // this.setState({ problems });

    const { problems } = this.state;
    const dragProblem = problems[dragIndex];

    this.setState(update(this.state, {
      problems: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragProblem],
        ],
      },
    }));
  }

  renderProblems() {
    return this.state.problems.map( (problem, idx) => {
      return(
        <Problem
          key={problem.id}
          id={problem.id}
          index={idx}
          moveProblem={this.moveProblem}
          addNewProblem={this.addNewProblem}
          question={problem.question}
        >
          <div>
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
          <div key={ shortid.generate() } >
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
          <Response
            key={ shortid.generate() }
            problemIdx={problemIdx}
            respIdx={idx}
            dropBlank={this.dropBlank}
          >
            <AutosizeInput
              placeholder={ placeholder }
              minWidth={ minWidth }
              inputClassName='new-form-response-input'
              value={ problem.response[idx].text }
              onChange={ this.handleResponseInput(problemIdx, idx) }
            />
          </Response>
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

  addNewProblem(idx) {
    const problem = {
      question: '',
      id: this.state.problemCount + 1,
      response: [
        {
          text: '',
          blank: false
        }
      ],
    };
    const problems = cloneDeep(this.state.problems);
    problems.splice(idx, 0, problem);
    this.setState( prevState => {
      return {
        problemCount: prevState.problemCount ++,
        problems
      };
    });
  }

  addProblem(event) {
    event.preventDefault();
    const problem = {
      question: '',
      id: this.state.problemCount + 1,
      response: [
        {
          text: '',
          blank: false
        }
      ],
    };
    const problems = cloneDeep(this.state.problems);
    problems.push(problem);
    this.setState( prevState => {
      return {
        problemCount: prevState.problemCount ++,
        problems
      };
    });
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
