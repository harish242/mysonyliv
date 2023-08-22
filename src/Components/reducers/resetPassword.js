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
    case 'updatePassword':return {...state,token:action.payload.token}
    case 'namere':return{...state,name:action.payload}
    case 'emailre':return{...state,email:action.payload}
    case 'passwordCurrentre':return{...state,passwordCurrent:action.payload}
    case 'passwordre':return{...state,password:action.payload}
    default: return state
}
}