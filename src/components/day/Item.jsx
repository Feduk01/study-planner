import {useStore} from '../../data/store'

const Item = ({ item }) => {
	let itemClass = ''
	if( item.done ) itemClass += 'done'
	if( item.late ) itemClass += 'due'
	const {removeTodo} = useStore(state => ({removeTodo: state.removeTodo}))

	const handleChange = () => { /* TODO */ }

	return (
		<div className="item">
			<input type="checkbox" checked={item.done} onChange={handleChange} />
			<label className={itemClass} onClick={handleChange}>
				{item.text}
			</label>
			{/* <span title="Snooza">💤</span> */}
			<span title="Ändra" className='cursor' >✍️</span>
			<span title="Ta bort" className='cursor' onClick={() => removeTodo(item.id)}>🗑️</span>
		</div>
	)
}

export default Item
