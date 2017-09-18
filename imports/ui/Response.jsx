import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const responseTarget = {
  drop() {
    return { type: 'response' };
  },

  hover(props, monitor, component) {
    // const dragIndex = monitor.getItem().index;
    const hoverIndex = props.respIdx;
    const problemIdx = props.problemIdx;
    // if (dragIndex === hoverIndex) {
    //   return;
    // }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (hoverClientY < hoverMiddleY) {
      return;
    }

    if (hoverClientY > hoverMiddleY) {
      return;
    }

    props.dropBlank(problemIdx, hoverIndex);

    // monitor.getItem().index = hoverIndex;
  },
};

class Response extends React.Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    return connectDropTarget(
      <div className='response'>
        {this.props.children}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.NEWBLANK, responseTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(Response);
