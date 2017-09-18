import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import Dustbin from './Dustbin';
import Box from './Box';
import { cloneDeep } from 'lodash';
import { DragDropContext } from 'react-dnd';
import FreeBoxes from './FreeBoxes';
import Container from './Container';

class DnDTest extends Component {
  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
    this.state = {
      items: {
        free: [
          "Glass",
          "Banana"
        ],
        dropped: ["Paper"]
      }
    };
  }

  moveItem(idx, bin) {
    const items = cloneDeep(this.state.items);
    const from  = bin ? "dropped" : "free";
    const to = bin ? "free" : "dropped";
    const movedItem =items[from].splice(idx, 1)[0];
    items[to].push(movedItem);
    this.setState({items});
  }

  render() {

    return (
        <div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <Dustbin>
              { this.state.items.dropped.map( (boxName, idx) => {
                  return <Box key={idx} name={boxName} idx={idx} move={this.moveItem} bin={true}/>;
                })
              }
             </Dustbin>
          </div>
          <FreeBoxes>
            { this.state.items.free.map( (boxName, idx) => {
                return <Box key={idx}name={boxName} idx={idx} move={this.moveItem} bin={false} />;
              })
            }
          </FreeBoxes>
          <br/>
          <Container />
        </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DnDTest);
