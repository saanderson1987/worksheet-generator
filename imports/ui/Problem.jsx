import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { flow } from 'lodash';


const problemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const problemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveProblem(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

const newProblemTarget = {
  hover(props, monitor, component) {
    // const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // if (dragIndex === hoverIndex) {
    //   return;
    // }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //   return;
    // }

    // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //   return;
    // }

    if (hoverClientY < hoverMiddleY) {
      return;
    }

    if (hoverClientY > hoverMiddleY) {
      return;
    }

    props.addNewProblem(hoverIndex);
    // monitor.getItem().index = hoverIndex;
  },
};

class Problem extends React.Component {
  render(){
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div  style={{border: '1px dotted black', padding: '10px', margin: '4px', opacity}}>
        {this.props.children}
      </div>
    ));
  }
}

export default flow(
  DragSource(ItemTypes.PROBLEM, problemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.PROBLEM, problemTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DropTarget(ItemTypes.NEWPROBLEM, newProblemTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Problem);
