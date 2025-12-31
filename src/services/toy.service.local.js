
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'



const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

export const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered']

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const txtRegExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => txtRegExp.test(toy.name))
            }
            if (filterBy.inStock) {
                toys = toys.filter(toy => toy.inStock)
            }
            if (filterBy.labels && filterBy.labels.length) {
                toys = toys.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }
            if (filterBy.sortBy) {
                toys = toys.sort((a, b) => {
                    if (filterBy.sortBy === 'name') {
                        return a.name.localeCompare(b.name)
                    }
                    if (filterBy.sortBy === 'price') {
                        return a.price - b.price
                    }
                    if (filterBy.sortBy === '-price') {
                        return b.price - a.price
                    }
                    return 0

                })
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        // _id: utilService.makeId(),
        name: '',
        price: '',
        labels: [],
        inStock: true,
        imgUrl: '/img/pexels-cody-berg-463684.jpg'
    }
}

function getRandomToy() {
    return {
        _id: utilService.makeId(),
        name: 'toy-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(50, 200),
        labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
            'Outdoor', 'Battery Powered'],
        inStock: true
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: false,
        labels: [],
        sortBy: ''
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            { _id: 't101', name: 'Talking Doll', imgUrl: '/img/pexels-cody-berg-463684.jpg', price: 123, labels: ['Doll', 'Battery Powered'], inStock: true },
            { _id: 't102', name: 'Race Car', imgUrl: '/img/pexels-ingriddietrich-1362595.jpg', price: 85, labels: ['On wheels', 'Battery Powered'], inStock: true },
            { _id: 't103', name: 'Building Blocks', imgUrl: '/img/pexels-inspiredimages-170288.jpg', price: 45, labels: ['Box game'], inStock: true },
            { _id: 't104', name: 'Baby Mobile', imgUrl: '/img/pexels-kovyrina-12211.jpg', price: 35, labels: ['Baby'], inStock: false },
            { _id: 't105', name: 'Puzzle Game', imgUrl: '/img/pexels-mikebirdy-381228.jpg', price: 25, labels: ['Puzzle', 'Box game'], inStock: true },
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


