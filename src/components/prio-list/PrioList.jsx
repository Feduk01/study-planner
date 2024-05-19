import PrioItem from "./PrioItem"
import { useStore } from '../../data/store.js'
import { useState } from "react"


const PrioList = () => {
	const todos = useStore(state => state.todos)
	const [searchTodo, setSearchTodo] = useState('');

	const filteredItems = todos.filter(t => !t.done && t.text.toLowerCase().includes(searchTodo.toLowerCase()))

	return (
		<div className="prio-list">
			<h2> Vad ska jag göra nu? </h2>
			<div className="list-container">
				<input type="search" placeholder="Filtrera uppgifter" value={searchTodo} onChange={(e) => setSearchTodo(e.target.value)}/>

				<div className="prio-items">
					{filteredItems.map((item, index) => (
						<PrioItem key={item.id} item={item} num={index+1} />
					))}
				</div>

			</div>
		</div>
	)
}
export default PrioList
