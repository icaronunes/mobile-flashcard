import React, { PureComponent } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet, AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createCard, timeToString } from '../constants/Date'

class NewCard extends PureComponent {

    state = {
        text: ''
    }

    onPress = async () => {
        if (this.state.text !== '') {
            try {
                let key = timeToString()
                createCard(key, this.state.text).then(() => {
                    console.log('Salvo')
                    this.props.navigation.push('ManagerCard', { key: key})
                })
            } catch (erro) {
                console.log("ERRO", erro)
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ backgroundColor: '#F7004011' }}
                    placeholder="Titulo do novo bralho"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <TouchableOpacity onPress={this.onPress}>
                    <Ionicons style={styles.photo} name='md-add' size={180} color="#07F" />
                </TouchableOpacity>
            </View>
        )
    }
}

NewCard.navigationOptions = {
    title: 'Criar Baralho',
};

export default NewCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 12,
        backgroundColor: '#F7000011',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
