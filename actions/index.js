export const RECEIVE_CARDS = 'RECEIVE_CARDS'

export function receiveEntry(entries) {
    console.log('receiveEntry')
    return {
        type: RECEIVE_CARDS,
        entries
    }
}