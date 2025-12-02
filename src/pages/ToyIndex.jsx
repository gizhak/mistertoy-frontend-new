
import { ToyList } from '../cmps/ToyList.jsx';


export function ToyIndex() {

    const toys = [
        { _id: 't101', name: 'Talking Doll', price: 123 },
        { _id: 't102', name: 'Race Car', price: 85 },
        { _id: 't103', name: 'Building Blocks', price: 45 }
    ]

    return (
        <div>
            <h1>Toy Index</h1>
            <ToyList toys={toys} />
        </div>
    )
}