import { useSelector } from "react-redux"; 
const initialState = {
  cartItems: [],
  // isToggled:false
};
export const AddItems = (state = initialState, action) => {
  // const addedItems = useSelector((state) => state.persisted.AddItems.cartItems);
    // const datat=action.type
     
  switch (action.type) {
    case "ADD_ITEM":return {...state,cartItems:[...action.payload]}
    // case `${datat.data._id}`:return{...state,isToggled:action.payload}

    // case {datat}:return{...state,isToggled:action.payload}
    // case `TOGGLE_${datat.data._id}`:
    //   return { ...state, isToggled: action.payload };
    default:
      if(action.type.startsWith('TOGGLE_')){
         const itemId=action.type.replace('TOGGLE_','')
         if(itemId){
          return {...state,[itemId]:action.payload}
         }
      }
      return state
  }
}

