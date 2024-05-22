
const PrioItem = ({ item = {}, num, dataCy }) => {
	let itemClass = 'item'
	if( item.late ) itemClass += ' due'

	return (
		<div className={itemClass} data-cy={dataCy} >
			{num}. {item.text}
		</div>
	)
}
export default PrioItem
