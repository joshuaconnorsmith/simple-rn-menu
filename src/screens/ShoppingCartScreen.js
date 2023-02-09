import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, View, FlatList, Image, Text } from "react-native"
import Palette from '../palette'
import CartContext from '../context/cartContext'
import { menuItems } from '../data/menu'
import CartItem from '../components/CartItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SHOPPING_CART_SCREEN_HEADER_TEXT = 'Shopping Cart'

const ShoppingCartScreen = () => {
  const navigation = useNavigation()
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Palette.modal.header,
      },
      headerTitle: SHOPPING_CART_SCREEN_HEADER_TEXT,
      headerBackImage: () => (
        <Image
          source={require('../../assets/close-icon.png')}
          style={styles.closeImage}
        />
      ),
      headerBackTitleVisible: false,
      headerShadowVisible: false,
    })
  }, [navigation])

  const safeAreaInsets = useSafeAreaInsets()

  const bottomInset = React.useMemo(() => {
    const additionalInset = safeAreaInsets.bottom ? 0 : 24
    return safeAreaInsets.bottom + additionalInset
  }, [safeAreaInsets.bottom])

  const { cartCounts, updateCartCounts } = React.useContext(CartContext)

  const shoppingCartData = React.useMemo(() => cartCounts.reduce((acc, cartCountItem) => {
    const itemFromMenu = menuItems.find((menuItem) => menuItem.id === cartCountItem.itemId) 

    acc.push({
      id: cartCountItem.itemId,
      name: itemFromMenu.name,
      price: itemFromMenu.price,
      amount: cartCountItem.itemCount,
      totalPrice: itemFromMenu.price * cartCountItem.itemCount
    })
    return acc
  }, []), [cartCounts])

  const totalCartPrice = React.useMemo(() => shoppingCartData.reduce((acc, cartItem) => {
    acc += cartItem.totalPrice
    return acc
  }, 0), [shoppingCartData])

  const incrementItem = (item) => {
    updateCartCounts({ type: 'addItem', payload: { itemId: item.id } })
  }

  const decrementItem = (item) => {
    updateCartCounts({ type: 'removeItem', payload: { itemId: item.id } })
  }

  const renderItem = ({ item }) => {
    return <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      itemCount={item.amount}
      totalPrice={item.totalPrice}
      onPressIncrement={() => incrementItem(item)}
      onPressDecrement={() => decrementItem(item)}
    />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={shoppingCartData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatlist}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.footer}>
        <Text style={[styles.footerText, { bottom: bottomInset }]}>{`Total: $${totalCartPrice.toFixed(2)}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  closeImage: {
    height: 28,
    width: 28,
    marginLeft: 6,
    tintColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: Palette.modal.background,
  },
  flatlist: {
    paddingBottom: 100,
  },
  separator: {
    marginHorizontal: 8,
    height: 0.5,
    backgroundColor: 'grey',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    textAlign: 'center',
  },
})

export default ShoppingCartScreen
