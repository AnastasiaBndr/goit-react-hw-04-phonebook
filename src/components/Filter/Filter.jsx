const Filter = ({ handleFilter }) => {
    return (<input type="text" name="filter" onChange={handleFilter} />)
}

export default Filter;