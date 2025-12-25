// const Router = ReactRouterDOM.BrowserRouter
// const Router = ReactRouterDOM.HashRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux

// import './App.css'
import './assets/style/main.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyChart } from './cmps/ToyChart.jsx'

// import { UserDetails } from './pages/UserDetails.jsx'
import { Provider } from 'react-redux'
import { MultiSelect } from './cmps/MultiSelect.jsx'


export default function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className='main-layout'>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/Toy" />
              <Route element={<ToyEdit />} path="/Toy/edit" />
              <Route element={<ToyEdit />} path="/Toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/Toy/:toyId" />
              <Route element={<ToyChart />} path="/chart" />
              <Route element={<MultiSelect />} path="/multi-select" />
              {/* <Route element={<UserDetails />} path="/user/:userId" /> */}
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>

  )
}


