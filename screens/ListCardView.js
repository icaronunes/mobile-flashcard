import React, { PureComponent } from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import ItemCardList from '../screens/ItemCardList'
import { getAllCards, objectToArray } from '../constants/Date'
import { connect } from 'react-redux'
class ListCardView extends PureComponent {

  keyExtractor = (item, index) => item.key

  state = {
    cards: {}
  }

  componentDidMount() {  
    const { putList } = this.props 
    putList()
  }

  handleClickItem = (key) => {
    this.props.navigation.navigate('ManagerCard', { key: key })
  }

  render() {
    console.log(this.props)
    let cards = this.props.cards
    if (Object.entries(cards).length === 0) {
      cards = []
    } else {
      cards = objectToArray(cards)
    }

    return (
      <FlatList
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
        keyExtractor={this.keyExtractor}
        renderItem={({ item }) => {
          return <TouchableOpacity onPress={() => { this.handleClickItem(item.key) }}>
            <ItemCardList key={item.key} item={item} />
          </TouchableOpacity>
        }} />
    )
  }
}

ListCardView.navigationOptions = {
  title: 'Lista de Cartas',
};

function mapStateToProps(state) { 
  return { cards: state }
}

const mapDispatchToProps = dispatch => {
  return {
    putList() { 
      getAllCards(dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCardView)