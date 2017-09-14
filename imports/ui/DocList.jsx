import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Exercises } from '../api/exercises.js';
import { Documents, UserDocuments } from '../api/documents.js';
import { Link } from 'react-router-dom';
import EditDoc from './EditDoc.jsx';



class DocList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const documents = this.props.documents ? this.props.documents.map( (doc, idx) => {
      return (
        <li key={ idx }>
          <Link to={`documents/${doc._id}`}>{ doc.docName }</Link>
          <Link to={`documents/${doc._id}/edit`}>    Edit</Link>
        </li>
      );
    }) : '';
    const myDocuments = this.props.myDocuments ? this.props.myDocuments.map( (doc, idx) => {
      return <li key={ idx }><a onClick={ this.props.selectDoc(doc._id) }>{ doc.docName }</a></li>;
    }) : '';
    return (
      <div>
        <h3>All Documents:</h3>
        <ul>
          {documents}
        </ul>
        <h3>My Documents:</h3>
        <ul>
          { myDocuments }
        </ul>
        Props: {JSON.stringify(this.props)}
      </div>
    );
  }

}

export default createContainer(() => {
  Meteor.subscribe('documents');
  return ({
    documents: Documents.find({}).fetch(),
    myDocuments: Meteor.userId() ? Documents.find( {owner: Meteor.userId()} ).fetch() : []
  });
}, DocList);
