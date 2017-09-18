import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const boxTarget = {
  drop() {
    return { type: 'box' };
  },
};

class Box extends React.Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    return connectDropTarget(
      <div style={{
        width: '100px',
        height: '100px',
        border: '1px solid black'
      }}>
        {this.props.children}
      </div>
    );
  }

}

export default DropTarget(ItemTypes.NEWBLANK, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(Box);
