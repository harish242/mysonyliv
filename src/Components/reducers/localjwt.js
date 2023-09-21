const initialState={
    tokens:'',
    payment:true
}
export const localJwtReducer=(state=initialState,action)=>{
    switch(action.type){
        // case 'updatepasswords':return {...state,token:action.payload}
        case 'token':return {...state,tokens:action.payload}
        case 'successpayment': return {...state,payment:action.payload}
        case 'NUllIFY_STATE':return initialState
        
        default:return state
    }
}