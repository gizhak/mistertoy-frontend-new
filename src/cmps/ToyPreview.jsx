import { Link } from "react-router-dom"
import React from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ToyIndex } from "../pages/ToyIndex.jsx"
import { removeToyOptimistic } from "../store/actions/toy.actions.js"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service.js"

import { useSelector } from "react-redux"
import { store } from "../store/store.js"


export function ToyPreview({ toy, onDeleteToy, onEditToy }) {

    // console.log('toy in ToyPreview:', onDeleteToy);
    // console.log('toy in ToyPreview:', toy);
    const navigate = useNavigate()

    const loginUser = useSelector(storeState => {
        console.log('storeState:', storeState)
        return storeState.userModule.loggedInUser
    })


    function isLoginUser() {
        if (!loginUser) return false
        if (loginUser.isAdmin) return true
        if (toy.owner._id === loginUser._id) return true
        return false
    }


    return (
        <article>
            <section>
                <div>
                    <Link
                        to={isLoginUser() ? `/toy/${toy._id}` : '#'}
                    >
                        <h4>{toy.name}</h4>
                        <h1><img src={toy.imgUrl} /></h1>
                        <p>Price: <span>${toy.price}</span></p>
                        {toy.labels && toy.labels.length > 0 && (
                            <p>Labels: <span>{toy.labels}</span></p>
                        )}
                        <p>{toy.inStock ? '✅ In Stock' : '❌ Out of Stock'}</p>
                        <hr />
                    </Link>
                </div>
            </section>
            {isLoginUser() &&
                <div>
                    <button onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button> &nbsp; | &nbsp;
                    <button onClick={() => onDeleteToy(toy._id)}>Delete</button>
                </div>
            }
            {/* <Link to={`/toy/${toy._id}`}>Details</Link> */}
        </article>
    )
}


// export function isLoginUser(loginUser, toy) {
//     if (!loginUser) return false
//     if (loginUser.isAdmin) return true
//     if (toy.owner._id === loginUser._id) return true
//     return false
// }


// <article>
//     <h4>{toy.name}</h4>
//     <h1>🧸</h1>
//     <p>Price: <span>${toy.price}</span></p>
//     {toy.labels && toy.labels.length > 0 && (
//         <p>Labels: <span>{toy.labels.join(', ')}</span></p>
//     )}
//     <p>{toy.inStock ? '✅ In Stock' : '❌ Out of Stock'}</p>
//     <hr />
//     <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
//     <Link to={`/toy/${toy._id}`}>Details</Link>
// </article>