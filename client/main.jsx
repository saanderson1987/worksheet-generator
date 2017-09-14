import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import RenderRoutes from '../imports/startup/client/routes.jsx';

Meteor.startup(() => {
  render(<RenderRoutes />, document.getElementById('render-target'));
});
