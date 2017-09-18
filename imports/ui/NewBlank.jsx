import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { flow } from 'lodash';

const newBlankSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      type: 'blank'
    };
  },

  // endDrag(props, monitor) {
  //   const item = monitor.getItem();
  //   const dropResult = monitor.getDropResult();
  //   if (dropResult) {
  //     props.drop(item.type, dropResult.type);
  //   }
  // }
};


class NewBlank extends React.Component {
  render(){
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div style={{margin: '5px', cursor: 'move'}}>
        <input
          className='new-form-answer-input'
          disabled
          placeholder='New blank'
        />
      </div>
    );
  }
}

export default DragSource(ItemTypes.NEWBLANK, newBlankSource,
  (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(NewBlank);
