import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';

const style = {
  width: 400,
};

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: [{
        id: 1,
        text: 'abc',
      }, {
        id: 2,
        text: 'def',
      }, {
        id: 3,
        text: 'jkl',
      }, {
        id: 4,
        text: 'mno',
      }, {
        id: 5,
        text: 'pqr',
      }, {
        id: 6,
        text: 'stu',
      }, {
        id: 7,
        text: 'vwx',
      }],
    };
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
  }

  render() {
    const { cards } = this.state;

    return (
      <div style={style}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={this.moveCard}
          />
        ))}
      </div>
    );
  }
}

// export default DragDropContext(HTML5Backend)(Container);
