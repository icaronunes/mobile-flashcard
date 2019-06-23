import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native'
import AddQuestionModal from '../screens/AddQuestionModal'
import { Ionicons } from '@expo/vector-icons';
import { deleteItem, saveQuestions, objectToArray } from '../constants/Date'
import { connect } from 'react-redux'

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

  keyExtractor = (item, index) => item

  delete = async () => {
    let key = this.props.navigation.state.params.key
    this.props.navigation.navigate('ListCardView')
    this.props.handleKey(key)
  }

  addQuestion = () => {
    this.setState(() => ({
      modal: !this.state.modal
    }))
  }

  play = (data) => {
    console.log('play')
    this.props.navigation.navigate('CardSwipe', { card: data })
  }

  saveQuestion = (key, text) => {
    this.props.save(key, text)
    this.addQuestion()
  }

  render() {

    let key = this.props.navigation.state.params.key
    let cards = []
    let title = ''

    if (this.props.cards[key] === undefined) {
      return this.props.navigation.replace('ListCardView')
    }

    if (this.props.cards[key] !== undefined && Object.entries(this.props.cards[key].cards).length === 0) {
      cards = []
    } else {
      title = this.props.cards[key].title
      cards = this.props.cards[key].cards
    }
    // console.log('ARRAY', cards)

    if (this.state.modal) {
      return <AddQuestionModal
        visible={this.state.modal}
        handleModal={this.addQuestion}
        id={key}
        saveQuestion={this.saveQuestion} />
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
          onPress={() => { this.play(this.props.cards[key]) }}
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
            data={Object.keys(cards)}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) =>
              <Text
                maxFontSizeMultiplier={1}
                style={{
                }}>
                Pergunta: {cards[item].question}
              </Text>}
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
      deleteItem(key, dispatch)
    },
    save(key, text) {
      saveQuestions(key, text, dispatch)
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