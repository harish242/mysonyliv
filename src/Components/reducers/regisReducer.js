const initialValue={
    name:'',
    email:'',
    password:''
}
export const regisReducer=(state=initialValue,action)=>{
    switch(action.type){
        case 'username':return {...state,name:action.payload}
        case 'email':return {...state,email:action.payload}
        case 'password': return {...state,password:action.payload}
        default:return state
    }
}