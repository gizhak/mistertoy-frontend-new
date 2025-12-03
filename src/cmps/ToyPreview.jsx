import { Link } from "react-router-dom"
import React from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ToyIndex } from "../pages/ToyIndex.jsx"

export function ToyPreview({ toy, onDeleteToy }) {

    console.log('toy in ToyPreview:', onDeleteToy);

    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>🧸</h1>
            <p>Price: <span>${toy.price}</span></p>
            {toy.labels && toy.labels.length > 0 && (
                <p>Labels: <span>{toy.labels.join(', ')}</span></p>
            )}
            <p>{toy.inStock ? '✅ In Stock' : '❌ Out of Stock'}</p>
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}