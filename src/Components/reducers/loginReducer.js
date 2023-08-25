const initialValuea={
    email:'',
    password:'',
    tokens:''
}
const loginReducer=(state=initialValuea,action)=>{
    switch(action.type){
        case 'token':return {...state,tokens:action.payload}
        case 'email':return {...state,email:action.payload}
        case 'password': return {...state,password:action.payload}
        default:return state
    }
}
export default loginReducer