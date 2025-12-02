import { toyService } from "../../services/toy.service.js"

//* toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

//* Shopping toy
export const TOGGLE_TOY_IS_SHOWN = 'TOGGLE_TOY_IS_SHOWN'
export const ADD_TOY_TO_TOY = 'ADD_TOY_TO_TOY'
export const REMOVE_TOY_FROM_TOY = 'REMOVE_TOY_FROM_TOY'
export const CLEAR_TOY = 'CLEAR_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    isToyShown: false,
    shoppingToy: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    lastToys: []
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* toys
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lastToys
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }

        //* Shopping toy
        case TOGGLE_TOY_IS_SHOWN:
            return { ...state, isToyShown: !state.isToyShown }

        case ADD_TOY_TO_TOY:
            return {
                ...state,
                shoppingToy: [...state.shoppingToy, action.toy]
            }

        case REMOVE_TOY_FROM_TOY:
            const shoppingToy = state.shoppingToy.filter(toy => toy._id !== action.toyId)
            return { ...state, shoppingToy }


        case CLEAR_TOY:
            return { ...state, shoppingToy: [] }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lastToys]
            }


        default:
            return state
    }
}