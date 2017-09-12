import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// containers
import AppContainer from '../../ui/containers/AppContainer.jsx';

// pages
import SignupPage from '../../ui/pages/SignupPage.jsx';
import LoginPage from '../../ui/pages/LoginPage.jsx';
import DocForm from '../../ui/DocForm.jsx';
import NewDocForm from '../../ui/NewDocForm.jsx';
import DocList from '../../ui/DocList.jsx';

export const renderRoutes = () => (
  <Router>
    <div>
      <Route path="/signup" component={SignupPage}/>
      <Route path="/login" component={LoginPage}/>
      <Route exact={true} path="/" component={AppContainer}/>
      <Authenticated exact path="/documents/new" component={NewDocForm}  />
      <Authenticated exact path="/documents/:_id" component={DocForm} />
      { isAuthenticated() ?
        <div>
          <Route path='/documents/:id'component={DocForm}/>
          <Route path='/documents/new'component={NewDocForm}/>
        </div> : ''
      }
    </div>
  </Router>
);

const isAuthenticated = () => {
    return { isAuthenticated: Meteor.userId() !== null };
};


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

    // <Route path='/exercises/:id/edit'component={EditDocForm}/>

    return (
      <Route render={props => (
          this.state.isAuthenticated ? (
            <div>
              <Route exact={true} path="/" component={AppContainer}/>
              <Route path='/documents/:id'component={DocForm}/>
              <Route path='/documents/new'component={NewDocForm}/>
            </div>
          ) : (
            <Redirect push to='/login'/>
            )
          )}/>
    );
  }
}

const Authenticated = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (loggingIn) return <div></div>;
    return authenticated ?
    (React.createElement(component, { ...props, loggingIn, authenticated })) :
    (<Redirect to="/login" />);
  }} />
);
