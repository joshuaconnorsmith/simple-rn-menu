import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import MenuScreen from './src/screens/MenuScreen'
import ShoppingCartScreen from './src/screens/ShoppingCartScreen'
import useCartCounts from './src/hooks/useCart'
import CartContext from './src/context/cartContext'

const Stack = createStackNavigator()

export default function App() {
  const [cartCounts, updateCartCounts] = useCartCounts()

  return (
    <CartContext.Provider
      value={{
        cartCounts,
        updateCartCounts,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MenuScreen" component={MenuScreen} />
          <Stack.Screen name="ShoppingCartScreen" component={ShoppingCartScreen}
            options={{
              gestureEnabled: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  )
}
