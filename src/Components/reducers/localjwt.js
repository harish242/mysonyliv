const initialvalue={
    tokens:''
}
export const localJwtReducer=(state=initialvalue,action)=>{
    switch(action.type){
        // case 'updatepasswords':return {...state,token:action.payload}
        case 'token':return {...state,tokens:action.payload}
        default:return state
    }
}