const initialState = {
  cartItems: [],
};
export const AddItems = (state = initialState, action) => {
//   console.log("/ai/6", action.payload);
  switch (action.type) {
    case "ADD_ITEM":
      // console.log('hh/8',item)
      console.log("Cart Items:", state.cartItems);
      console.log("Action Payload:", action.payload);

      const item = state.cartItems.findIndex(
        (items) => items._id === action.payload._id
      );
      console.log("Item Index:", item);
      if (item=== -1) {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }
      return state;

    default:
      return state;
  }
};
