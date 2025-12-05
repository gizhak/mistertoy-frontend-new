
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

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (filterBy.inStock === undefined) filterBy.inStock = false
            if (!filterBy.labels) filterBy.labels = []

            // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            // if (!filterBy.minSpeed) filterBy.minSpeed = -Infinity
            const regExp = new RegExp(filterBy.txt, 'i')

            return toys.filter(toy =>
                regExp.test(toy.name)
            )
        }).then(toys => {

            if (filterBy.inStock) {
                return toys.filter(toy => toy.inStock)
            }
            return toys
        }).then(toys => {
            if (filterBy.labels && filterBy.labels.length) {
                return toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)))
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
        name: '',
        price: '',
        labels: [],
        inStock: true
    }
}

function getRandomToy() {
    return {
        name: 'toy-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(50, 200),
        labels: ['Doll', 'Battery Powered', 'Baby'],
        inStock: true
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: false, labels: [] }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            { _id: 't101', name: 'Talking Doll', price: 123, labels: ['Doll', 'Battery Powered'], inStock: true },
            { _id: 't102', name: 'Race Car', price: 85, labels: ['On wheels', 'Battery Powered'], inStock: true },
            { _id: 't103', name: 'Building Blocks', price: 45, labels: ['Box game'], inStock: true },
            { _id: 't104', name: 'Baby Mobile', price: 35, labels: ['Baby'], inStock: false },
            { _id: 't105', name: 'Puzzle Game', price: 25, labels: ['Puzzle', 'Box game'], inStock: true },
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


