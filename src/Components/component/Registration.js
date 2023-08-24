
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Regis() {
    const store=useSelector(state=>state.regisReducer)
    console.log('regis/7',store)
    const dispatch=useDispatch()
    const handleInput=(e)=>{
        const idn=e.target.id
        console.log(idn)
        switch(idn){
            case 'username':return dispatch({type:'usernamegis',payload:e.target.value})
            case 'email':return dispatch({type:'emailgis',payload:e.target.value})
            case 'password':return dispatch({type:'passwordgis',payload:e.target.value})
        }
    } 
    const doPost=(e)=>{
        e.preventDefault()
        try{
             (async()=>{
                const response=await fetch('https://academics.newtonschool.co/api/v1/user/signup',
                {method:"POST",headers:{ 'Content-Type': 'application/json','projectId': 'xybcw190kyb8'},
                body:JSON.stringify({...store,"appType":"ott"})
            }
                )
                const data=await response.json()
                console.log(data)
             })()
        }catch(err){
         console.log(err)
        }
    }
  return(
<div style={{display:"flex",justifyContent:'center',alignItems:'center',marginTop:'100px'}}>
<div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onChange={handleInput} onSubmit={doPost}>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"/>
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
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
        Update Password?
      </a>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Already have an account?<Link to='/login'>login</Link>
  </p>
</div>
</div>
  )
}