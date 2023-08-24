const initialState = {
  cartItems: [],
};
export const AddItems = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
     

    default:
      return state;
  }
var itemIndex = state.cartItems.find(
    (items) => items._id === action.payload._id
  );
  

switch (action.type) {
    case "ADD_ITEM":
      
      if (!itemIndex) {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }
      return state;
  
    default:
      return state;
  }
  
};
