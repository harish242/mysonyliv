// import { useSelector } from 'react-redux';
import { useEffect } from "react"
import { useDispatch } from "react-redux"
const ActionDetails=()=>{
    const dispatch=useDispatch()
    useEffect(() => {
        try {
          (async () => {
            const response = await fetch(
                "https://academics.newtonschool.co/api/v1/ott/show",
              { method: "GET", headers: { projectid: "xybcw190kyb8" } }
            );
            const datas = await response.json();
           
            dispatch({type:'SUCCESS',payload:datas.data})
    
          })();
        } catch (e) {
          console.log(e);
        }
      },[]);
   return(
    <div>Harish</div>
   )
}
export default ActionDetails

  