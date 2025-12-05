
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { Link } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

import { use, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
import { store } from '../store/store.js'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
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


    return (
        <div>
            <main>
                <Link className='toylink' to="/toy/edit">Add Toy</Link>
                {/* <button onClick={onAddToy}>Add Toy</button> */}
                <ToyFilter />
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