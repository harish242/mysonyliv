const initialvalue={
    token:''
}
export const localJwtReducer=(state=initialvalue,action)=>{
    switch(action.type){
        case 'updatepasswords':return {...state,token:action.payload}
        default:return state
    }
}