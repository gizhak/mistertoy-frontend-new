import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { PopUp } from '../cmps/NicePopup.jsx'
import { Chat } from '../cmps/Chat.jsx'


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { toyId } = useParams()
    const params = useParams()
    console.log('params:', params)
    console.log('toyId from params:', toyId)

    useEffect(() => {
        loadToy()
    }, [toyId])
    console.log('toyId:', toyId)

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Error loading toy:', err)
        }
    }

    // const { name, price, inStock } = toy

    if (!toy) return <div>Loading...</div>

    const { name, price, inStock, imgUrl } = toy


    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <h2 className='image'><img src={imgUrl} alt={name} /></h2>
            <h2>Price: ${toy.price}</h2>
            <h2>Labels: {toy.labels.join(', ')}</h2>
            <h3>{toy.inStock ? '✅ In Stock' : '❌ Out of Stock'}</h3>

            <div className='toy-buttons'>
                <Link to="/Toy">
                    <button>Back to List</button>
                </Link>
                <Link to={`/Toy/edit/${toy._id}`}>
                    <button>Edit</button>
                </Link>

                <section>
                    <button onClick={() => setIsChatOpen(true)}>Chat</button>
                    <PopUp

                        header={<h3>Chat About {toy.name}s</h3>}
                        footer={<h4>&copy; 2025-9999 Toys INC.</h4>}
                        onClose={() => setIsChatOpen(false)}
                        isOpen={isChatOpen}
                    >
                        <Chat />
                    </PopUp>
                </section >
            </div>
        </section>
    )
}