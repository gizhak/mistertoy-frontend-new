
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <div className='header-container'>
                <h1>Mister Toy</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                </nav>
            </div>
        </header>
    )
}

