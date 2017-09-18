import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';


const newProblemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

class NewProblem extends React.Component {
  render(){
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div></div>
    );
  }
}

export default DragSource(ItemTypes.NEWPROBLEM, newProblemSource,
  (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(NewProblem);
