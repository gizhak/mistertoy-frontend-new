
import { useState, useRef, useEffect } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))


    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])



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
                    onChange={(ev) =>
                        setFilterByToEdit({
                            ...filterByToEdit,
                            name: ev.target.value,
                        })
                    }
                />

                <label htmlFor="labels">Labels</label>
                <input
                    type="text"
                    id="labels"
                    name="labels"
                    value={filterByToEdit.labels}
                    onChange={(ev) =>
                        setFilterByToEdit({
                            ...filterByToEdit,
                            labels: ev.target.value,
                        })
                    }
                />
                <label htmlFor="inStock">In Stock</label>
                <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={filterByToEdit.inStock}
                    onChange={(ev) =>
                        setFilterByToEdit({
                            ...filterByToEdit,
                            inStock: ev.target.checked,
                        })
                    }
                />
            </form>
        </section>
    )
}

