
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { Link } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

import { use, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { store } from '../store/store.js'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { PopUp } from '../cmps/NicePopup.jsx'


export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

    // console.log('toys in ToyIndex:', toys);

    useEffect(() => {
        loadToys()
            .catch((err) => {
                showErrorMsg('Cannot load toys')
            })
        // setFilterBy()
    }, [filterBy])

    function onDeleteToy(toyId) {
        console.log('Deleting toy with id:', toyId)
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy deleted')
            })
            .catch((err) => {
                showErrorMsg('Cannot delete toy')
            })
    }

    function onAddToy() {
        const toyToAdd = toyService.getEmptyToy()
        saveToy(toyToAdd)
            .then(() => {
                showSuccessMsg('Toy added')
            })
            .catch((err) => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onSetFilter(filterBy) {
        console.log('New filter received in ToyIndex:', filterBy);
        setFilterBy(filterBy)
    }

    return (
        <div>
            <main>
                <Link className='toylink' to="/toy/edit">Add Toy</Link>
                {/* <button onClick={onAddToy}>Add Toy</button> */}
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <section className="toy-index">
                    {/* <h1>Toy Index</h1> */}
                    <ToyList
                        toys={toys}
                        onDeleteToy={onDeleteToy}
                    />
                </section>
            </main>
        </div>
    )
}