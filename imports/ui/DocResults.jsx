import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Documents } from '../api/documents.js';
import { cloneDeep } from 'lodash';

class DocResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    if (!this.props.loading) this.gradeDocument();
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading) this.gradeDocument();
  }

  gradeDocument() {
    let results = cloneDeep(this.props.submitted);
    this.props.doc.problems.forEach( (problem, problemIdx) => {
      problem.response.forEach( (respPart, respPartIdx) => {
        if (respPart.blank) {
          let submittedBlank = this.props.submitted[problemIdx].response[respPartIdx].text;
          if (respPart.text === submittedBlank) {
            results[problemIdx].response[respPartIdx].correct = true;
          } else {
            results[problemIdx].response[respPartIdx].correct = false;
          }
        }
      });
    });
    this.setState({ results });
  }

  render() {
    if (this.props.loading) return <div>'Loading...'</div>;
    return (
      <div>
        hello!
        { this.renderResults() }
      </div>
    );
  }

  renderResults() {
    return this.state.results.map( (problem, problemIdx) => {
      return(
        <div key={problemIdx}>
          hi
          <div>{problemIdx+1}. { problem.question }</div>
          {
            problem.response.map( (respPart, respPartIdx) => {
              if (respPart.blank) {
                return (
                  <div key={ respPartIdx } style={ {fontWeight: 'bold'} }>
                    {respPart.text} ---
                    {String(respPart.correct)}
                    {respPart.correct ? '' : this.props.doc.problems[problemIdx].response[respPartIdx].text }
                  </div>
                );
              } else {
                return <div key={ respPartIdx }>{ respPart.text }</div>;
              }
            })
          }
        </div>
      );
    });
  }

  renderResponse() {
    // problem.response.map( (respPart, respPartIdx) => {
    //   if (respPart.blank) {
    //     return (
    //       <div key={ respPartIdx } style={ {fontWeight: 'bold'} }>
    //         {respPart.text} ---
    //         {respPart.correct}
    //       </div>
    //     );
    //   } else {
    //     return <div key={ respPartIdx }>{ respPart.text }</div>;
    //   }
    // });
  }


}

export default createContainer( ({ docId }) => {
  Meteor.subscribe('documents');
  const doc = Documents.findOne(docId);
  return ({
    doc: doc ? doc : {},
    loading: doc ? false : true,
  });
}, DocResults );
