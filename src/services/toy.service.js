
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

// import Axios from 'axios'
// const axios = Axios.create({
//     withCredentials: true
// })

// const BASE_URL = '/api/toy/'
// const BASE_URL = '//localhost:3030/api/toy/'


const BASE_URL = 'toy/'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
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
    return { txt: '', maxPrice: '', inStock: '' }
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



