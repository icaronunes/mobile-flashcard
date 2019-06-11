import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { getCards } from '../constants/Date'
import ItemCardList from '../screens/ItemCardList'

function ViewCard(props) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{props.title}</Text>
      <Ionicons
        name={props.icon}
        size={60} />
      {props.inicio
        ? <Text style={{ marginTop: 20 }}>Começar Quiz</Text>
        : <Text>{props.size}</Text>
      }
    </TouchableOpacity>
  )
}

class ManagerCard extends PureComponent {

  state = {
    card: ''
  }

  componentDidMount() {

    let key = this.props.navigation.state.params.key
    getCards(key).then(res => {
      this.setState({
        card: res
      })
    })
  }

  render() {
    let { title, cards } = this.state.card
    console.log('title', title, 'cards', cards)
    return (
      <View style={{
        flex: 1,
      }}>
        <ViewCard
          title={title}
          icon={'md-filing'}
          inicio={true}
        />
        <View style={styles.containerAddDelete}>
          <ViewCard
            title={'Adicionar Pergunta'}
            size={20}
            icon={'md-checkmark'} />
          <ViewCard style={styles.container}
            title={'Apagar Baralho'}          
            icon={'md-close-circle'} />
        </View>
        <View>
          <FlatList style={styles.containerList}
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



ManagerCard.navigationOptions = {
  title: 'Gerenciar Baralho',
};

export default ManagerCard;

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