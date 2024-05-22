import Item from "./Item"
import {useStore} from '../../data/store'
import {useState} from "react"

const Day = ({ day, dayName }) => {
	const addTodo = useStore(state => state.addTodo)
	const [newTodoText, setNewTodoText] = useState('')

	const handleAdd = () => {
		if (newTodoText.trim() === '') return
		const newTodo = {
			day: dayName.slice(0, 2).toLowerCase(),
			done: false,
			late: false,
			text: newTodoText
		}
		addTodo(newTodo)
		setNewTodoText('')
	}
	
	return (
		<div className="day">
			<h2> {dayName} </h2>

			{day.map(item => (
				<Item key={item.id} item={item} />
			))}

			<div className="controls">
			<input
					type="text"
					value={newTodoText}
					onChange={(e) => setNewTodoText(e.target.value)}
					placeholder="Ny uppgift"
				/>
				<button onClick={handleAdd}>Lägg till</button>
			</div>
		</div>

	)
}

export default Day
