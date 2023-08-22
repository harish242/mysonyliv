import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const Login=()=>{
    const store=useSelector(state=>state.loginReducer)
    console.log(store)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleInput=(e)=>{
        const idn=e.target.id
        // console.log(idn)
        switch(idn){
            case 'email':return dispatch({type:'email',payload:e.target.value})
            case 'password':return dispatch({type:'password',payload:e.target.value})
        }
    }
    const doPost=(e)=>{
        e.preventDefault()
        try{
             (async()=>{
                const response=await fetch('https://academics.newtonschool.co/api/v1/user/login',
                {method:"POST",headers:{ 'Content-Type': 'application/json','projectId': 'xybcw190kyb8'},
                body:JSON.stringify({...store,"appType":"ott"})
            }
                )
                const data=await response.json()
                dispatch({type:'updatePassword',payload:data})
                if(response.ok){
                //   navigate('/home')
                }
                console.log(data)
             })()
        }catch(err){
         console.log(err)
        }
    } 
    return(
        <div style={{display:"flex",justifyContent:'center',alignItems:'center',marginTop:'100px'}}>
        <div class="w-full max-w-xs" >
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onChange={handleInput} onSubmit={doPost}>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email"/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
      {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Login In
      </button>
      {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/resetpass">
        Reset Password?
      </a> */}
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>
</div>
    )
}
export default Login