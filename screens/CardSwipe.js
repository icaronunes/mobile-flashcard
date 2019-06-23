import CardStack, { Card } from 'react-native-card-stack-swiper';
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { OkQuestion } from '../constants/Date'

class CardSwipe extends Component {

    setTitle = (title) => {
        navigationOptions = {
            title: title,
        };
    }

    left = () => {
        console.log('left')
        this.props.change(dataKey, key, false)
    }

    right = (dataKey, key) => {
        console.log('right')
        this.props.change(dataKey, key, true)
    }

    render() {

        console.log(this.props)
        let data = this.props.navigation.state.params.card

        this.setTitle(data.title)

        return (
            <View style={{ flex: 1 }}>
                <CardStack style={styles.content} ref={swiper => { this.swiper = swiper }}>
                    {Object.keys(data.cards).map(key => {
                        return <Card style={[styles.card, styles.card1]}
                            key={key}
                            onSwipedLeft={() => this.left(data.key, key, false)}
                            onSwipedRight={() => this.right(data.key, key, true)}>
                            <Text
                                style={styles.label}
                            >{data.cards[key].question}
                            </Text>
                        </Card>
                    })}
                </CardStack>

                <View style={styles.footer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
                            this.swiper.swipeLeft();
                        }}>

                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.orange]} onPress={() => {
                            this.swiper.goBackFromLeft();
                        }}>

                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
                            this.swiper.swipeRight();
                        }}>

                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
}

//  <Image source={require('../assets/images/robot-dev.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
// <Image source={require('../assets/imagens/robot-prod.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
//  <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
// CardSwipe.navigationOptions = {
//     title: 'Swipe',
// };
// <Card style={[styles.card, styles.card1]}><Text style={styles.label}>A</Text></Card>
// <Card style={[styles.card, styles.card2]}><Text style={styles.label}>B</Text></Card>
// <Card style={[styles.card, styles.card1]}><Text style={styles.label}>C</Text></Card>


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return {
        change(dataKey, key, status) {            
            OkQuestion(dataKey, key, status, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSwipe)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: 320,
        height: 470,
        backgroundColor: '#FE474C',
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
    },
    card1: {
        backgroundColor: '#FE474C',
    },
    card2: {
        backgroundColor: '#FEB12C',
    },
    label: {
        lineHeight: 400,
        textAlign: 'center',
        fontSize: 55,
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: 220,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
    orange: {
        width: 55,
        height: 55,
        borderWidth: 6,
        borderColor: 'rgb(246,190,66)',
        borderWidth: 4,
        borderRadius: 55,
        marginTop: -15
    },
    green: {
        width: 75,
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#01df8a',
    },
    red: {
        width: 75,
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#fd267d',
    }
});