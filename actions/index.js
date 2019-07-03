export const RECEIVE_CARDS = 'RECEIVE_CARDS'

export function receiveEntry(entries) {    
    console.log('receiveEntry', entries)
    return {
        type: RECEIVE_CARDS,
        entries
    }
}