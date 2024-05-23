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

  beforeEach(() => {
    useStore.setState({
      todos: [item],
      updateTodo: (updatedTodo) => {
        const todos = useStore.getState().todos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
        useStore.setState({ todos });
      },
      removeTodo: (id) => {
        const todos = useStore.getState().todos.filter(todo => todo.id !== id);
        useStore.setState({ todos });
      },
    });
  });

  it('renders', () => {
    cy.mount(<Item item={item} />);
    cy.get('.item').should('exist');
  });

  // it('toggles edit mode and updates text', () => {
  //   cy.mount(<Item item={item} />);
  //   cy.get('.cursor[title="Ändra"]').click();
  //   cy.get('input[type="text"]').should('exist').clear().type('Updated todo');
  //   cy.get('.cursor-save[title="Spara"]').should('exist').click();
  //   cy.get('label').should('contain', 'Updated todo');
  // });

  // it('toggles todo status', () => {
  //   cy.mount(<Item item={item} />);
  //   cy.get('input[type="checkbox"]').check({ force: true });
  //   cy.get('input[type="checkbox"]').should('be.checked');
  // });

  
});
