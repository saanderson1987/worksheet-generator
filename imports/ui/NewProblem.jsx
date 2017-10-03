import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Problem  from './Problem.jsx';

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
      <div>
        <Problem >
          1. <input disabled placeholder='New Problem' />
          <div><input disabled placeholder='Response' className='new-form-response-input' /></div>
        </Problem>
      </div>
    );
  }
}

export default DragSource(ItemTypes.NEWPROBLEM, newProblemSource,
  (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(NewProblem);
