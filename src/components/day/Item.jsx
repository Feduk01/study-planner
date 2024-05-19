import {useStore} from '../../data/store'
import { useState } from 'react'

const Item = ({ item }) => {
	let itemClass = ''
	if( item.done ) itemClass += 'done'
	if( item.late ) itemClass += 'due'
	const {removeTodo, updateTodo} = useStore(state => ({removeTodo: state.removeTodo, updateTodo: state.updateTodo}))
	const [text, setText] = useState(item.text)
	const [editMode, setEditmode] = useState(false)
	
	const handleChange = () => { 
		let updatedTodo = {
			...item,
			text: text
		}
		updateTodo(updatedTodo)
		setEditmode(false)
	 }

	 const handleStatusChange = () => {
        let updatedTodo = {
            ...item,
            done: !item.done
        };
        updateTodo(updatedTodo);
    };

	return (
		<>
		{editMode ?(

			<div className="item">
				<input type="checkbox" checked={item.done} onChange={handleStatusChange} />
				<input type="text" className={itemClass} value={text} onChange={(e) => setText(e.target.value)} />
				{/* <span title="Snooza">💤</span> */}
				<span title="Ändra" className='cursor' onClick={handleChange}>💾</span>
				<span title="Ta bort" className='cursor' onClick={() => removeTodo(item.id)}>🗑️</span>
			</div>
			) : (
			<div className="item">
				<input type="checkbox" checked={item.done} onChange={handleStatusChange} />
				<label className={itemClass} onClick={handleChange}>
					{item.text}
				</label>
				{/* <span title="Snooza">💤</span> */}
				<span title="Ändra" className='cursor' onClick={() => setEditmode(true)} >✍️</span>
				<span title="Ta bort" className='cursor' onClick={() => removeTodo(item.id)}>🗑️</span>
			</div>
		)}
		</>
	)
}

export default Item
