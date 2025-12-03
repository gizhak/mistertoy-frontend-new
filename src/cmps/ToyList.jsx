import { ToyPreview } from "./ToyPreview.jsx";



export function ToyList({ toys, onDeleteToy }) {

    return (
        <>
            {/* <h2>Toy List</h2> */}
            <ul className="toy-list">

                {toys.map(toy =>
                    <li className="toy-preview" key={toy._id}>
                        <ToyPreview toy={toy} />

                        <div>
                            <button onClick={() => onDeleteToy(toy._id)}>X</button>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )

}