
import { useState, useRef, useEffect } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    console.log('filterByToEdit:', filterByToEdit);

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
        console.log('Filtering with:', filterByToEdit);
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { name: fieldName, value, inStock } = target
        console.log('fieldName, value:', fieldName, value, inStock)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [fieldName]: fieldName === 'inStock' ? inStock : value }))
    }


    return (
        <section>
            <h2>Toy Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="labels">Labels</label>
                <input
                    type="text"
                    id="labels"
                    name="labels"
                    value={filterByToEdit.labels}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">In Stock</label>
                <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={filterByToEdit.inStock}
                    onChange={handleChange}
                />
            </form>
        </section>
    )
}

