function FilterButton({filter, option, setFilter}) {
    const style = `filter-button ${filter === option && 'active'}`
    return <button className={style} onClick={() => setFilter(option)}>{option}</button>
}

export default FilterButton
