export const RECEIVE_CARDS = 'RECEIVE_CARDS'

export function receiveEntry(entries) {    
    return {
        type: RECEIVE_CARDS,
        entries
    }
}