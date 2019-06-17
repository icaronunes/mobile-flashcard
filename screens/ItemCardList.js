import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

class ItemCardList extends Component {

  render() {
    let { item } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{item.title}</Text>
        <View>
          <Text style={styles.numberCard}>{item.cards && Object.entries(item.cards).length}</Text>
          <Ionicons style={styles.photo} name='md-card' size={140} color="#07F" />
        </View>
        <Text>...</Text>
      </View>
    )
  }
}

ItemCardList.navigationOptions = {
  title: 'Gerenciar Baralho',
};

export default ItemCardList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#F7000005',
    margin: 4
  },
  text: {
    fontSize: 24,
  },
  numberCard: {
    fontSize: 10,

  },
  photo: {
    borderRadius: 20,
    margin: 0
  },
});

