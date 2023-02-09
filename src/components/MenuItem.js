import * as React from 'react'
import { StyleSheet, View, Text, Image, Pressable } from "react-native"

const MenuItem = ({ name, price, onPressItem }) => {

  return (
    <View style={styles.card}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{price}</Text>
        <Pressable
          hitSlop={8}
          style={({ pressed }) => [pressed ? styles.isPressed : styles.isNotPressed ]}
          onPress={onPressItem}
        >
          <Image
            source={require('../../assets/plus-icon.png')}
            style={styles.plusImage}
          />
        </Pressable>
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
  plusImage: {
    width: 28,
    height: 28,
    tintColor: 'black',
  },
  nameText: {
    flexShrink: 1,
  },
  priceText: {
    marginRight: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  isPressed: {
    opacity: 0.6,
  },
  isNotPressed: {
    opacity: 1,
  },
})

export default MenuItem
