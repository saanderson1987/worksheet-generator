import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const boxTarget = {
  drop() {
    return { name: 'FreeBoxes' };
  },
};

class FreeBoxes extends Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
        <div style={{ overflow: 'hidden', clear: 'both', border: '1px solid black' }}>
          {this.props.children}
        </div>
    );
  }
}

export default DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
}))(FreeBoxes);
