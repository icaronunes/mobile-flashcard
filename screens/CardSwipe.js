import CardStack, { Card } from 'react-native-card-stack-swiper';
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { OkQuestion } from '../constants/Date'
import Result from '../screens/Result'

class CardSwipe extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor:'white',
            },
        });

    constructor(props) {
        super(props);
        this.swiper = React.createRef();
    }

    left = (dataKey, key) => {
        this.props.change(dataKey, key, false)
    }

    right = (dataKey, key) => {
        this.props.change(dataKey, key, true)
    }

    render() {
        let data = this.props.navigation.state.params.card
        console.log('cardSwipe', data)
        return (
            <View style={{ flex: 1, martinTop: 45 }}>
                <CardStack style={styles.content}
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    verticalSwipe={false}
                    renderNoMoreCards={() => {
                        return <Result data={data.key}/>
                    }}>
                    {Object.keys(data.cards).map(key => {
                        return <Card style={[styles.card, styles.card1]}
                            onSwipedLeft={() => this.left(data.key, key)}
                            onSwipedRight={() => this.right(data.key, key)}
                            key={key}>
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
                            <Image source={require('../assets/images/sad.png')}
                                resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                        </TouchableOpacity>
                        <View style={[styles.button, styles.orange]}>
                            <Image source={require('../assets/images/question.png')}
                                resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                        </View>
                        <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
                            this.swiper.swipeRight();
                        }}>
                            <Image source={require('../assets/images/happy.png')}
                                resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

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
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: 320,
        height: 400,
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
        flex: 1,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent'
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 4
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