import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    };
  }

  render(){
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    return (
      <div>
        <div className="container">
          <h1 className="text-center">
            { loggedIn ? 'Welcome, '+currentUser.username : '' }
          </h1>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  username: React.PropTypes.string
}

export default createContainer(({params}) => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, MainPage);
