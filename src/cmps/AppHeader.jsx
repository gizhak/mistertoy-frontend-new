
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
// import { onLogout } from '../store/actions/user.actions.js'

export function AppHeader({ }) {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }


    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Mister Toy</h1>
                <nav className="nav-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/chart">Toy Chart</NavLink>
                    <NavLink to="/multi-select">Multi Select</NavLink>
                </nav>
            </section>

            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </header>
    )
}

