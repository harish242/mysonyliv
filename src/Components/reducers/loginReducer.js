const initialValuea={
    email:'',
    password:''
}
const loginReducer=(state=initialValuea,action)=>{
    switch(action.type){
        case 'email':return {...state,email:action.payload}
        case 'password': return {...state,password:action.payload}
        default:return state
    }
}
export default loginReducer