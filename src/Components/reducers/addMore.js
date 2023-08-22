const initialState={
    itemDetails:null
}
export const moreDetailsReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ITem': return {...state,itemDetails:action.payload}
        default: return state
    }
}