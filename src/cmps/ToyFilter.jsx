
import { useState, useRef, useEffect } from "react"
import { utilService } from "../services/util.service.js"
import { labels } from "../services/toy.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilter = useRef(utilService.debounce(onSetFilter, 500)).current


    // console.log('filterByToEdit:', filterByToEdit);

    useEffect(() => {
        debouncedSetFilter(filterByToEdit)
        console.log('Filtering with:', filterByToEdit);
    }, [filterByToEdit])


    function handleChange({ target }) {
        const { value, name: field, type } = target
        let val = type === 'checkbox' ? target.checked : value

        if (field === 'labels') {
            val = value ? [value] : []
        }

        console.log('Updating filter field:', field, 'with value:', val);

        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            [field]: val
        }))

    }


    return (
        <section>
            <h2>Toy Filter</h2>
            <form >
                <label htmlFor="txt">Name:</label>
                <input
                    type="text"
                    id="txt"
                    name="txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
                <label htmlFor="labels">Labels</label>
                <select
                    id="labels"
                    name="labels"
                    value={filterByToEdit.labels[0] || ''}
                    onChange={handleChange}
                >
                    <option value="">All Labels</option>
                    {labels.map((label) => (
                        <option
                            key={label}
                            value={label}
                        >
                            {label}
                        </option>
                    ))}
                </select>
                <label htmlFor="sortBy">Sort By:</label>
                <select
                    id="sortBy"
                    name="sortBy"
                    value={filterByToEdit.sortBy}
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    <option value="name">Name</option>
                    <option value="price">Price (Low to High) </option>
                    <option value="price">Price (High to Low) </option>
                </select>
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

