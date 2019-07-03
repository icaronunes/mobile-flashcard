import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { getPermission } from '../constants/NotificationCards'
import { restart } from '../constants/Date'

class Result extends Component {

    componentDidMount() {
        getPermission()
    }

    restartCards(key) {
        console.log('restartCards', this.props)
        let store = this.props.back(key)
        let navigation = this.props.goBack
        navigation.replace('CardSwipe',
            { key: key, title: navigation.state.params.title})
            console.log('restartCards - Store', store)
    }

    getPercent(cards) {
        let ok = Object.keys(cards).length > 0 && Object.keys(cards).filter(item => {
            return cards[item].ok
        })

        if (ok) {
            return parseFloat(((ok.length / Object.keys(cards).length) * 100).toFixed(1))
        }
        return 0
    }
    render() {

        let key = this.props.data

        let card = this.props.card[key]

        let percent = this.getPercent(card.cards)
        console.log('Result', this.props)
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

            <Button title={'Restart Pontos'} onPress={() =>
                this.restartCards(key)
            } />


        </View>)
    }
}

function mapStateToProps(state) {
    return { card: state }
}

const mapDispatchToProps = dispatch => {
    return {
        back(key) {
            restart(key, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Result)

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

