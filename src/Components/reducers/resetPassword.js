const initialValue={
    name:'',
    email:'',
    passwordCurrent:'',
    password:'',
    token:'',
    // id:''
}
export const resetPassword=(state=initialValue,action)=>{
switch(action.type){
    case 'updatePassword':return {...state,token:action.payload}
    case 'nameret':return{...state,name:action.payload}
    case 'emailret':return{...state,email:action.payload}
    case 'passwordCurrentret':return{...state,passwordCurrent:action.payload}
    case 'passwordret':return{...state,password:action.payload}
    default: return state
}
}