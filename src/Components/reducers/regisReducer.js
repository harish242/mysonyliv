const initialValue={
    name:'',
    email:'',
    password:''
}
export const regisReducer=(state=initialValue,action)=>{
    switch(action.type){
        case 'usernamegis':return {...state,name:action.payload}
        case 'emailgis':return {...state,email:action.payload}
        case 'passwordgis': return {...state,password:action.payload}
        default:return state
    }
}