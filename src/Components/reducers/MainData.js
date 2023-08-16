// import { ActionDetails } from "../react-redux/action"


const initialState={
    showdata:null
}
// export const mainDataReducer=(state=initialState,action)=>{
//      switch (action.type){
//         case 'SUCCESS':return {...state,showdata:action.payload}
//         default:return state
//      }
// }
export const mainDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SUCCESS':
        return {
          ...state,
          showdata: action.payload,
          error: null,
        }
        default:return state
    }
    
}