import { useSelector } from "react-redux"; 
const initialState = {
  cartItems: [],
  isToggled:false,
  movie:[],
  shortfilm:[],
  documentary:[],
  trailer:[],
  tvshow:[],
  webseries:[],
  videosong:[],
  usedetails:{}
};
export const AddItems = (state = initialState, action) => {
  // const addedItems = useSelector((state) => state.persisted.AddItems.cartItems);
    // const datat=action.type
     
  switch (action.type) {
    case "ADD_ITEM":return {...state,cartItems:[...action.payload]}
    case 'movie':return {...state,movie:[...action.payload]}
    case 'short film':return {...state,shortfilm:[...action.payload]}
    case 'documentary':return {...state,documentary:[...action.payload]}
    case 'trailer':return {...state,trailer:[...action.payload]}
    case 'tv show':return {...state,tvshow:[...action.payload]}
    case 'web series':return {...state,webseries:[...action.payload]}
    case 'video song':return {...state,videosong:[...action.payload]}
    case 'userdetails':return {...state,usedetails:{...action.payload}}
    case 'NUllIFY_STATE':return initialState
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

