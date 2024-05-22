import { create } from "zustand";
import { todos } from './data.js'
import { getToday } from "../utils/date.js";


const useStore = create(set => ({
	todos: todos,  // TODO: "todos" är data som du kan använda under utvecklingen - byt ut den mot din egen testdata

	todayName: getToday(),
	// TODO: du behöver en funktion setTodayName för att kunna testa appen med olika veckodagar

	addTodo : (todo) => set(state => {
		const newTodo = {...todo, id: Date.now()}
		return { todos: [...state.todos, newTodo] };
	}),

	removeTodo: (id) => set(state => ({
		todos: state.todos.filter(todo => todo.id !== id)
	})),

	updateTodo: (updatedTodo) => set(state => ({
		todos: state.todos.map(todo => todo.id === updatedTodo.id ? {...updatedTodo} : todo)
	})),
	
	setTodos: (newTodos) => set({ todos: newTodos }),
	
	toggleTodo: id => set(state => {
		return {
			...state,
			todos: state.todos.map(t => {
				if( t.id === id ) {
					return { done: !t.done, ...t }
				} else {
					return t
				}
			})
		}
	}),

	resetTodos: () => set(state => ({ todos: [] })),

	// TODO: lägg till en funktion "setTodos" så att du kan ändra innehållet i store från dina testfiler

}))

export { useStore }
