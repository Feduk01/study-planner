//const clickedTodo = useStore.getState().todos.find(todo => todo.id === item.id)
//expect(clickedTodo.done).should('equal', true)//
import React from 'react';
import { useStore } from '../../data/store';
import Item from './Item';

describe('<Item />', () => {
  const item = {
    id: 1,
    text: 'Test todo',
    done: false,
    late: false,
  };


  it('renders', () => {
    cy.mount(<Item item={item} />);
    cy.get('.item').should('exist');
  });

  

  
});
