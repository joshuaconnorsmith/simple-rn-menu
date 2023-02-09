import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native"
import Palette from '../palette'
import { menuItems } from '../data/menu'
import MenuItem from '../components/MenuItem'
import CartContext from '../context/cartContext'

const MENU_SCREEN_HEADER_TEXT = 'Menu'

const MenuScreen = () => {
  const navigation = useNavigation()
  const { updateCartCounts } = React.useContext(CartContext)
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Palette.main.header,
      },
      headerTitle: MENU_SCREEN_HEADER_TEXT,
      headerRight: () =>
        <Pressable
          hitSlop={8}
          style={({ pressed }) => [styles.headerRight, pressed ? styles.isPressed : styles.isNotPressed ]}
          onPress={onPressCart}
        >
          <Image style={styles.cartIcon} source={require('../../assets/cart-icon.png')} />
        </Pressable>
    })
  }, [navigation])

  const onPressCart = () => navigation.navigate('ShoppingCartScreen')

  const onPressAddItem = (item) => {
    updateCartCounts({ type: 'addItem', payload: { itemId: item.id } })
  }

  const renderItem = ({ item }) => {
    return <MenuItem name={item.name} price={item.price} onPressItem={() => onPressAddItem(item)}/>
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatlist}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.main.background,
  },
  flatlist: {
    paddingBottom: 100,
  },
  separator: {
    marginHorizontal: 8,
    height: 0.5,
    backgroundColor: 'grey',
  },
  headerRight: {
    marginRight: 6,
  },
  cartIcon: {
    tintColor: 'black',
    width: 28,
    height: 28,
  },
  isPressed: {
    opacity: 0.6,
  },
  isNotPressed: {
    opacity: 1,
  },
})

export default MenuScreen
