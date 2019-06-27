import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class Result extends Component {

    getPercent(cards) {
        let ok = Object.keys(cards).filter(item => {
            return cards[item].ok
        })
        return parseFloat(((ok.length / Object.keys(cards).length) * 100).toFixed(1))
    }
    render() {

        let card = this.props.card
        let percent = this.getPercent(card.cards)
        return (<View style={{
            width: 320,
            height: 380,
            flexDirection: 'column',
            backgroundColor: '#f2f2f2',
            alignItems: 'stretch'
        }}>
            <Text style={[styles.text, { fontSize: 34 }]} > {card.title}</Text>

            <Text style={percent > 50 &&
                [styles.text, { color: '#040', backgroundColor: "#FFF" }]
                || 
                styles.text
            }

            >{percent}%</Text>

            <Text style={styles.text}>Acertos</Text>
        </View>)
    }
}

function mapStateToProps(state) {
    let card = Object.keys(state).shift()
    return { card: state[card] }
}

export default connect(mapStateToProps)(Result)

const styles = StyleSheet.create({
    text: {
        flex: 1,
        width: 320,
        backgroundColor: '#F7004011',
        fontSize: 45,
        textAlign: 'center',
        alignItems: 'center'
    }
})