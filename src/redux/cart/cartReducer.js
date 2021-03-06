import {
  TOGGLE_CART_DROPDOWN,
  ADD_ITEM,
  REMOVE_ITEM,
  DECREASE_ITEM
} from "../types";

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case ADD_ITEM:
      if (state.cartItems.find(item => item.id === action.payload.id)) {
        const newCartItems = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          cartItems: newCartItems
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      };
    case DECREASE_ITEM:
      if (action.payload.quantity === 1) {
        return state;
      }
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity - 1 }
            : item
        )
      };
    default:
      return state;
  }
};

export default cartReducer;
