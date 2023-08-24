const initialState = {
  cartItems: [],
  filteredItems:[]
};
export const AddItems = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":return {...state,cartItems:[...action.payload]}
    case 'FILTERED_ITEMS':return{...state,filteredItems:[...action.payload]}
     

    default:
      return state;
  }
}

