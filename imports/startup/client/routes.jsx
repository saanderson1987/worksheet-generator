import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

// pages
import SignupPage from '../../ui/pages/SignupPage.jsx';
import LoginPage from '../../ui/pages/LoginPage.jsx';
import DocForm from '../../ui/DocForm.jsx';
import NewDocForm from '../../ui/NewDocForm.jsx';
import DocList from '../../ui/DocList.jsx';
import NavBar from '../../ui/NavBar.jsx';
import MainPage from '../../ui/pages/MainPage.jsx'
import EditDoc from '../../ui/EditDoc.jsx'
import DnDTest from '../../ui/DnDTest/DnDTest.jsx';
import NewDocForm0 from '../../ui/NewDocForm0.jsx';

const renderRoutes = (routeProps) => {
  return (
    <Router>
      <Switch>
        <Public exact path="/signup" component={SignupPage}/>
        <Public exact path="/login" component={LoginPage}/>
        <Authenticated exact path="/" component={MainPage} {...routeProps} />
        <Authenticated exact path="/documents/new" component={NewDocForm} {...routeProps}  />
        <Authenticated exact path="/documents/newOld" component={NewDocForm0} {...routeProps}  />
        <Authenticated exact path="/documents/:_id" component={DocForm} {...routeProps} />
        <Authenticated exact path="/documents/:_id/edit" component={EditDoc} {...routeProps} />
        <Authenticated exact path="/dnd" component={DnDTest} {...routeProps} />
      </Switch>
    </Router>
  );
};

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  return ({
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
}, renderRoutes);

const Authenticated = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (loggingIn) return <div></div>;
    return authenticated ?(
      <div>
        <NavBar />
        { React.createElement(component, { ...props, loggingIn, authenticated }) }
      </div>
    ) :
    (<Redirect to="/login" />);
  }} />
);

const Public = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (loggingIn) return <div></div>;
    return !authenticated ?
    (React.createElement(component, { ...props, loggingIn, authenticated })) :
    (<Redirect to="/" />);
  }} />
);

// export const renderRoutes = () => (
//   <Router>
//     <div>
//       <Route path="/signup" component={SignupPage}/>
//       <Route path="/login" component={LoginPage}/>
//       <Route exact={true} path="/" component={AppContainer}/>
//       <Authenticated exact path="/documents/new" component={NewDocForm}  />
//       <Authenticated exact path="/documents/:_id" component={DocForm} />
//       { isAuthenticated() ?
//         <div>
//           <Route path='/documents/:id'component={DocForm}/>
//           <Route path='/documents/new'component={NewDocForm}/>
//         </div> : ''
//       }
//     </div>
//   </Router>
// );

// const isAuthenticated = () => {
//     return { isAuthenticated: Meteor.userId() !== null };
// };
//
//
// class PrivateRoutes extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = this.isAuthenticated();
//   }
//
//   isAuthenticated() {
//     return { isAuthenticated: Meteor.userId() !== null };
//   }
//
//   render() {
//     // if (this.state.isAuthenticated) {
//     //   return (
//     //     <div>
//     //       <Route exact={true} path="/" component={AppContainer}/>
//     //       <Route path='/exercises' component={ExerciseList}/>
//     //     </div>
//     //   );
//     // } else {
//     //   return (
//     //     <Redirect to={{
//     //         pathname: '/login',
//     //         state: { from: this.props.location }
//     //       }}/>
//     //   );
//     // }
//
//     // <Route path='/exercises/:id/edit'component={EditDocForm}/>
//
//     return (
//       <Route render={props => (
//           this.state.isAuthenticated ? (
//             <div>
//               <Route exact={true} path="/" component={AppContainer}/>
//               <Route path='/documents/:id'component={DocForm}/>
//               <Route path='/documents/new'component={NewDocForm}/>
//             </div>
//           ) : (
//             <Redirect push to='/login'/>
//             )
//           )}/>
//     );
//   }
// }
