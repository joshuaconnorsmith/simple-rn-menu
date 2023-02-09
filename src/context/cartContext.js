import React from 'react'

const CartContext = React.createContext({ cartCounts: [], updateCartCounts: () => {}})

export default CartContext
