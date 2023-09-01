const initialState={
    tokens:''
}
export const localJwtReducer=(state=initialState,action)=>{
    switch(action.type){
        // case 'updatepasswords':return {...state,token:action.payload}
        case 'token':return {...state,tokens:action.payload}
        case 'NUllIFY_STATE':return initialState
        
        default:return state
    }
}