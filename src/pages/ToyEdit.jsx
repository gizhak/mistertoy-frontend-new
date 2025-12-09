
import { toyService } from "../services/toy.service.js"
import { use, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { saveToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function ToyEdit() {

    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const param = useParams()
    console.log('param:', param)

    const state = useState(toyService.getEmptyToy())
    console.log('state:', state)



    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Error loading toy:', err)
                navigate('/Toy')
            })
    }

    // function handleChange({ target }) {
    //     let { name: fieldName, value, inStock } = target
    //     console.log('fieldName, value:', fieldName, value, inStock)
    //     setToyToEdit((prevToy) => ({ ...prevToy, [fieldName]: value, inStock: !prevToy.inStock }))

    // }

    function handleChange({ target }) {
        let { value, type, name: field, inStock, labels, imgUrl } = target
        console.log('field, value:', field, value, inStock, labels, imgUrl)
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({
            ...prevToy, [field]: value,
            inStock: field === 'inStock' ? !prevToy.inStock : prevToy.inStock,
            labels: field === 'labels' ? value.split(',').map(label => label.trim()) : prevToy.labels,
            // imgUrl: field === 'imgUrl' ? value.trim() : prevToy.imgUrl
        }))
        // setHasUnsavedChanges(true)
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.name) toyToEdit.name = 'Unnamed Toy'
        if (!toyToEdit.price) toyToEdit.price = 0
        // console.log('Saving toy:', toyToEdit)
        saveToy(toyToEdit)
            // console.log('Toy saved:', toyToEdit)
            .then(() => {
                showSuccessMsg('Toy saved successfully!')
                console.log('Toy saved:', toyToEdit)
                navigate('/Toy')
            })
            .catch(err => {
                console.log('Error saving toy:', err)
                showErrorMsg('Cannot save toy!')
            })
    }

    return (
        <section className="toy-edit">
            {/* <h1>Toy Edit Page</h1> */}
            {/* <h2>name: {toyToEdit.name}</h2> */}
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>
                <section className="edit-container">
                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        id="name"
                        name="name"
                        value={toyToEdit.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="price">Price:</label>
                    <input type="number"
                        id="price"
                        name="price"
                        value={toyToEdit.price}
                        onChange={handleChange}
                    />
                    <label htmlFor="labels">Labels:</label>
                    <input type="text"
                        id="labels"
                        name="labels"
                        value={toyToEdit.labels}
                        onChange={handleChange}
                    />
                    <label htmlFor="imgUrl" src="/img/pexels-cody-berg-463684.jpg">Image URL:</label>
                    {/* <input type="text"
                        id="imgUrl"
                        name="imgUrl"
                        value={toyToEdit.imgUrl}
                        src="/img/pexels-cody-berg-463684.jpg"
                    /> */}
                </section>
                <div className="label-container">
                    <label className="label-inStock" htmlFor="inStock">In Stock:</label>
                    <input className="inStock" type="checkbox"
                        id="inStock"
                        name="inStock"
                        checked={toyToEdit.inStock}
                        onChange={handleChange}
                    />
                </div>
                <section>
                    <div className="checked">{toyToEdit.inStock ? '✅ In Stock' : '❌ Out of Stock'}</div>
                </section>

                <div>
                    <button >{toyToEdit._id ? 'Save' : 'Add'} </button>
                    <button onClick={() => navigate('/Toy')}>Back</button>
                </div>
            </form>
        </section>
    )
}