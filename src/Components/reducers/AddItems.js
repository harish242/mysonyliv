const initialState = {
  cartItems: [],
};
export const AddItems = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_ITEM":
//       console.log("Cart Items:", state.cartItems);
//       console.log("Action Payload:", action.payload);
//       const item = state.cartItems.findIndex(
//         (items) => items._id === action.payload._id
//       );
//       console.log('additem/12',item)
//         return { ...state, cartItems: [...state.cartItems, action.payload] };
//     //   return state;

//     default:
//       return state;
//   }
// console.log('addI/19',action.payload)
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
