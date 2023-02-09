import * as React from 'react'
import { StyleSheet, View, Text, Image, Pressable } from "react-native"

const CartItem = ({ name, price, itemCount, totalPrice, onPressIncrement, onPressDecrement }) => {

  return (
    <View style={styles.card}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.totalContainer}>
        <View style={styles.sumContainer}>
          <Text>{`$${price} x`}</Text>
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [pressed ? styles.isPressed : styles.isNotPressed ]}
            onPress={onPressDecrement}
          >
            <Image
              source={require('../../assets/minus-icon.png')}
              style={styles.icon}
            />
          </Pressable>
          <Text>{itemCount}</Text>
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [pressed ? styles.isPressed : styles.isNotPressed ]}
            onPress={onPressIncrement}
          >
            <Image
              source={require('../../assets/plus-icon.png')}
              style={styles.icon}
            />
          </Pressable>
          <Text>=</Text>
        </View>
        <Text style={styles.priceTotalText}>{`$${totalPrice.toFixed(2)}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
  nameText: {
    flexShrink: 1,
  },
  priceTotalText: {
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  sumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  isPressed: {
    opacity: 0.6,
  },
  isNotPressed: {
    opacity: 1,
  },
})

export default CartItem
