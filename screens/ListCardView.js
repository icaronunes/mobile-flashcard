import React, { PureComponent } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import ItemCardList from '../screens/ItemCardList'

export default class ListCardView extends PureComponent {

  render() {
    const itens = [
      { key: 'Devin' },
      { key: 'Jackson' },
      { key: 'James' },
      { key: 'Joel' },
      { key: 'John' },
      { key: 'Jillian' },
      { key: 'Jimmy' },
      { key: 'Julie' }
    ]

    return (     
      <FlatList      
        data={itens}
        renderItem={({ item}) => <ItemCardList item={item}/>}/>
    )
  }
}

ListCardView.navigationOptions = {
  title: 'Lista de Cartas',
};
