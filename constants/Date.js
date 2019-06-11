import { AsyncStorage } from 'react-native'

export const STORE = 'STORE'

export function timeToString(time = Date.now()) {   
    return new Date(time).toTimeString()   
}

export async function createCard(key, title) {  
    return await AsyncStorage.getItem(STORE)
        .then((result) => {
          // console.log('result', result)
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

export function createObejctCard() {
    return {
        title: '',
        cards: {}
    }
}
