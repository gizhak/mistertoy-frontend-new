
import { NavLink, Link } from 'react-router-dom'

export function AppHeader({ }) {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <div className='header-container'>
                    <h1>Mister Toy</h1>
                    <nav className="nav-nav">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About Us</NavLink>
                        <NavLink to="/toy">Toys</NavLink>
                    </nav>

                </div>
            </section>
        </header>
    )
}

