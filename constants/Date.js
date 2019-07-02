import { AsyncStorage } from 'react-native'
import { receiveEntry } from '../actions/index'

export const STORE = 'STORE'

export async function createCard(key, title) {
    let result = await AsyncStorage.getItem(STORE)
    let data = result ? JSON.parse(result) : {}
    let objectCard = createObejctCard()
    objectCard['title'] = title
    data[key] = objectCard
    await AsyncStorage.setItem(STORE, JSON.stringify(data))
    console.log('createCard', data)
    return data
}

export async function getCards(key) {
    return await AsyncStorage.getItem(STORE)
        .then(result => {
            let data = JSON.parse(result)
            return data[key]
        })
}

export async function saveQuestions(key, question, dispatch) {
    return await await AsyncStorage.getItem(STORE)
        .then(json => {
            let data = JSON.parse(json)
            data[key].cards[generateUID()] = { question, ok: false }
            AsyncStorage.setItem(STORE, JSON.stringify(data))
            dispatch(receiveEntry(data))
        })
}

export async function OkQuestion(key, keyQuestion, ok, dispatch) {
    return await await AsyncStorage.getItem(STORE)
        .then(json => {
            let data = JSON.parse(json)
            data[key].cards[keyQuestion]['ok'] = ok
            AsyncStorage.setItem(STORE, JSON.stringify(data))
            dispatch(receiveEntry(data))
        })
}

export async function getAllCards(dispatch) {
    return await AsyncStorage.getItem(STORE)
        .then(result => {
            console.log("getAllCards", result)
            dispatch(receiveEntry(JSON.parse(result)))
        })
}

export async function deleteItem(key, dispatch) {
    return await AsyncStorage.getItem(STORE)
        .then((result) => {
            let obj = JSON.parse(result)
            obj[key] = undefined
            delete obj[key] 
            AsyncStorage.setItem(STORE, JSON.stringify(obj))
            dispatch(receiveEntry(obj))
        })
        .catch(erro => {
            console.log('deleteItem erro', erro)
        })
}

export function createObejctCard() {
    return {
        title: '',
        cards: {}
    }
}

export function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function objectToArray(obj) {
    if (obj === undefined) return []
    let keys = Object.keys(obj)
    let lista = keys.map(key => {
        obj[key]['key'] = key
        return obj[key]
    })
    return lista
}
