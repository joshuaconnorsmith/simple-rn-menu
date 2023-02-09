import * as React from 'react'

const useCartCounts = () => {
  const [cartCounts, updateCartCounts] = React.useReducer((state, action) => {
    const { itemId } = action.payload

    const existingItemIndex = state.findIndex((item) => item.itemId === itemId)

    switch (action.type) {
    case 'addItem':
      if (existingItemIndex === -1) {
        return [...state, { itemId, itemCount: 1 }]
      }

      return state.map((item, index) => 
        index === existingItemIndex ? { ...item, itemCount: item.itemCount + 1 } : item)
    case 'removeItem':
      if (existingItemIndex === -1) {
        return state
      }

      if (state[existingItemIndex].itemCount === 1) {
        return state.filter((_item, index) => index !== existingItemIndex)
      }

      return state.map((item, index) => 
        index === existingItemIndex ? { ...item, itemCount: item.itemCount - 1 } : item) 
    default:
      return state
    }
  }, [])

  return [cartCounts, updateCartCounts]
}

export default useCartCounts
