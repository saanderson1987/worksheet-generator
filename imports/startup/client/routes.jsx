
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// containers
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ExerciseList from '../../ui/ExerciseList.jsx';

// pages
import SignupPage from '../../ui/pages/SignupPage.jsx';
import LoginPage from '../../ui/pages/LoginPage.jsx';

export const renderRoutes = () => (
  <Router>
    <div>
      <Route path="/signup" component={SignupPage}/>
      <Route path="/login" component={LoginPage}/>
      <PrivateRoutes />
    </div>
  </Router>
);


class PrivateRoutes extends React.Component {
  constructor(props){
    super(props);
    this.state = this.isAuthenticated();
  }

  isAuthenticated() {
    return { isAuthenticated: Meteor.userId() !== null };
  }

  render() {
    // if (this.state.isAuthenticated) {
    //   return (
    //     <div>
    //       <Route exact={true} path="/" component={AppContainer}/>
    //       <Route path='/exercises' component={ExerciseList}/>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <Redirect to={{
    //         pathname: '/login',
    //         state: { from: this.props.location }
    //       }}/>
    //   );
    // }
    return (
      <Route render={props => (
          this.state.isAuthenticated ? (
            <div>
              <Route exact={true} path="/" component={AppContainer}/>
              <Route path='/exercises' component={ExerciseList}/>
            </div>
          ) : (
            <Redirect push to='/login'/>
            )
          )}/>
    );
  }
}
