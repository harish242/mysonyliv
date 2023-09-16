import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
export const LogOut=()=>{
  const tokenNull=useSelector(state=>state.persisted.localJwtReducer.tokens)
  console.log(tokenNull)
  const dispatch=useDispatch()
  dispatch({type:'token',payload:null})
  return <div>LogOut</div>
}
export const logout=()=>{
  return 21
}