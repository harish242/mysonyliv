import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const Login=()=>{
    const store=useSelector(state=>state.persisted.localJwtReducer.tokens)
    console.log('login/5',store)
    const MainStore=useSelector(state=>state.others.loginReducer)
    console.log('login/7',MainStore)
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
                body:JSON.stringify({...MainStore,"appType":"ott"})
            }
                )
                const data=await response.json()
                console.log('login/28',data)
                const token=data.token
                // dispatch({type:'updatepasswords',payload:token})

                dispatch({type:'token',payload:token})
    // case 'updatePassword':return {...state,token:action.payload}

                if(data.status==='success'){
                  navigate('/home')
                }
                console.log('login/37token',token)
             })()
        }catch(err){
         console.log(err)
        }
    } 
    return(
        <div style={{display:"flex",justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw',backgroundImage:'url(https://www.gadgetmouse.com/wp-content/uploads/2021/07/SonyLIV-featured.png)',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <div class="w-full max-w-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: '20px', borderRadius: '10px' }}>
  <form  onChange={handleInput} onSubmit={doPost}>
    <div class="mb-4">
      <label class="block text-black-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email"/>
    </div>
    <div class="mb-6">
      <label class="block text-black-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
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