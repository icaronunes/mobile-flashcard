import { AsyncStorage } from 'react-native'

export const STORE = 'STORE'

export async function createCard(key, title) {
    return await AsyncStorage.getItem(STORE)
        .then((result) => {
            let data = result ? JSON.parse(result) : {}
            let objectCard = createObejctCard()
            objectCard['title'] = title
            data[key] = objectCard
            AsyncStorage.setItem(STORE, JSON.stringify(data))
        })
}

export async function getCards(key) {
    return await AsyncStorage.getItem(STORE)
        .then(result => {
            let data = JSON.parse(result)
            return data[key]
        })
}

export async function saveQuestion(key, question) {
    return await getCards(key)
        .then((card) => {
            card.cards[generateUID()] = question
        })
}

export async function getAllCards() {
    return await AsyncStorage.getItem(STORE)
        .then(result => {
            console.log("getAllCards")
            return JSON.parse(result)
        })
}

export async function deleteItem(key) {
    return await AsyncStorage.getItem(STORE)
        .then(result => {
            const obj = JSON.parse(result)
            delete obj[key]
             AsyncStorage.clear().then(() => {
             AsyncStorage.setItem(STORE, JSON.stringify(obj))
            })
            return obj
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
