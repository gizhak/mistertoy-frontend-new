
import { useState, useRef, useEffect } from "react"
import { utilService } from "../services/util.service.js"
import { labels } from "../services/toy.service.js"
import { MultiSelect } from "./MultiSelect.jsx"

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
            const selectedOptions = Array.from(target.selectedOptions)
            val = selectedOptions
                .map(option => option.value)
                .filter(value => value !== '')
        }

        console.log('Updating filter field:', field, 'with value:', val);

        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            [field]: val
        }))

    }

    function renderLabelCheckboxes() {
        const { value, checked } = target
        setFilterByToEdit((prevFilter) => {
            const newLabels = checked
                ? [...prevFilter.labels, value]
                : prevFilter.labels.filter(l => l !== value)
            return { ...prevFilter, labels: newLabels }
        })
    }


    return (
        <section>
            <h2>Toy Filter</h2>
            {/* <button onClick={MultiSelect}> MultiSelect</button> */}
            <form >
                <label htmlFor="txt">Name:</label>
                <input className="filter-input"
                    type="text"
                    id="txt"
                    name="txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
                <label htmlFor="labels">Labels</label>
                <select className="filter-select"
                    id="labels"
                    name="labels"
                    value={filterByToEdit.labels}
                    onChange={handleChange}
                    multiple
                    size="5"
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
                    <option value="-price">Price (High to Low) </option>
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

