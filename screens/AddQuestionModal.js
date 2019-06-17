import React, { PureComponent } from 'react'
import { Modal, View, Text, TextInput, TouchableHighlight } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { saveQuestion } from '../constants/Date'

export default class AddQuestionModal extends PureComponent {

    state = {
        question: ''
    }

    render() {
        return (<Modal
            animationType="slide"
            transparent={false}
            visible={this.props.visible}
            onRequestClose={() => {
                console.log("Close")
                this.props.handleModal()
            }} >
            <View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F7004011',
                }}>
                    <Ionicons
                        name='md-happy'
                        size={100}
                        color={'#3F0'}
                    />
                    <Text>Crie sua pergunta...</Text>
                    <TextInput
                        multiline={true}
                        style={{ backgroundColor: '#F7004011', width: 300, marginTop: 15 }}
                        placeholder="Pergunta..."
                        onChangeText={(question) => this.setState({ question })}
                        value={this.state.question}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <TouchableHighlight style={{
                            flex: 1
                        }}
                            onPress={() => {
                                saveQuestion(this.props.id, this.state.question)
                                console.log(this.props)
                                this.props.handleModal();
                            }}>
                            <Text>Salvar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{
                            flex: 1
                        }}
                            onPress={() => {
                                this.props.handleModal();
                            }}>
                            <Text >Cancelar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>)
    }
}
