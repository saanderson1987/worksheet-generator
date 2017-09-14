import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { merge } from 'lodash';
import DocForm from '../DocForm.jsx';
import NewDocForm from '../NewDocForm.jsx';
import DocList from '../DocList.jsx';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.selectDoc = this.selectDoc.bind(this);
    this.state = {
      username: '',
      selectedDoc: ''
    };
  }

  selectDoc(selectedDoc) {
    return (event) => {
      event.preventDefault();
      this.setState({ selectedDoc });
    };
  }

  render(){
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    let obj = {
      "owner": "saanderson1987@gmail.com",
      "permittedUsers": [],
      "type": "fill-in-blank",
      "docName" : "WS1",
      "problems" : [
        {
          "question" : "Comment tu t'appelles?",
          "response" : [
            {
              "text" : "Je m'appelle",
              "blank" : true
            },
            {
              "text" : "Michel.",
              "blank" : false
            }
          ]
        }
      ],
      "createdAt" : new Date()
    };
    let addObj = {
        "exName": "WS!",
        "problems" : [
          {
            "question" : "Comment tu t'appelles?",
            "response" : [
              {
                "text" : "Je m'appelle",
                "blank" : true
              },
              {
                "text" : "Michel.",
                "blank" : false
              }
            ]
          },
          {
            "question" : "Comment ca va?",
            "response" : [
              {
                "text" : "Ca va",
                "blank" : true
              },
              {
                "text" : "bien.",
                "blank" : false
              }
            ]
          }
        ],
    };
    let newObj = merge({}, obj, addObj);
    return (
      <div>
        <div className="container">
          <h1 className="text-center">
            { loggedIn ? 'Welcome, '+currentUser.username : '' }
          </h1>
        </div>
        <div>
          <DocList selectDoc={ this.selectDoc }/>
          <Link to='/documents/new'><h3>Create New Document</h3></Link>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  username: React.PropTypes.string
};

export default createContainer(({params}) => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, MainPage);
