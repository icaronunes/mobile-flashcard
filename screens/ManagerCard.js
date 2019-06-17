import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native'
import AddQuestionModal from '../screens/AddQuestionModal'
import { Ionicons } from '@expo/vector-icons';
import { deleteItem } from '../constants/Date'
import { connect } from 'react-redux'
import { receiveEntry } from '../actions/index'

function ViewCard(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text>{props.title}</Text>
      <Ionicons
        name={props.icon.icon}
        size={props.size}
        color={props.icon.cor}
      />
      {props.inicio
        ? <Text style={{ marginTop: 20 }}>Começar Quiz</Text>
        : <Text>{props.length ? props.length : ""}</Text>
      }
    </TouchableOpacity>
  )
}
class ManagerCard extends PureComponent {

  state = {
    card: '',
    modal: false,
  }

  delete = async () => {
    let key = this.props.navigation.state.params.key
    this.props.handleKey(key)
    this.props.navigation.navigate('ListCardView')
  }

  addQuestion = () => {
    this.setState(() => ({
      modal: !this.state.modal
    }))
  }

  play = () => {
    console.log('play')
  }

  handleModal = () => {
    this.setState(() => ({
      modal: !this.state.modal
    }))
  }

  saveQuestion = () => {

  }

  render() {

    let key = this.props.navigation.state.params.key
    let { cards, title } = this.props.cards[key]

    if (cards !== undefined && Object.entries(cards).length === 0) {
      cards = []
    } else {
      cards = {}
    }

    if (this.state.modal) {
      return <AddQuestionModal visible={this.state.modal} handleModal={this.handleModal} id={key} />
    }

    return (
      <View style={{
        flex: 1,
      }}>
        <ViewCard
          title={title}
          icon={{ icon: 'md-filing', cor: '#005' }}
          size={55}
          inicio={true}
          onPress={this.play}
        />
        <View style={styles.containerAddDelete}>
          <ViewCard
            title={'Adicionar Pergunta'}
            size={50}
            length={Object.entries(cards).length}
            icon={{ icon: 'md-checkmark', cor: '#070' }}
            onPress={this.addQuestion}
          />
          <ViewCard style={styles.container}
            title={'Apagar Baralho'}
            size={50}
            icon={{ icon: 'md-close-circle', cor: '#700' }}
            onPress={this.delete}
          />
        </View>
        <View>
          <FlatList style={styles.containerList}
            ListEmptyComponent={<View style={{
              height: 200,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text>
                Sem perguntas ainda...
                </Text>
            </View>}
            data={cards}
            renderItem={({ item }) => <Text
              key={item.key}
              maxFontSizeMultiplier={1}
              style={{
              }} >Pergunta: {item.key}</Text>}
          />
        </View>
      </View>
    )
  }
}

function mapStatetoProps(state) {

  return {
    cards: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleKey(key) {
      deleteItem(key)
        .then((obj) => {
          console.log('delete mapDispatchToProps', obj)
          dispatch(receiveEntry(obj))
        })
        .catch(erro => {
          console.log('delete', erro)
        })
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ManagerCard)

const styles = StyleSheet.create({
  container: {
    margin: 4,
    backgroundColor: '#F7004011',
    flex: 1,
    alignItems: 'center'
  },
  containerAddDelete: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerList: {
    margin: 4,
    height: 200
  }
})