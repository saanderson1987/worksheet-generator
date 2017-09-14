import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
var AutosizeInput = require('react-input-autosize');
import { cloneDeep } from 'lodash';
import { merge } from 'lodash';
import { Documents } from '../api/documents.js';


class EditDoc extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleResponseInput = this.handleResponseInput.bind(this);
    this.addProblem = this.addProblem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBlank = this.addBlank.bind(this);
    this.removeProblem = this.removeProblem.bind(this);
    this.goBack = this.goBack.bind(this);
    const { docName, problems } = props.doc;
    this.state = {
      docName,
      problems,
      loading: props.loading,
      submitStatus: '',
    };
  }

  componentWillReceiveProps({ doc, loading }) {
    if (!loading) {
      const { problems, docName } = doc;
      this.setState({ docName, problems, loading });
    }
  }


  render() {
    if (this.state.loading) return <div>Loading</div>;
    return (
      <div>
        <h3>Edit Document</h3>
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
          <br/>
          <button onClick={ this.goBack }>Cancel</button>
          <input type="submit" value="Save Changes" />
        </form>
        { this.state.submitStatus }
        <br /> this.state:
        {JSON.stringify(this.state)}
        <br />this.props:
        {JSON.stringify(this.props)}
      </div>
    );
  }

  goBack(e) {
    e.preventDefault();
    this.props.history.goBack();
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
          <button onClick={ this.removeProblem(idx) }>Remove Problem</button>
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

  removeProblem(problemIdx) {
    return (event) => {
      event.preventDefault();
      const problems = cloneDeep(this.state.problems);
      problems.splice(problemIdx, 1);
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
    // const updatedDoc = merge({}, this.props.doc, {docName, problems});
    const updatedDoc = cloneDeep(this.props.doc);
    updatedDoc.docName = docName;
    updatedDoc.problems = problems;
    const docId = this.props.match.params._id;
    Meteor.call('documents.update', docId, updatedDoc,
      (err, res) => {
        const submitStatus = err ? 'Error, check console log' : 'SUCCESS!';
        console.log(err);
        this.setState({ submitStatus });
        if (!err) this.props.history.push(`/documents/${docId}`);
      });
  }
}


export default createContainer( ({match}) => {
  Meteor.subscribe('documents');
  const doc = Documents.findOne(match.params._id);

  const props = {
    doc: doc ? doc : {},
    loading: doc ? false : true
  };
  return props;
}, EditDoc);
