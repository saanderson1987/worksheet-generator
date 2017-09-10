import React, { Component } from 'react';
import { withHistory } from 'react-router-dom';
import MainPage from '../pages/MainPage.jsx';

export default class AppContainer extends Component {
  constructor(props){
    super(props);
    // this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
  }

  logout(e){
    e.preventDefault();
    Meteor.logout( (err) => {
        if (err) {
            console.log( err.reason );
        } else {
            this.props.history.push('/login');
        }
    });
  }

  render(){
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Worksheet Generator</a>
            </div>
            <div className="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" onClick={this.logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <MainPage />
      </div>
    );
  }
}
